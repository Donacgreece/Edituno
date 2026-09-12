# Release Notes

## v2.7.1

iPhone/iPad MOV + PCM compatibility export.

- Apple mobile projects with audible audio no longer use AAC for the final export.
- iPhone and iPad now export a QuickTime `.mov` file with H.264/AVC video and 48 kHz stereo 16-bit PCM audio.
- This removes Safari's AAC encoder and AAC-in-MP4 metadata path from the final Apple mobile output entirely.
- PCM audio is uncompressed, so the audio track is larger than AAC but remains modest compared with 1080p video bitrate.
- Export validates the QuickTime container, the audio handler and the classic QuickTime `sowt` PCM sample entry before presenting the file as successful.
- Desktop and non-Apple export behavior remains unchanged.
- No new third-party dependency was added.

## v2.7.0

Apple mobile export engine replacement.

- Replaced Safari's native AAC AudioEncoder path on iPhone/iPad with `@mediabunny/aac-encoder` 1.56.2, which uses FFmpeg's AAC-LC encoder compiled to WebAssembly.
- Apple mobile exports are muxed with actively maintained Mediabunny 1.56.2 instead of relying on the deprecated mp4-muxer path.
- The Edituno renderer remains deterministic: every output frame is rendered at an explicit project timestamp.
- Audio is rendered once as a 48 kHz stereo timeline mix, then encoded by the WASM AAC encoder independently of Safari's native AAC implementation.
- Apple mobile projects with expected audio will no longer silently fall back to the known-bad Safari MediaRecorder/native AAC path if the new engine fails.
- Desktop export keeps the existing v2.6 deterministic WebCodecs path to avoid changing a workflow that is already producing audio.
- Existing GPU effects, Smart Tools, Konva manipulation, light mode, autosave and licensing remain intact.

## v2.6.3

iPhone original-audio passthrough export.

- Stops re-encoding AAC on Apple mobile when the project audio is unchanged and can safely use the source track.
- For normal talking-head/video clips with original volume, speed 1.0 and no audio fades, Edituno now demuxes the original AAC packets and muxes those exact packets into the rendered MP4 with timeline-adjusted timestamps.
- This bypasses Safari's AAC AudioEncoder entirely for the most common mobile editing workflow, eliminating the silent-AAC encoder failure path while preserving the original source audio quality.
- Supports trims and multiple primary video clips as long as their AAC format is compatible.
- Adds PCM RMS validation before audio re-encoding so a zero-energy offline mix is never treated as valid audio.
- Adds a post-export audible-energy probe on Apple mobile. A file that contains an audio track but decodes to silence is rejected instead of being offered as a successful export.
- Projects that change audio speed, volume, fades, overlay audio or add A1 tracks still use the mixed-audio path and compatibility fallback.

## v2.6.2

Safari/iPhone audio export repair.

- Added an MP4/QuickTime AAC demux fallback with MP4Box.js 2.4.1 for cases where Safari/WebKit cannot decode the embedded audio stream through `decodeAudioData()`.
- Extracted AAC access units are decoded through WebCodecs `AudioDecoder` and rebuilt as PCM before Edituno performs its deterministic timeline audio mix.
- Added explicit AAC `AudioSpecificConfig` generation for common AAC-LC tracks.
- Repairs Safari/WebKit AAC `AudioEncoder` metadata before mp4-muxer receives it, avoiding the known WebKit behavior where the encoder can expose an `esds`-style description instead of the required AudioSpecificConfig and create silent MP4 audio tracks.
- Retains the iOS audio-context unlock, realtime compatibility path and audio-track validation from v2.6.1.
- Does not change the editor interface, GPU effects, Smart Tools or Konva editing.

## v2.6.1

Mobile audio export reliability hotfix.

- Prevents deterministic WebCodecs export from silently producing video-only MP4 when Safari cannot decode the embedded audio track through `decodeAudioData`.
- Prewarms and unlocks the export AudioContext directly from the user's Export tap before asynchronous export preparation can lose iOS user activation.
- Routes all realtime fallback audio through one persistent master Web Audio bus connected to both the recorder stream and an inaudible keep-alive monitor.
- Uses the source video's own media clock to drive fallback video-frame rendering, improving lip sync because picture and embedded audio share the same playback clock.
- Uses the same high bitrate policy as the deterministic exporter for fallback 720p/1080p/4K recording.
- Validates that MP4 output contains an audio track whenever the project is expected to contain audible media. Silent video-only output is rejected instead of being presented as a successful export.
- Stores video audio-track presence on new imports when the browser exposes that metadata.
- Phase 1 GPU effects, Phase 2 Smart Tools, Phase 3 Konva and the deterministic WebCodecs export path remain intact.

## v2.6.0

Production Export Engine.

- Replaces the primary realtime MediaRecorder export path with deterministic, timestamped WebCodecs rendering when the browser supports it.
- Every output frame is rendered at an exact timeline timestamp instead of depending on wall-clock video playback.
- Video sources are frame-seeked explicitly before composition, including deterministic overlay rendering.
- Embedded V1 audio, overlay audio and A1 audio are mixed offline against the exact project timeline.
- Audio is encoded as AAC and video as AVC/H.264 with explicit timestamps before MP4 muxing.
- 1080p bitrate is raised substantially for upload-ready quality, with higher targets for 60 fps and 4K.
- Adds periodic keyframes and quality-oriented WebCodecs configuration.
- Keeps the v2.5.1 MediaRecorder exporter as a compatibility fallback for browsers without the required WebCodecs codecs.
- Adds pinned mp4-muxer 5.2.2 under its original MIT license.
- Preserves GPU effects, shader transitions, Smart Tools, Konva direct manipulation, themes and PWA behavior.

## v2.5.1

### Deployment verification hotfix

- Fixed the GitHub Pages verification step that was still hard-coded to the old `edituno-studio-v2.5.0` cache name after the v2.5.1 export-engine release.
- Deployment verification now reads the version directly from `package.json`, so future version bumps cannot fail for this same reason.
- The manifest version is now verified dynamically as well.
- No application feature or export code changed in this hotfix.

Export Engine reliability hotfix.

- Reworked local export so video frames no longer depend blindly on a detached hidden video playback clock.
- Export media is kept alive in the document and automatically resynchronized if the media clock stalls or drifts.
- Uses manual canvas `requestFrame()` capture when supported by the browser.
- Embedded V1 video audio now stays connected to both the export stream and a zero-gain AudioContext keep-alive path.
- MediaRecorder finalization now completes before the AudioContext is closed.
- The render loop is serialized so asynchronous effects and transitions cannot collapse into a first-frame-only recording.
- Adds a post-export validation pass before download.
- Phase 1 GPU effects, Phase 2 Smart Tools and Phase 3 Konva manipulation remain unchanged.

## v2.5.0

Konva direct canvas editing.

- Added Konva 10.5.0 as the Phase 3 MIT-licensed interaction engine.
- Text, V2/V3 overlays, Fluent Emoji overlays and built-in stickers/elements can be selected directly from the preview.
- Added direct drag, uniform corner resize and rotation with a Konva Transformer.
- Added center and rule-of-thirds snapping guides.
- Added larger transformer handles on mobile.
- Added persistent text scale and rotation to the Edituno project model and export renderer.
- Added direct text double-click/tap focus into the text editor.
- Added object-position controls for built-in elements and a compact direct-manipulation hint in the Inspector.
- Preserved Edituno's existing renderer and export path. Konva is used for interaction only, so preview and export continue to use the same project data.
- Replaced fragile smart-engine byte-size assumptions in CI with exact package-version and non-empty browser-bundle verification.
- Added Konva MIT notice, license copy and license-scope separation.

## v2.4.1

Phase 2 deployment hotfix.

- Fixed the GitHub Actions smart-engine verification threshold for the official Meyda 5.6.3 minified browser bundle.
- Meyda 5.6.3 `dist/web/meyda.min.js` is intentionally compact, so CI now validates it with an appropriate minimum size instead of rejecting the legitimate package.
- The same corrected threshold is used by the production vendor copy guard.
- Auto Reframe, silence detection, beat detection, timeline smart guides and beat-driven cuts from v2.4.0 remain unchanged.

## v2.4.0

Smart editing Phase 2.

- Added Auto Reframe with Smartcrop.js 2.0.5.
- Video Auto Reframe samples three positions in the selected V1 clip and applies a stable content-aware crop to the current project aspect ratio.
- Added Smart Audio with Meyda 5.6.3 for local audio feature extraction.
- Added silence-region detection with an automatically derived threshold.
- Added beat peak detection and BPM estimation.
- Added beat and silence guides directly on the timeline.
- Added configurable beat density and one-click V1 cuts driven by detected audio beats.
- Added safe reset, clear-analysis and re-analysis flows.
- Added MIT license copies and third-party notices for Smartcrop.js and Meyda.
- Preserved the v2.3.1 pinned GPU vendor pipeline, GPU effects, shader transitions, light mode, autosave and existing editor layout.

## v2.3.1

GPU vendor pipeline hotfix.

- Fixed the GitHub Pages failure caused by the npm `pixi-filters` package not exposing the expected browser bundle path.
- CI now fetches the official pinned PixiJS 8.20.1 and PixiJS Filters 6.1.5 release browser bundles.
- Both browser bundles are SHA-256 verified before the production build runs.
- Phase 1 effects, transitions, export integration and MIT third-party notices remain unchanged.

## v2.3.0

GPU Effects and Shader Transitions release.

- Added a new 3 x 3 GPU Effects section with real PixiJS/PixiJS Filters processing.
- Added Bloom, Glitch, CRT, Old Film, RGB Split, Pixelate, Bulge and Dream Blur with an intensity control.
- Effects are integrated into preview and export, with safe Canvas fallbacks.
- Added six real WebGL two-frame transitions from explicitly MIT-licensed gl-transitions shaders.
- Added offline caching for GPU vendor bundles and transition shaders.
- Expanded third-party notices and preserved PolyForm scope separation.

## v2.2.16

Licensing and third-party scope release.

- Licensed Edituno first-party code and documentation under `PolyForm-Noncommercial-1.0.0`.
- Added `LICENSE.md`, `LICENSE_SCOPE.md` and the PolyForm `Required Notice`.
- Explicitly excluded third-party libraries, icon geometry and artwork from the Edituno PolyForm grant so their upstream licenses remain unchanged.
- Expanded `THIRD_PARTY_NOTICES.md` with current upstream license references.
- Added licensing metadata to `package.json`, the source headers and `llms.txt`.
- Production builds now publish the legal files alongside the web application.

## v2.2.15

Settings symmetry and preference polish release.

- Added a dedicated Storage card paired with Export.
- Added a functional Auto save On / Off preference, enabled by default.
- When Auto save is disabled, background debounce writes stop while deliberate project navigation still persists the project safely.
- Rebuilt the System / Dark / Light selector layout so the active checkmark has a dedicated column and cannot overlap the theme label.
- Preserved the adaptive theme system, expanded preview, support navigation, SEO, sitemap and PWA behavior.

## v2.2.14

Adaptive Theme System release.

- Added System, Dark and Light appearance modes in Settings using the existing rounded segmented-control language.
- Added persistent theme preference through Edituno preferences.
- Added live system-theme following when System is selected.
- Added dynamic browser/PWA theme-color updates.
- Added an early theme bootstrap to prevent a dark flash when launching in Light mode.
- Added a comprehensive Light palette across Home, Settings, editor, timeline, Inspector, mobile sheets, install flow and Support page.
- Preserved all v2.2.13 behavior, expanded preview sizing, startup stability, SEO, sitemap and Support navigation.

## v2.2.13

Mobile Support dock polish release.

- Replaced the fourth mobile bottom dock item icon from circle to heart.
- Renamed the fourth mobile bottom dock item from About / Σχετικά to Support / Υποστήριξη.
- Kept the same internal destination, so the button still opens the Support page.
- Preserved the expanded preview layout, editor startup fix, header cleanup and support navigation improvements.

## v2.2.12

Expanded preview release.

- Enlarged the actual preview frame inside the existing viewer area without changing the editor panel size.
- Removed the oversized internal preview insets that wasted usable space.
- Optimized preview padding separately for desktop and mobile.
- Applied the improvement consistently to 16:9, 9:16, 1:1 and 4:5 formats.
- Preserved the v2.2.11 header/nav cleanup and v2.2.10 editor startup hotfix.

## v2.2.11

Editor header and home rail cleanup release.

- Removed the Edituno logo from the editor header for a cleaner workspace.
- Removed the duplicate About entry from the desktop left rail.
- Kept Support available from the dedicated Support button and from Settings.
- Preserved the v2.2.10 editor startup hotfix and all Support, Install, SEO, sitemap and social metadata improvements.

## v2.2.10

Editor startup stability hotfix.

- Restored the missing `selectedTransformTarget()` helper required by preview interactions.
- Fixed the editor crash that could occur immediately after opening a project on desktop and mobile.
- Added a production build guard so this helper cannot silently disappear again.
- Preserved v2.2.9 Support navigation, smart install, auto-domain SEO, sitemap and social metadata.

## v2.2.9

Support navigation polish. The desktop Support control and menu Support entries now open the internal Edituno support/about page. PayPal is only opened from the dedicated PayPal CTA inside that page.

## v2.2.8

- Desktop home rail now shows Support instead of Installation.
- Installed state no longer occupies a separate About or home rail card.
- Android and Windows use a direct native install action when available, without instructional steps.
- Manual installation steps are reserved for Apple flows that require them.
- About is fully scrollable on mobile so all information remains accessible.


## v2.2.7

About, Support and Smart Install release.

- Added a dedicated About Edituno page with feature and privacy information.
- Added optional PayPal support button.
- Added device-aware installation UI for iPhone/iPad, Android, Windows, Mac and other desktop browsers.
- Added native PWA prompt handling where supported.
- Added iOS Add to Home Screen instructions.
- Added installed-state persistence so the install offer is not shown again after successful installation.
- Added appinstalled handling and standalone-mode detection.


## v2.2.6

Automatic domain awareness release.

- GitHub Actions reads the currently configured GitHub Pages custom domain before every build.
- Canonical URL, Open Graph URL/image, Twitter image, SoftwareApplication schema, robots sitemap URL, sitemap entries and llms.txt are generated from one active site URL.
- Falls back to `https://donacgreece.github.io/Edituno/` while no custom domain is configured.
- Scheduled domain sync runs every six hours, so connecting `edituno.com` later requires no source-code edits.
- Social thumbnail remains at `public/og/edituno-share.png` and automatically receives the correct absolute public URL.

## v2.2.5

Temporary GitHub Pages social-sharing fix.

- Open Graph, Twitter, canonical and structured-data URLs now point to the current live GitHub Pages deployment.
- `robots.txt`, `sitemap.xml` and `llms.txt` now use the current GitHub Pages URL.
- The share image remains at `og/edituno-share.png`, now referenced through a publicly reachable absolute URL.
- `edituno.com` remains documented as the planned custom domain and can replace the temporary URLs when DNS is connected.

## v2.2.4

SEO, social sharing and discoverability release.

### Added
- Open Graph and Twitter card metadata
- Dedicated share image at `public/og/edituno-share.png`
- Structured data with `SoftwareApplication` schema
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- Professional repository README

### Improved
- Title, meta description and canonical URL targeting `https://edituno.com/`
- Manifest metadata and screenshots
- PWA cache versioning and asset cache busting
- GitHub Pages workflow checks for SEO and social assets

## v2.2.3

Desktop UI symmetry release. The nine editor tools use a 3 x 3 layout, desktop clip controls are owned by the right Inspector, Motion and Transitions fill complete 3-column grids, and Adjustments and Settings were visually rebuilt.

## v2.2.2

- Desktop sidebars repacked for safer widths and cleaner tool layout.
- Timeline clips, audio, overlays and elements expose resize handles.
