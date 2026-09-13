# Edituno Licensing Scope

## First-party Edituno material

Unless a file or section is identified as third-party material, original Edituno code and documentation authored for this repository are made available under:

`SPDX-License-Identifier: PolyForm-Noncommercial-1.0.0`

License terms: https://polyformproject.org/licenses/noncommercial/1.0.0

Required Notice: Copyright 2026 Dimitris Galatsanos. Edituno.

Edituno is therefore **source-available for noncommercial use**. The PolyForm Noncommercial license does not grant general commercial-use rights. Separate commercial licensing may be offered by the Edituno copyright holder.

## Third-party material

The Edituno project license does not replace, narrow, expand or otherwise alter rights granted by third-party licenses. Third-party components and assets retain their upstream terms.

In particular:

- Lucide-derived icon geometry remains subject to Lucide's ISC license and, where applicable, Feather's MIT license.
- Microsoft Fluent Emoji remains subject to Microsoft's MIT license. Edituno loads Fluent Emoji from the official upstream repository on demand and may store user-selected assets locally in projects.
- Dependencies listed as roadmap candidates in `OPEN_SOURCE_STACK.md` are not automatically covered by the Edituno project license and must retain their own notices if bundled in a future release.

See `THIRD_PARTY_NOTICES.md` for current notices and upstream license links.

## Generated production bundle

The generated `dist/` bundle contains Edituno first-party code together with any identified third-party material. The presence of PolyForm metadata in the bundle applies only to Edituno-owned material. Third-party material continues under its original license.


## Phase 1 editing engines

PixiJS 8.20.1, PixiJS Filters 6.1.5 and the explicitly MIT-licensed gl-transitions shader files included by Edituno are third-party material. They remain governed by their upstream MIT licenses. The Edituno PolyForm Noncommercial license applies only to Edituno first-party code, UI, documentation and other original material, and does not replace or narrow the MIT rights granted by those upstream projects.


## Phase 2 smart editing engines

Smartcrop.js 2.0.5 and Meyda 5.6.3 are third-party MIT-licensed components. They are not relicensed under PolyForm. Edituno's Auto Reframe sampling/orchestration, audio analysis heuristics, timeline guide rendering and beat-driven editing workflow are first-party Edituno material under `PolyForm-Noncommercial-1.0.0`, while the upstream Smartcrop.js and Meyda code retain their MIT rights and notices.


## Phase 3 canvas interaction engine

Konva 10.5.0 is a third-party MIT-licensed component and is not relicensed under PolyForm. Edituno uses it only as the browser interaction layer for direct canvas selection and transformation. Edituno's media rendering, export output, timeline/project data model, snapping policy, object geometry mapping and interface remain first-party Edituno material under `PolyForm-Noncommercial-1.0.0`.

## Deterministic MP4 export container

`mp4-muxer` 5.2.2 is a third-party MIT-licensed component used as the MP4 container multiplexer for Edituno's WebCodecs export engine. It is not relicensed under PolyForm. Edituno's deterministic frame rendering, OfflineAudioContext mix, timeline synchronization and export orchestration remain first-party material under `PolyForm-Noncommercial-1.0.0`.


## Safari MP4 audio demux fallback

`mp4box` 2.4.1 is a third-party BSD-3-Clause component used only to parse ISO-BMFF/QuickTime containers and expose embedded AAC packets when native Web Audio decoding is unavailable or fails. MP4Box.js is not relicensed under PolyForm. Edituno's audio timeline model, PCM assembly, WebCodecs decoding, AAC metadata normalization, synchronization and export workflow remain first-party material under `PolyForm-Noncommercial-1.0.0`.


## Apple mobile production export engine

Mediabunny 1.56.2 is a third-party MPL-2.0 component used for local media parsing and MP4 muxing. It is not relicensed under PolyForm. Its exact upstream source is distributed with the production site. Edituno's timeline model, deterministic frame compositor, project audio mix, export selection logic, UI and integration code remain first-party Edituno material under `PolyForm-Noncommercial-1.0.0`.


## Safari/iOS LibAV audio engine

The Safari/iOS production audio backend uses a separately loaded `libav.js` 6.10.9.0 / FFmpeg 9.0 WebAssembly runtime. That runtime remains under its upstream LGPL terms and is not relicensed under PolyForm. It is distributed as replaceable files under `vendor/libav/`, while Edituno first-party integration, project/timeline logic and video rendering remain under `PolyForm-Noncommercial-1.0.0`.

To preserve the intended LGPL component boundary, the production bundle provides the exact corresponding source and build configuration under `third-party-source/`, keeps the runtime separable from Edituno first-party code, provides a documented runtime replacement mechanism, and verifies in CI that GPL/nonfree FFmpeg configuration is disabled. On this architecture, Edituno does not relicense its first-party code under LGPL or GPL.

PolyForm restrictions apply only to Edituno first-party material. They do not restrict recipients from exercising rights granted by the LGPL for the LibAV/FFmpeg runtime, including inspecting, modifying or replacing that separate runtime.


See `LIBAV_RUNTIME_REPLACEMENT.md` for the runtime replacement mechanism and `PATENT_NOTICE.md` for the separate codec-patent issue.
