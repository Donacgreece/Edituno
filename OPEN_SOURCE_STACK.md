# Open-source stack decisions

## Used in v2.0

### Lucide
License: ISC, with MIT ancestry for some icons.
Use: normalized UI icon geometry.
Reason: consistent stroke weight and optical proportions across mobile and desktop.

## Approved for the engine roadmap

### Moveable 0.53.x
License: MIT.
Planned use: desktop and tablet on-canvas resize, rotate and snapping handles.
Current v2.0 already provides dependency-free drag and pinch scaling so a new dependency does not block launch.

### WaveSurfer.js 8.x
License: BSD-3-Clause.
Planned use: richer audio region editing and high-resolution waveform interaction.
The current editor keeps its lightweight generated waveform for launch stability.

### Mediabunny 1.56.x
License: MPL-2.0.
Planned use: WebCodecs-based parsing, encoding, transcoding and wider media format support.
MPL obligations must be preserved for covered files.

### OpenCut
License: MIT.
Use: architectural reference for a browser/mobile editor and possible isolated reusable subsystems after code-level review.
We do not copy its product UI or branding.

- Fluent Emoji (MIT): approved source for a future large built-in sticker/emoji library. Full pack is not bundled in v2.1 to keep the launch PWA small.
