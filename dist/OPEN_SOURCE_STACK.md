# Third-party and open-source stack decisions

> Licensing scope: Edituno itself is source-available under `PolyForm-Noncommercial-1.0.0`. The open-source projects listed below are not relicensed by Edituno and retain their own licenses. See `LICENSE_SCOPE.md` and `THIRD_PARTY_NOTICES.md`.


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

## Used in v2.2.0

### Microsoft Fluent Emoji
License: MIT.
Use: on-demand searchable element library. Edituno loads the upstream catalog from the official Microsoft GitHub repository, offers Color SVG and 3D PNG variants, and stores only assets selected by the user inside the local project.



## Phase 1 GPU editing engine (v2.3.0)

- PixiJS 8.20.1, MIT: GPU rendering layer used for live and export effects.
- PixiJS Filters 6.1.5, MIT: selected real-time filters exposed through Edituno's own Effects interface.
- gl-transitions, MIT collection with per-file licensing: Edituno bundles only six shaders whose upstream headers explicitly state MIT.

The libraries are implementation engines. Edituno's interface, presets, project model, fallbacks, rendering orchestration and export integration are first-party Edituno code.
