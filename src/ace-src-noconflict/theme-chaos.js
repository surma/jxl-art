ace.define(
  "ace/theme/chaos-css",
  ["require", "exports", "module"],
  function (require, exports, module) {
    module.exports =
      ".ace-chaos .ace_gutter {\n  background: #141414;\n  color: #595959;\n  border-right: 1px solid #282828;\n}\n.ace-chaos .ace_gutter-cell.ace_warning {\n  background-image: none;\n  background: #FC0;\n  border-left: none;\n  padding-left: 0;\n  color: #000;\n}\n.ace-chaos .ace_gutter-cell.ace_error {\n  background-position: -6px center;\n  background-image: none;\n  background: #F10;\n  border-left: none;\n  padding-left: 0;\n  color: #000;\n}\n.ace-chaos .ace_print-margin {\n  border-left: 1px solid #555;\n  right: 0;\n  background: #1D1D1D;\n}\n.ace-chaos {\n  background-color: #161616;\n  color: #E6E1DC;\n}\n\n.ace-chaos .ace_cursor {\n  border-left: 2px solid #FFFFFF;\n}\n.ace-chaos .ace_cursor.ace_overwrite {\n  border-left: 0px;\n  border-bottom: 1px solid #FFFFFF;\n}\n.ace-chaos .ace_marker-layer .ace_selection {\n  background: #494836;\n}\n.ace-chaos .ace_marker-layer .ace_step {\n  background: rgb(198, 219, 174);\n}\n.ace-chaos .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid #FCE94F;\n}\n.ace-chaos .ace_marker-layer .ace_active-line {\n  background: #333;\n}\n.ace-chaos .ace_gutter-active-line {\n  background-color: #222;\n}\n.ace-chaos .ace_invisible {\n  color: #404040;\n}\n.ace-chaos .ace_keyword {\n  color:#00698F;\n}\n.ace-chaos .ace_keyword.ace_operator {\n  color:#FF308F;\n}\n.ace-chaos .ace_constant {\n  color:#1EDAFB;\n}\n.ace-chaos .ace_constant.ace_language {\n  color:#FDC251;\n}\n.ace-chaos .ace_constant.ace_library {\n  color:#8DFF0A;\n}\n.ace-chaos .ace_constant.ace_numeric {\n  color:#58C554;\n}\n.ace-chaos .ace_invalid {\n  color:#FFFFFF;\n  background-color:#990000;\n}\n.ace-chaos .ace_invalid.ace_deprecated {\n  color:#FFFFFF;\n  background-color:#990000;\n}\n.ace-chaos .ace_support {\n  color: #999;\n}\n.ace-chaos .ace_support.ace_function {\n  color:#00AEEF;\n}\n.ace-chaos .ace_function {\n  color:#00AEEF;\n}\n.ace-chaos .ace_string {\n  color:#58C554;\n}\n.ace-chaos .ace_comment {\n  color:#555;\n  font-style:italic;\n  padding-bottom: 0px;\n}\n.ace-chaos .ace_variable {\n  color:#997744;\n}\n.ace-chaos .ace_meta.ace_tag {\n  color:#BE53E6;\n}\n.ace-chaos .ace_entity.ace_other.ace_attribute-name {\n  color:#FFFF89;\n}\n.ace-chaos .ace_markup.ace_underline {\n  text-decoration: underline;\n}\n.ace-chaos .ace_fold-widget {\n  text-align: center;\n}\n\n.ace-chaos .ace_fold-widget:hover {\n  color: #777;\n}\n\n.ace-chaos .ace_fold-widget.ace_start,\n.ace-chaos .ace_fold-widget.ace_end,\n.ace-chaos .ace_fold-widget.ace_closed{\n  background: none !important;\n  border: none;\n  box-shadow: none;\n}\n\n.ace-chaos .ace_fold-widget.ace_start:after {\n  content: '\u25BE'\n}\n\n.ace-chaos .ace_fold-widget.ace_end:after {\n  content: '\u25B4'\n}\n\n.ace-chaos .ace_fold-widget.ace_closed:after {\n  content: '\u2023'\n}\n\n.ace-chaos .ace_indent-guide {\n  border-right:1px dotted #333333;\n  margin-right:-1px;\n}\n\n.ace-chaos .ace_indent-guide-active {\n  border-right:1px dotted #afafaf;\n  margin-right:-1px;\n}\n\n.ace-chaos .ace_fold { \n  background: #222; \n  border-radius: 3px; \n  color: #7AF; \n  border: none; \n}\n.ace-chaos .ace_fold:hover {\n  background: #CCC; \n  color: #000;\n}\n";
  },
);

ace.define(
  "ace/theme/chaos",
  ["require", "exports", "module", "ace/theme/chaos-css", "ace/lib/dom"],
  function (require, exports, module) {
    exports.isDark = true;
    exports.cssClass = "ace-chaos";
    exports.cssText = require("./chaos-css");
    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass, false);
  },
);
(function () {
  ace.require(["ace/theme/chaos"], function (m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
