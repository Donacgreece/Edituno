#!/usr/bin/env bash
set -euo pipefail

LIBAV_TAG="v6.10.9.0"
LIBAV_COMMIT="c80e885c3461f7bb7ea565c9631b34243ae0dbf1"
LIBAV_VERSION="6.10.9.0"
FFMPEG_VERSION="9.0"
VARIANT="edituno-audio-cli"
MEDIABUNNY_VERSION="1.56.2"
MEDIABUNNY_COMMIT="f48609437864d569dfd2e853396a7236a46ab0d5"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CACHE_DIR="${EDITUNO_LIBAV_CACHE_DIR:-$ROOT/.cache/libav-edituno-audio}"
PUBLIC_RUNTIME="$ROOT/public/vendor/libav"
PUBLIC_SOURCE="$ROOT/public/third-party-source"
CONFIG_JSON="$ROOT/tools/libav-edituno-audio-config.json"
SOURCE_ARCHIVE="libavjs-${LIBAV_VERSION}-edituno-audio-source.tar.xz"
MEDIABUNNY_SOURCE_ARCHIVE="mediabunny-${MEDIABUNNY_VERSION}-source.tar.gz"
RUNTIME_FILES=(
  "libav-${LIBAV_VERSION}-${VARIANT}.js"
  "libav-${LIBAV_VERSION}-${VARIANT}.wasm.js"
  "libav-${LIBAV_VERSION}-${VARIANT}.wasm.wasm"
)

mkdir -p "$PUBLIC_RUNTIME" "$PUBLIC_SOURCE" "$CACHE_DIR"

cache_valid=true
for file in "${RUNTIME_FILES[@]}"; do
  if [ ! -s "$CACHE_DIR/runtime/$file" ]; then cache_valid=false; fi
done
if [ ! -s "$CACHE_DIR/source/$SOURCE_ARCHIVE" ]; then cache_valid=false; fi
if [ ! -s "$CACHE_DIR/source/$MEDIABUNNY_SOURCE_ARCHIVE" ]; then cache_valid=false; fi

if [ "$cache_valid" = true ]; then
  echo "Using cached LibAV/FFmpeg audio runtime"
  cp "$CACHE_DIR/runtime/"* "$PUBLIC_RUNTIME/"
  cp "$CACHE_DIR/source/$SOURCE_ARCHIVE" "$PUBLIC_SOURCE/$SOURCE_ARCHIVE"
  cp "$CACHE_DIR/source/$MEDIABUNNY_SOURCE_ARCHIVE" "$PUBLIC_SOURCE/$MEDIABUNNY_SOURCE_ARCHIVE"
  exit 0
fi

if ! command -v emcc >/dev/null 2>&1; then
  echo "Emscripten is required when the LibAV cache is empty." >&2
  exit 1
fi

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
SRC="$WORK/libav.js"

git init "$SRC"
cd "$SRC"
git remote add origin https://github.com/Yahweasel/libav.js.git
git fetch --depth 1 origin "$LIBAV_COMMIT"
git fetch --depth 1 origin "refs/tags/${LIBAV_TAG}:refs/tags/${LIBAV_TAG}"
test "$(git rev-list -n 1 "$LIBAV_TAG")" = "$LIBAV_COMMIT"
git checkout --detach FETCH_HEAD
test "$(git rev-parse HEAD)" = "$LIBAV_COMMIT"
npm ci --no-audit --no-fund
CONFIG_COMPACT="$(tr -d '\r\n' < "$CONFIG_JSON")"
( cd configs && node mkconfig.js "$VARIANT" "$CONFIG_COMPACT" )
CONFIG_DIR="$SRC/configs/configs/$VARIANT"
# These are FFmpeg built-in LGPL filters needed for deterministic Edituno timeline placement.
cat >> "$CONFIG_DIR/ffmpeg-config.txt" <<'EOF'
--enable-filter=adelay
--enable-filter=asetpts
EOF

make -j2 \
  "dist/libav-${LIBAV_VERSION}-${VARIANT}.js" \
  "dist/libav-${LIBAV_VERSION}-${VARIANT}.wasm.js"

WASM_CONFIG="$SRC/build/ffmpeg-${FFMPEG_VERSION}/build-base-${VARIANT}/ffbuild/config.mak"
if [ ! -f "$WASM_CONFIG" ]; then
  echo "FFmpeg configuration record was not produced by the LibAV build." >&2
  exit 1
fi
if grep -Eq '^CONFIG_GPL=(yes|1)$' "$WASM_CONFIG"; then
  echo "GPL mode is active in the LibAV/FFmpeg build. Deployment rejected." >&2
  exit 1
fi
if grep -Eq '^CONFIG_NONFREE=(yes|1)$' "$WASM_CONFIG"; then
  echo "Nonfree mode is active in the LibAV/FFmpeg build. Deployment rejected." >&2
  exit 1
fi
for required_config in \
  CONFIG_AAC_DECODER \
  CONFIG_AAC_ENCODER \
  CONFIG_MOV_DEMUXER \
  CONFIG_ADTS_MUXER; do
  if ! grep -Eq "^${required_config}=(yes|1)$" "$WASM_CONFIG"; then
    echo "Required LGPL FFmpeg component is not active: ${required_config}" >&2
    exit 1
  fi
done
echo "FFmpeg LGPL configuration guards passed."
if grep -Eq '^CONFIG_(LIBX264|LIBX265|LIBFDK_AAC|LIBFAAC|LIBMP3LAME|LIBOPUS|LIBVORBIS)=(yes|1)$' "$WASM_CONFIG"; then
  echo "Forbidden external/GPL/nonfree codec library detected in LibAV build." >&2
  exit 1
fi

for file in "${RUNTIME_FILES[@]}"; do
  test -s "$SRC/dist/$file"
  cp "$SRC/dist/$file" "$PUBLIC_RUNTIME/$file"
done

SOURCE_STAGE="$WORK/source-stage"
mkdir -p "$SOURCE_STAGE"
git archive --format=tar.gz --prefix="libav.js-${LIBAV_TAG}/" HEAD > "$SOURCE_STAGE/libav.js-${LIBAV_TAG}.tar.gz"
test -s "$SRC/build/ffmpeg-${FFMPEG_VERSION}.tar.xz"
cp "$SRC/build/ffmpeg-${FFMPEG_VERSION}.tar.xz" "$SOURCE_STAGE/ffmpeg-${FFMPEG_VERSION}.tar.xz"
EMFIBER_SOURCE="$(find "$SRC/build" -maxdepth 1 -type f -name 'emfiberthreads-*.tar.*' | head -1)"
if [ -z "$EMFIBER_SOURCE" ] || [ ! -s "$EMFIBER_SOURCE" ]; then
  echo "emfiberthreads corresponding source archive was not produced by the LibAV build." >&2
  exit 1
fi
cp "$EMFIBER_SOURCE" "$SOURCE_STAGE/"
cp "$CONFIG_JSON" "$SOURCE_STAGE/edituno-libav-audio-config.json"
cp -R "$CONFIG_DIR" "$SOURCE_STAGE/generated-${VARIANT}-config"
cp "$WASM_CONFIG" "$SOURCE_STAGE/ffmpeg-config.mak"
cp "$ROOT/tools/build-libav-audio.sh" "$SOURCE_STAGE/build-libav-audio.sh"
cat > "$SOURCE_STAGE/README.txt" <<EOF
Edituno LibAV/FFmpeg WASM Audio Engine corresponding source

libav.js: ${LIBAV_TAG} (${LIBAV_COMMIT})
FFmpeg: ${FFMPEG_VERSION}
Variant: ${VARIANT}
Emscripten: 6.0.5 (pinned by Edituno GitHub Actions)

This source bundle accompanies the separately loaded LGPL LibAV/FFmpeg runtime in Edituno.
The build intentionally excludes GPL and nonfree components. It uses FFmpeg's built-in AAC decoder/encoder and built-in audio filters only.
Run build-libav-audio.sh from the Edituno repository with Emscripten 6.0.5 available to reproduce the runtime.
EOF

tar -C "$SOURCE_STAGE" -cJf "$PUBLIC_SOURCE/$SOURCE_ARCHIVE" .

# Mediabunny is MPL-2.0. Publish the exact unmodified source used by the pinned npm version.
MEDIABUNNY_SRC="$WORK/mediabunny"
git init "$MEDIABUNNY_SRC"
cd "$MEDIABUNNY_SRC"
git remote add origin https://github.com/Vanilagy/mediabunny.git
git fetch --depth 1 origin "$MEDIABUNNY_COMMIT"
git checkout --detach FETCH_HEAD
test "$(git rev-parse HEAD)" = "$MEDIABUNNY_COMMIT"
git archive --format=tar.gz --prefix="mediabunny-v${MEDIABUNNY_VERSION}/" HEAD > "$PUBLIC_SOURCE/$MEDIABUNNY_SOURCE_ARCHIVE"

rm -rf "$CACHE_DIR/runtime" "$CACHE_DIR/source"
mkdir -p "$CACHE_DIR/runtime" "$CACHE_DIR/source"
cp "$PUBLIC_RUNTIME/"* "$CACHE_DIR/runtime/"
cp "$PUBLIC_SOURCE/$SOURCE_ARCHIVE" "$CACHE_DIR/source/$SOURCE_ARCHIVE"
cp "$PUBLIC_SOURCE/$MEDIABUNNY_SOURCE_ARCHIVE" "$CACHE_DIR/source/$MEDIABUNNY_SOURCE_ARCHIVE"

echo "LibAV/FFmpeg WASM audio runtime built with LGPL-only configuration."
