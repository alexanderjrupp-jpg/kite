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

**Not yet separated:** cloud sync. v2 still talks to the same Firebase project and family documents as v1. Don't connect a real family's devices to v2 until sync is rebuilt.

## Removed from v1

Games (Find It), Stories & Songs, Model With Me routines, daily parent tips and milestone celebrations. Any stories or milestones already saved in a board are left in the data untouched; v2 just doesn't show them.

Also removed: the page builder (custom pages are made with normal edit mode: add a folder, pick "+ New page").

Kept: board, speech, grammar, keyboard, editing, symbols, Word Finder (and its guided path), analytics/target words, sync and accounts, volume limits, print and export/import.

## Levels

One board, three views. Set in Settings (behind the PIN), per device.

- **Level 1 · Starter** — its own 3x3 page (`pages.l1`): six lesson words that change with the week's targets, plus yes / more / no.
- **Level 2 · Building** — the 12x7 home board showing only buttons tagged `lv: 2`: the Universal Core 36, yes/no and six folders. Word Finder on.
- **Level 3 · Full board** — every button, including Chat, More, grammar endings and the keyboard.

Every button carries `lv` (lowest level it appears at). Hidden buttons keep their cell, so nothing moves between Levels 2 and 3, and switching never deletes anything. In edit mode, hidden buttons show faded with an L3 tag; the editor's "Shows at" field changes it. Each logged word records the level it was said at (`lv`), and level changes are kept in `board.levelLog`, so reports can tell a bigger board apart from language growth.

## Deploy

Live at **https://alexanderjrupp-jpg.github.io/kite/v2/**. GitHub Pages publishes from `main`, so pushing changes to `v2/` updates it.

v1 and v2 share the same web address (origin), so v2's service worker only ever clears its own `kite2-` caches, never v1's.
