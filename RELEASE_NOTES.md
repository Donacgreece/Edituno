# Edituno Studio v2.0.1

Interaction reliability release.

## Fixed

- Mobile editor tool dock is pinned to the bottom safe area and scrolls only horizontally.
- Home Import now opens the system picker during the original user gesture, including iOS Safari/PWA.
- Imported music is placed under the visual timeline by default instead of being appended after the video.
- Long music is initially trimmed to the remaining visual duration so a soundtrack does not create an accidental black tail.
- Project three-dot buttons now open an Edituno action sheet.
- Project actions include Open, Rename, Duplicate and Delete.
- Project deletion uses an Edituno confirmation modal, never the browser confirm dialog.
- Delete-all also uses the Edituno confirmation UI.
- Project duplication copies local media to independent asset IDs so deleting one project does not break the other.
- Mobile editor body scrolling is locked while editing, while timeline and tool rows retain their intended horizontal scrolling.
