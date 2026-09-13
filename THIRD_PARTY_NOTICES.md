# Third-party notices

Edituno's first-party code is licensed separately under `PolyForm-Noncommercial-1.0.0`. **Nothing in the Edituno license relicenses or overrides the third-party materials listed below.** Each third-party component or asset remains under its own upstream license.

## Lucide

Project: Lucide Icons
License: ISC, with MIT-licensed Feather ancestry for applicable icons.
Upstream license: https://github.com/lucide-icons/lucide/blob/main/LICENSE

The Edituno UI uses adapted Lucide icon path geometry with a normalized stroke system. The Lucide/Feather portions retain their upstream ISC/MIT licensing.

## Microsoft Fluent Emoji

Copyright (c) Microsoft Corporation.
License: MIT.
Upstream license: https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE

Edituno can browse and import assets from the official `microsoft/fluentui-emoji` repository. The upstream artwork remains subject to Microsoft's MIT license. Edituno does not relicense that artwork under PolyForm.

## Roadmap dependencies not currently bundled

The following projects are documented as approved candidates or architectural references in `OPEN_SOURCE_STACK.md`, but their source code is not bundled by the current Edituno release unless explicitly stated there:

- Moveable: MIT
- WaveSurfer.js: BSD-3-Clause
- OpenCut: MIT

If any of these are integrated in a future release, their license and notice obligations must be preserved independently from the Edituno first-party license.

## PixiJS

- Component: `pixi.js` 8.20.1
- Upstream: https://github.com/pixijs/pixijs
- License: MIT
- Copyright: 2013-2023 Mathew Groves, Chad Engler
- License copy: `THIRD_PARTY_LICENSES/PIXIJS-MIT.txt`

PixiJS is used as the GPU rendering layer for Edituno video effects. Its MIT license remains independent from Edituno's PolyForm license.

## PixiJS Filters

- Component: `pixi-filters` 6.1.5
- Upstream: https://github.com/pixijs/filters
- License: MIT
- Copyright: 2013-2025 Mathew Groves, Chad Engler
- License copy: `THIRD_PARTY_LICENSES/PIXI-FILTERS-MIT.txt`

Edituno uses selected PixiJS Filters for Bloom, Glitch, CRT, Old Film, RGB Split, Pixelate, Bulge/Pinch and related GPU effects. The filters remain MIT-licensed.

## gl-transitions

- Upstream: https://github.com/gl-transitions/gl-transitions
- Collection license: MIT, with per-transition file headers taking precedence
- License copy: `THIRD_PARTY_LICENSES/GL-TRANSITIONS-MIT.txt`

Edituno bundles only transition shader files whose upstream file headers explicitly state `License: MIT`:

- `CrossZoom.glsl`, Author: rectalogic, ported by gre
- `Swirl.glsl`, Author: Sergey Kosarevsky, ported by gre
- `AdvancedMosaic.glsl`, Author: Sergey Kosarevsky
- `CircleCrop.glsl`, Author: fkuteken, ported by gre
- `Directional.glsl`, Author: Gaëtan Renaudeau
- `Dreamy.glsl`, Author: mikolalysenko

Those shader files retain their upstream MIT notices and are not relicensed under PolyForm.


## Smartcrop.js

- Component: `smartcrop` 2.0.5
- Upstream: https://github.com/jwagner/smartcrop.js
- License: MIT
- Copyright: 2016 Jonas Wagner
- License copy: `THIRD_PARTY_LICENSES/SMARTCROP-MIT.txt`

Edituno uses Smartcrop.js as the content-aware framing engine behind Auto Reframe. Edituno's UI, multi-frame sampling, transform mapping and project workflow are first-party code. Smartcrop.js remains MIT-licensed.

## Meyda

- Component: `meyda` 5.6.3
- Upstream: https://github.com/meyda/meyda
- License: MIT
- Copyright: 2014 Hugh A. Rawlinson, Nevo Segal, Jakub Fiala
- License copy: `THIRD_PARTY_LICENSES/MEYDA-MIT.txt`

Edituno uses Meyda for local audio feature extraction used by Smart Audio analysis. Edituno's silence segmentation, beat peak selection, timeline guides and beat-driven cut orchestration are first-party code. Meyda remains MIT-licensed.


## Konva

- Component: `konva` 10.5.0
- Upstream: https://github.com/konvajs/konva
- License: MIT
- Original work copyright: 2011-2013 Eric Rowell (KineticJS)
- Modified work copyright: 2014-present Anton Lavrenov (Konva)
- License copy: `THIRD_PARTY_LICENSES/KONVA-MIT.txt`

Edituno uses Konva as the interaction engine for direct on-canvas selection, drag, resize, rotation and snapping of text, overlays and stickers. Edituno's project model, rendering/export pipeline, transform mapping, UI and editor workflow remain first-party code. Konva remains independently MIT-licensed and is not relicensed under PolyForm.

## mp4-muxer

- Component: `mp4-muxer` 5.2.2
- Upstream: https://github.com/Vanilagy/mp4-muxer
- License: MIT
- Copyright: 2023 Vanilagy
- License copy: `THIRD_PARTY_LICENSES/MP4-MUXER-MIT.txt`

Edituno uses the pinned mp4-muxer package only to multiplex timestamped WebCodecs AVC video and AAC audio into an MP4 container. Edituno's frame rendering, timeline timing, audio mixing, effects and synchronization logic remain first-party Edituno code. mp4-muxer remains MIT-licensed.


## MP4Box.js

- Component: `mp4box` 2.4.1
- Upstream: https://github.com/gpac/mp4box.js
- License: BSD-3-Clause
- Copyright: 2012 Telecom ParisTech/TSI/MM/GPAC Cyril Concolato
- License copy: `THIRD_PARTY_LICENSES/MP4BOX-BSD-3-CLAUSE.txt`

Edituno uses MP4Box.js only as a local ISO-BMFF/QuickTime demuxer fallback so Safari can expose AAC access units to WebCodecs when Web Audio's `decodeAudioData()` cannot decode the embedded audio track. Edituno's timeline audio mix, synchronization, AAC metadata repair and export orchestration remain first-party Edituno code. MP4Box.js remains under its BSD-3-Clause license.


## Mediabunny

- Component: `mediabunny` 1.56.2
- Upstream: https://github.com/Vanilagy/mediabunny
- License: Mozilla Public License 2.0
- License copy: `THIRD_PARTY_LICENSES/MEDIABUNNY-MPL-2.0.txt`

Edituno uses Mediabunny 1.56.2 for local media parsing, deterministic media sources and final MP4 muxing. Edituno does not modify Mediabunny source files. Mediabunny remains MPL-2.0 licensed and is not relicensed under Edituno's PolyForm license. The exact upstream source corresponding to the bundled Mediabunny version is distributed under `third-party-source/mediabunny-1.56.2-source.tar.gz`.


## libav.js / FFmpeg WASM audio engine

**This software uses libraries from the FFmpeg project under the LGPLv2.1.**

- Component: `libav.js` 6.10.9.0, custom `edituno-audio-cli` configuration
- Upstream: https://github.com/Yahweasel/libav.js
- FFmpeg source version used by the pinned libav.js release: 9.0
- FFmpeg/compiled runtime license: GNU LGPL 2.1 terms as provided by the upstream build
- libav.js JavaScript wrapper portions: upstream 0BSD-style permission notice
- emfiberthreads build/runtime support: 0BSD
- License copies: `THIRD_PARTY_LICENSES/LIBAVJS-LGPL-2.1.txt`, `THIRD_PARTY_LICENSES/LIBAVJS-0BSD.txt`, `THIRD_PARTY_LICENSES/FFMPEG-LGPL-2.1.txt`, `THIRD_PARTY_LICENSES/EMFIBERTHREADS-0BSD.txt`
- Corresponding source at runtime: `third-party-source/libavjs-6.10.9.0-edituno-audio-source.tar.xz`
- Reproducible build recipe: `tools/build-libav-audio.sh` and `tools/libav-edituno-audio-config.json`

Edituno uses this runtime as a separate, replaceable WebAssembly/Worker component for Safari/iOS audio demuxing, decoding, timeline filtering, mixing and AAC encoding. The runtime is not relicensed under PolyForm. Edituno's integration code, timeline model, UI and deterministic video renderer remain first-party Edituno material under `PolyForm-Noncommercial-1.0.0`.

The custom build is verified in CI to exclude FFmpeg GPL and nonfree mode and to exclude external x264/x265, FDK-AAC, FAAC, LAME, libopus and libvorbis codec libraries. The Safari audio engine uses FFmpeg's built-in AAC implementation and built-in LGPL audio filters. The exact libav.js source, pristine FFmpeg source archive, emfiberthreads source archive, Edituno configuration, generated FFmpeg configuration and reproducible build recipe are distributed alongside the compiled runtime. `LIBAV_RUNTIME_REPLACEMENT.md` documents the separate runtime boundary and replacement mechanism.

Recipients may inspect, modify, reverse engineer and replace the separate LibAV/FFmpeg runtime to the extent required by LGPL-2.1. The corresponding-source archive also contains `edituno-ffmpeg-changes.diff`, which records Edituno's direct FFmpeg source changes.
