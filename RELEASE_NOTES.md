# Release Notes

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
