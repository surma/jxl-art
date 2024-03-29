FROM emscripten/emsdk:3.1.23
RUN apt-get update && apt-get install -qqy autoconf libtool pkg-config
ENV CFLAGS "-O3 -flto"
ENV CXXFLAGS "${CFLAGS} -std=c++17"
ENV LDFLAGS "${CFLAGS} -s PTHREAD_POOL_SIZE=navigator.hardwareConcurrency"
# Build and cache standard libraries with these flags
RUN emcc ${CXXFLAGS} --bind -xc++ /dev/null -o /dev/null
WORKDIR /src
CMD ["sh", "-c", "emmake make -j`nproc`"]
