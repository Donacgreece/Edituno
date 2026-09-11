# Edituno v1.3.0 Pro

This release focuses on editor architecture and day-to-day editing usability.

## Fixed

- Desktop landing and editor scrolling behavior
- Settings are accessible from both landing and editor and now change real editor preferences
- Typography and spacing across desktop, tablet and mobile
- Mobile editor tool dock and bottom-sheet scrolling

## New timeline architecture

- V1 video/image lane
- A1 audio lane
- T1 text/caption lane
- Audio clips are positioned independently from video
- Multiple music/audio clips can be mixed in the same project
- Imported audio gets a waveform and can be dragged horizontally
- Audio clips support trim, speed, volume, mute, fade-in and fade-out
- Desktop visual clips can be drag-reordered

## Export

Audio clips are decoded and scheduled into the export AudioContext so the exported file follows the same multitrack placement and mix as the project timeline.

## UI

The interface now uses native platform typography first, including SF Pro on Apple platforms and Segoe UI Variable on current Windows systems, with no external font dependency.
