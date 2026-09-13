# LibAV Audio Engine Compliance Record

This file documents the compliance controls used for Edituno's Safari/iOS LibAV/FFmpeg WebAssembly audio backend. It is an engineering compliance record, not legal advice.

## First-party license

Edituno first-party code remains licensed under `PolyForm-Noncommercial-1.0.0`.

The LibAV/FFmpeg runtime is deliberately distributed as a separate, replaceable runtime under `vendor/libav/`. Edituno does not apply PolyForm terms to that runtime or to Mediabunny.

The About page and installation dialog display the FFmpeg/LGPL notice and provide direct links to the LGPL text, exact corresponding source, third-party notices and replacement instructions.

## LibAV / FFmpeg runtime

- libav.js release: `v6.10.9.0`
- pinned libav.js commit: `c80e885c3461f7bb7ea565c9631b34243ae0dbf1`
- FFmpeg source version used by that release: `9.0`
- Emscripten version pinned in CI: `6.0.5`
- custom variant: `edituno-audio-cli`
- runtime copyright license: LGPL-2.1 terms apply to the compiled LibAV/FFmpeg library; libav.js wrapper source carries upstream 0-clause BSD headers.

## Build restrictions

The release build MUST fail if any of the following is true:

- FFmpeg `CONFIG_GPL` is enabled.
- FFmpeg `CONFIG_NONFREE` is enabled.
- libx264, libx265, libfdk_aac, FAAC, LAME, libopus or libvorbis are linked into the custom runtime.
- the built-in AAC decoder or built-in AAC encoder is missing.
- the MP4 demuxer or ADTS muxer is missing.

H.264 video encoding is not performed by this FFmpeg build. Edituno continues to use the browser/Mediabunny video path. This avoids introducing x264/x265 into the LibAV runtime.

## Corresponding source

Every production deployment that serves the compiled LibAV/FFmpeg runtime also serves:

`third-party-source/libavjs-6.10.9.0-edituno-audio-source.tar.xz`

That archive contains the exact pinned libav.js source, FFmpeg 9.0 source archive, custom variant configuration, generated FFmpeg configuration and the Edituno build recipe.

It also contains `edituno-ffmpeg-changes.diff`, an explicit record of Edituno's direct FFmpeg source changes. Edituno applies no direct patch to FFmpeg; upstream libav.js patch/configuration material remains included in the exact libav.js source archive.

Mediabunny 1.56.2 is separately provided with exact corresponding upstream source at:

`third-party-source/mediabunny-1.56.2-source.tar.gz`

## Replaceability

The runtime is lazy-loaded from `vendor/libav/` as separate JavaScript/WebAssembly files. A compatible modified build can replace these files without modifying or relicensing Edituno first-party source. The production app does not embed the LibAV WebAssembly bytes inside Edituno's first-party JavaScript bundle. `LIBAV_RUNTIME_REPLACEMENT.md` documents the replacement hook (`window.EDITUNO_LIBAV_BASE`) and expected filenames.

Edituno does not prohibit inspection, modification, reverse engineering or replacement of this separate component to the extent required for recipients to exercise LGPL-2.1 rights.

## Patent separation

Copyright-license compliance does not determine codec patent obligations. See `PATENT_NOTICE.md` before commercial distribution.

## Release checklist

Before publishing a release that changes this engine:

1. keep the exact libav.js commit pinned;
2. keep the Emscripten version pinned;
3. rebuild the corresponding-source archive;
4. verify GPL and nonfree modes remain disabled;
5. verify no forbidden external codec libraries are linked;
6. deploy the source archives with the executable runtime;
7. preserve LGPL, 0BSD and MPL license copies and notices;
8. preserve the runtime replacement mechanism;
9. review codec patent obligations separately from open-source licensing.
10. keep the visible FFmpeg/LGPL notice and its source, license and replacement links available.
