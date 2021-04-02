/**
 * Copyright 2021 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include <emscripten/bind.h>
#include <emscripten/val.h>

#include "lib/jxl/color_encoding_internal.h"
#include <jxl/decode.h>

#include "skcms.h"

#include <stdio.h>
#include <fstream>
#include <iostream>
#include <unordered_map>

#include "lib/jxl/base/file_io.h"
#include "lib/jxl/enc_cache.h"
#include "lib/jxl/enc_file.h"
#include "lib/jxl/enc_heuristics.h"
#include "lib/jxl/modular/encoding/context_predict.h"
#include "lib/jxl/modular/encoding/encoding.h"
#include "lib/jxl/modular/encoding/ma.h"

using namespace emscripten;

thread_local const val Uint8ClampedArray = val::global("Uint8ClampedArray");
thread_local const val ImageData = val::global("ImageData");
thread_local const val Uint8Array = val::global("Uint8Array");

// R, G, B, A
#define COMPONENTS_PER_PIXEL 4

#ifndef JXL_DEBUG_ON_ALL_ERROR
#define JXL_DEBUG_ON_ALL_ERROR 0
#endif

#if JXL_DEBUG_ON_ALL_ERROR
#define EXPECT_TRUE(a)                                                         \
  if (!(a)) {                                                                  \
    fprintf(stderr, "Assertion failure (%d): %s\n", __LINE__, #a);             \
    return val::null();                                                        \
  }
#define EXPECT_EQ(a, b)                                                        \
  {                                                                            \
    int a_ = a;                                                                \
    int b_ = b;                                                                \
    if (a_ != b_) {                                                            \
      fprintf(stderr, "Assertion failure (%d): %s (%d) != %s (%d)\n",          \
              __LINE__, #a, a_, #b, b_);                                       \
      return val::null();                                                      \
    }                                                                          \
  }
#else
#define EXPECT_TRUE(a)                                                         \
  if (!(a)) {                                                                  \
    return val::null();                                                        \
  }

#define EXPECT_EQ(a, b) EXPECT_TRUE((a) == (b));
#endif

val decode(std::string data) {
  std::unique_ptr<
      JxlDecoder,
      std::integral_constant<decltype(&JxlDecoderDestroy), JxlDecoderDestroy>>
      dec(JxlDecoderCreate(nullptr));
  EXPECT_EQ(JXL_DEC_SUCCESS,
            JxlDecoderSubscribeEvents(dec.get(), JXL_DEC_BASIC_INFO |
                                                     JXL_DEC_COLOR_ENCODING |
                                                     JXL_DEC_FULL_IMAGE));

  auto next_in = (const uint8_t *)data.c_str();
  auto avail_in = data.size();
  JxlDecoderSetInput(dec.get(), next_in, avail_in);
  EXPECT_EQ(JXL_DEC_BASIC_INFO, JxlDecoderProcessInput(dec.get()));
  JxlBasicInfo info;
  EXPECT_EQ(JXL_DEC_SUCCESS, JxlDecoderGetBasicInfo(dec.get(), &info));
  size_t pixel_count = info.xsize * info.ysize;
  size_t component_count = pixel_count * COMPONENTS_PER_PIXEL;

  EXPECT_EQ(JXL_DEC_COLOR_ENCODING, JxlDecoderProcessInput(dec.get()));
  static const JxlPixelFormat format = {COMPONENTS_PER_PIXEL, JXL_TYPE_FLOAT,
                                        JXL_LITTLE_ENDIAN, 0};
  size_t icc_size;
  EXPECT_EQ(JXL_DEC_SUCCESS,
            JxlDecoderGetICCProfileSize(
                dec.get(), &format, JXL_COLOR_PROFILE_TARGET_DATA, &icc_size));
  std::vector<uint8_t> icc_profile(icc_size);
  EXPECT_EQ(JXL_DEC_SUCCESS,
            JxlDecoderGetColorAsICCProfile(
                dec.get(), &format, JXL_COLOR_PROFILE_TARGET_DATA,
                icc_profile.data(), icc_profile.size()));

  EXPECT_EQ(JXL_DEC_NEED_IMAGE_OUT_BUFFER, JxlDecoderProcessInput(dec.get()));
  size_t buffer_size;
  EXPECT_EQ(JXL_DEC_SUCCESS,
            JxlDecoderImageOutBufferSize(dec.get(), &format, &buffer_size));
  EXPECT_EQ(buffer_size, component_count * sizeof(float));

  auto float_pixels = std::make_unique<float[]>(component_count);
  EXPECT_EQ(JXL_DEC_SUCCESS,
            JxlDecoderSetImageOutBuffer(dec.get(), &format, float_pixels.get(),
                                        component_count * sizeof(float)));
  EXPECT_EQ(JXL_DEC_FULL_IMAGE, JxlDecoderProcessInput(dec.get()));

  auto byte_pixels = std::make_unique<uint8_t[]>(component_count);
  // Convert to sRGB.
  skcms_ICCProfile jxl_profile;
  EXPECT_TRUE(
      skcms_Parse(icc_profile.data(), icc_profile.size(), &jxl_profile));
  EXPECT_TRUE(skcms_Transform(
      float_pixels.get(), skcms_PixelFormat_RGBA_ffff,
      info.alpha_premultiplied ? skcms_AlphaFormat_PremulAsEncoded
                               : skcms_AlphaFormat_Unpremul,
      &jxl_profile, byte_pixels.get(), skcms_PixelFormat_RGBA_8888,
      skcms_AlphaFormat_Unpremul, skcms_sRGB_profile(), pixel_count));

  return ImageData.new_(Uint8ClampedArray.new_(typed_memory_view(
                            component_count, byte_pixels.get())),
                        info.xsize, info.ysize);
}

namespace jxl {

namespace {
  thread_local const uint32_t buf_size = 100;
  thread_local std::string last_parse_error = std::string(buf_size, '\0');
template <typename F> bool ParseNode(F &tok, Tree &tree) {
  static const std::unordered_map<std::string, int> property_map = {
      {"c", 0},           {"g", 1},      {"y", 2},     {"x", 3},
      {"|N|", 4},         {"|W|", 5},    {"N", 6},     {"W", 7},
      {"W-WW-NW+NWW", 8}, {"W+N-NW", 9}, {"W-NW", 10}, {"NW-N", 11},
      {"N-NE", 12},       {"N-NN", 13},  {"W-WW", 14}, {"WGH", 15},
  };
  static const std::unordered_map<std::string, Predictor> predictor_map = {
      {"Set", Predictor::Zero},
      {"W", Predictor::Left},
      {"N", Predictor::Top},
      {"AvgW+N", Predictor::Average0},
      {"Select", Predictor::Select},
      {"Gradient", Predictor::Gradient},
      {"Weighted", Predictor::Weighted},
      {"NE", Predictor::TopRight},
      {"NW", Predictor::TopLeft},
      {"WW", Predictor::LeftLeft},
      {"AvgW+NW", Predictor::Average1},
      {"AvgN+NW", Predictor::Average2},
      {"AvgN+NE", Predictor::Average3},
      {"AvgAll", Predictor::Average4},
  };
  auto t = tok();
  if (t == "if") {
    // Decision node.
    int p;
    t = tok();
    if (!property_map.count(t)) {
      snprintf(&last_parse_error[0], buf_size, "Unexpected property: %s\n", t.c_str());
      return false;
    }
    p = property_map.at(t);
    if ((t = tok()) != ">") {
      snprintf(&last_parse_error[0], buf_size, "Expected >, found %s\n", t.c_str());
      return false;
    }
    t = tok();
    size_t num = 0;
    int split = std::stoi(t, &num);
    if (num != t.size()) {
      snprintf(&last_parse_error[0], buf_size, "Invalid splitval: %s\n", t.c_str());
      return false;
    }
    size_t pos = tree.size();
    tree.emplace_back(PropertyDecisionNode::Split(p, split, pos + 1));
    JXL_RETURN_IF_ERROR(ParseNode(tok, tree));
    tree[pos].rchild = tree.size();
    JXL_RETURN_IF_ERROR(ParseNode(tok, tree));
  } else if (t == "-") {
    // Leaf
    t = tok();
    Predictor p;
    if (!predictor_map.count(t)) {
      snprintf(&last_parse_error[0], buf_size, "Unexpected predictor: %s\n", t.c_str());
      return false;
    }
    p = predictor_map.at(t);
    t = tok();
    bool subtract = false;
    if (t == "-") {
      subtract = true;
      t = tok();
    } else if (t == "+") {
      t = tok();
    }
    size_t num = 0;
    int offset = std::stoi(t, &num);
    if (num != t.size()) {
      snprintf(&last_parse_error[0], buf_size, "Invalid offset: %s\n", t.c_str());
      return false;
    }
    if (subtract)
      offset = -offset;
    tree.emplace_back(PropertyDecisionNode::Leaf(p, offset));
  } else {
    snprintf(&last_parse_error[0], buf_size, "Unexpected node type: %s\n", t.c_str());
    return false;
  }
  return true;
}

class Heuristics : public DefaultEncoderHeuristics {
public:
  bool CustomFixedTreeLossless(const jxl::FrameDimensions &frame_dim,
                               Tree *tree) override {
    *tree = tree_;
    return true;
  }

  explicit Heuristics(Tree tree) : tree_(std::move(tree)) {}

private:
  Tree tree_;
};
} // namespace

val JxlFromTree(std::string in) {
  Tree tree;
  {
    std::stringstream ss(in);
    auto tok = [&ss]() {
      std::string out;
      ss >> out;
      return out;
    };
    if (!ParseNode(tok, tree)) {
      return val(last_parse_error);
    }
  }
  constexpr size_t kSize = 1024;
  Image3F image(kSize, kSize);
  Channel channel(kSize, kSize);
  for (size_t c = 0; c < 3; c++) {
    const intptr_t onerow = channel.plane.PixelsPerRow();
    Channel references(0, channel.w);
    std::array<pixel_type, kNumStaticProperties> static_props = {(int)c, 0};
    bool tree_has_wp_prop_or_pred = false;
    bool is_wp_only = false;
    bool is_gradient_only = false;
    size_t num_props;
    FlatTree flat_tree =
        FilterTree(tree, static_props, &num_props, &tree_has_wp_prop_or_pred,
                   &is_wp_only, &is_gradient_only);
    MATreeLookup tree_lookup(flat_tree);
    Properties properties(num_props);
    weighted::State wp_state(weighted::Header(), channel.w, channel.h);
    for (size_t y = 0; y < channel.h; y++) {
      pixel_type *JXL_RESTRICT p = channel.Row(y);
      float *JXL_RESTRICT pf = image.PlaneRow(c, y);
      InitPropsRow(&properties, static_props, y);
      for (size_t x = 0; x < channel.w; x++) {
        PredictionResult res =
            PredictTreeWP(&properties, channel.w, p + x, onerow, x, y,
                          tree_lookup, references, &wp_state);
        p[x] = res.guess;
        if (p[x] < 0 || p[x] > 255) {
          std::string s;
          s.resize(500);
          sprintf(&s[0], "Invalid pixel value %d in position (%zu, %zu)\n",
                  p[x], x, y);
          return val(s);
        }
        pf[x] = p[x] * (1.0f / 255);
        wp_state.UpdateErrors(p[x], x, y, channel.w);
      }
    }
  }
  CodecInOut io;
  io.SetFromImage(std::move(image), ColorEncoding::SRGB());
  io.metadata.m.color_encoding.DecideIfWantICC();
  PassesEncoderState enc_state;
  enc_state.heuristics = make_unique<Heuristics>(tree);
  CompressParams cparams;
  cparams.colorspace = 0;
  cparams.color_transform = ColorTransform::kNone;
  cparams.modular_mode = true;
  cparams.palette_colors = 0;
  cparams.channel_colors_pre_transform_percent = 0;
  cparams.channel_colors_percent = 0;
  cparams.modular_group_size_shift = 3;
  PaddedBytes bytes;

  if (EncodeFile(cparams, &io, &enc_state, &bytes)) {
    return Uint8Array.new_(typed_memory_view(bytes.size(), bytes.data()));
  }

  return val("Something went wrong");
}
} // namespace jxl

EMSCRIPTEN_BINDINGS(my_module) {
  function("jxl_from_tree", &jxl::JxlFromTree);
  function("decode", &decode);
}