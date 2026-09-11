# Edituno Studio v2.2.0

A mobile-first local video editor PWA with a professional desktop workspace.

## Included in v2.2.0

- Draggable editor sheets with collapsed, half and full snap positions
- Timeline and panel position preservation during edits and rerenders
- Desktop tool parity for Media, Edit, Text, Elements, Audio, Effects, Adjust, Transitions and Canvas
- V1 plus overlay video/image layers, audio, elements and text tracks
- Direct canvas drag, resize and pinch scaling
- Complete Microsoft Fluent Emoji catalog browser with 1,285 Color SVG and 1,285 3D PNG choices, loaded lazily from the official MIT-licensed repository and cached locally
- Local project storage and autosave
- 720p, 1080p and 4K local export when supported by the browser/device
- Greek and English UI
- Installable PWA with the official Edituno logo

The Fluent catalog metadata is prefetched and cached in the background. Individual artwork is downloaded only when needed so the initial PWA does not ship thousands of unused files. Selected assets are stored locally inside the project.

Run `npm run build` to rebuild `dist`.
