# Release Notes

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
