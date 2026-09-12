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
- Mediabunny: MPL-2.0
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
