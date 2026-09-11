# Edituno

Edituno is a local-first, installable TypeScript video editor PWA focused on an unusually clear mobile editing experience.

## v1.4.0 Mobile Excellence

The application now starts on a real Home screen on phones and desktop. Projects, formats, import, settings and install flows are accessible before entering the editor. The mobile editor uses a touch-first header, responsive preview, scrollable tool dock, bottom-sheet inspectors and multitrack V1/A1/T1 timeline.

Core editing currently includes trim, split, reorder, speed, volume, transforms, text and captions, SRT import, filters, adjustments, motion effects, transitions, multitrack audio with waveform, position, trim, fades and local 720p/1080p export.

### Source

- `src/app.ts` is the canonical application source.
- `src/styles.css` is the responsive design system.
- `src/index.template.html` is the PWA shell and splash startup UI.
- `dist/` is the prebuilt GitHub Pages release.

### Build

```bash
npm install
npm run build
```

### Philosophy

Editing actions should be discoverable, touch targets should be forgiving, selections should be visually obvious, and mobile should never feel like a squeezed desktop editor.
