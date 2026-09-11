# Edituno Studio v2.0.2

## iPhone viewport and scrollbar hotfix

- Locks the mobile application shell to the visual viewport instead of allowing the document to drift after the iOS software keyboard closes.
- Home content now scrolls inside its own surface while the bottom navigation stays anchored.
- Editor content stays inside a stable app shell while the tool dock remains anchored to the physical bottom edge.
- Bottom navigation is temporarily hidden while the software keyboard is open and restored after keyboard dismissal.
- Adds repeated post-blur viewport normalization to work around stale iOS Safari visualViewport offsets.
- Preserves internal Home scroll position without allowing window-level scrolling.
- Adds orientation and pageshow recovery.
- Adds a thin Edituno-themed scrollbar system for the desktop page, settings, sheets, inspectors, timeline and other scrollable surfaces.
- Keeps horizontal mobile carousels and the editor tool rail visually clean by hiding their scrollbar chrome.

No editing features or the official Edituno logo were changed.
