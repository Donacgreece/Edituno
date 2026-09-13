# Third-party corresponding source

Edituno includes a separately loaded LibAV/FFmpeg WebAssembly audio runtime for Safari and iOS export reliability.

## Runtime

- libav.js v6.10.9.0 (`c80e885c3461f7bb7ea565c9631b34243ae0dbf1`)
- FFmpeg 9.0
- Edituno variant: `edituno-audio-cli`
- Runtime location: `vendor/libav/`
- License: LGPL-2.1 terms apply to the compiled LibAV/FFmpeg runtime. Edituno first-party code remains under PolyForm Noncommercial 1.0.0.

## Corresponding source

The same production site that serves the compiled runtime also serves:

`third-party-source/libavjs-6.10.9.0-edituno-audio-source.tar.xz`

The archive contains the exact libav.js tagged source, the FFmpeg 9.0 source archive used by the build, the emfiberthreads source archive used by LibAV.js, Edituno's custom variant configuration, generated FFmpeg configuration and the reproducible build script.

The archive includes `edituno-ffmpeg-changes.diff`, which records Edituno's direct changes to FFmpeg source. The file states that Edituno applies no direct FFmpeg patch and identifies where the upstream libav.js patch and configuration material is preserved.

The runtime files under `vendor/libav/` are deliberately separate and replaceable. A compatible modified build can replace those files without relicensing Edituno first-party code. See `LIBAV_RUNTIME_REPLACEMENT.md` for the documented base-path override and replacement process.

The build script rejects FFmpeg GPL and nonfree mode and rejects external x264/x265, FDK-AAC, FAAC, LAME, libopus and libvorbis libraries.

This document describes source-code availability for third-party license compliance. It is not legal advice.


## Mediabunny corresponding source

Edituno bundles Mediabunny 1.56.2 under MPL-2.0. The exact unmodified upstream source corresponding to the bundled version is served as:

`third-party-source/mediabunny-1.56.2-source.tar.gz`

Pinned upstream commit: `f48609437864d569dfd2e853396a7236a46ab0d5`.
