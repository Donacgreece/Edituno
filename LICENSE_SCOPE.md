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
