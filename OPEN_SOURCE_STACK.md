# Open-source stack evaluation

The following projects are approved candidates for Edituno. They are not all bundled in v1.6.0.

- **Lucide** (ISC/MIT): icon system. Integrated in v1.6.0.
- **OpenCut** (MIT): reference implementation and potential source for editor architecture/components. Do not wholesale-copy UI; selectively reuse proven subsystems with attribution.
- **Moveable** (MIT): high-quality on-canvas drag/resize/rotate handles. Recommended next integration.
- **WaveSurfer.js** (BSD-3-Clause): waveform visualization/regions. Recommended for advanced audio timeline.
- **Mediabunny** (MPL-2.0): WebCodecs-oriented browser media toolkit for MP4/WebM/MOV and other formats. Recommended for the next rendering/export engine with MPL compliance.
- **Fabric.js** (MIT): optional canvas object layer. Evaluate against Moveable before adding to avoid overlapping responsibilities.

Launch rule: only add a dependency when it improves a user-visible workflow and passes mobile Safari, Android Chrome, desktop Chromium and Firefox smoke tests.
