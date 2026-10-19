# Kite v2

Working copy of Kite for the tiered-board rebuild (Levels 1–3). The original app at the repo root is untouched and stays live.

**Starting point:** an exact copy of v1 (build v12), with its own storage so the two never collide on the same device:

| | v1 (root) | v2 (this folder) |
|---|---|---|
| Board storage | `talkboard_v3` | `kite2_board` |
| Usage log | `talkboard_v3_log` | `kite2_log` |
| Device settings | `talkboard_device` | `kite2_device` |
| IndexedDB | `kite_db` | `kite2_db` |
| Offline cache | `kite-v1` | `kite2-v1` |

**Cloud sync** is separate from v1: v2 uses its own `k2_*` collections in the same Firebase project.

## Removed from v1

Games (Find It), Stories & Songs, Model With Me routines, daily parent tips and milestone celebrations. Any stories or milestones already saved in a board are left in the data untouched; v2 just doesn't show them.

Also removed: the page builder (custom pages are made with normal edit mode: add a folder, pick "+ New page").

Analytics is paused for the MVP: no usage log on the device and no usage uploads to the cloud. It comes back once there's a reliable way to tell the child's own taps from adults modeling.

Kept: board, speech, grammar, keyboard, editing, Word Finder (and its guided path), sync and accounts, volume limits, print and export/import.

## Symbols

ARASAAC symbols are built in: on first launch (and after a reset or import) the device looks up every word and folder that has no picture and uses the top match, preferring an exact keyword match. This runs in the background with no download step; emoji show until each symbol arrives. New buttons get a symbol automatically when saved without a picture. Symbols are stored as URLs and the service worker keeps a copy of each image for offline use. Any symbol can be swapped in edit mode.

## Levels

One board, three views. Set in Settings (behind the PIN), per device.

- **Level 1 · Starter** — its own 3x3 page (`pages.l1`): six lesson words that change with the week's targets, plus yes / more / no.
- **Level 2 · Building** — the 12x7 home board showing only buttons tagged `lv: 2`: the Universal Core 36, yes/no and six folders. Word Finder on.
- **Level 3 · Full board** — every button, including Chat, More, grammar endings and the keyboard.

Every button carries `lv` (lowest level it appears at). Hidden buttons keep their cell, so nothing moves between Levels 2 and 3, and switching never deletes anything. In edit mode, hidden buttons show faded with an L3 tag; the editor's "Shows at" field changes it. Level changes are kept in `board.levelLog` for when analytics returns.

## Deploy

Live at **https://alexanderjrupp-jpg.github.io/kite/v2/**. GitHub Pages publishes from `main`, so pushing changes to `v2/` updates it.

v1 and v2 share the same web address (origin), so v2's service worker only ever clears its own `kite2-` caches, never v1's.

## Phone sync

- **Start:** on the child's iPad, Settings → Phone sync → *Start a family on this device*. That device owns the family.
- **Add a device:** *Add a device* shows a QR code (and an 8-letter code) that works for 15 minutes. The phone's camera opens Kite with the code filled in; the phone joins as parent/caregiver, therapist/teacher, or another talker, and gets the family's board.
- **Only members can read or write a family.** The code is a one-time key for joining, not the lock. The owner can see connected devices and remove a lost one, or delete the whole family from the cloud.
- **One document per button.** Two people editing different buttons never overwrite each other. Edits made offline are kept and pushed on reconnect.
- **Optional account** (email or Google) keeps the same identity on a new device, so the board can be restored.
- Connected parent/therapist devices edit without the PIN.

Data layout and the security rules are in `firestore.rules` (paste into Firebase console → Firestore Database → Rules). The QR generator is `qrcode.js` (MIT, Kazuhiko Arase).
