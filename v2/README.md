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

Kept: board, speech, grammar, keyboard, editing, symbols, Word Finder (and its guided path), page builder, analytics/target words, sync and accounts, volume limits, print and export/import.

## Deploy

Live at **https://alexanderjrupp-jpg.github.io/kite/v2/**. GitHub Pages publishes from `main`, so pushing changes to `v2/` updates it.

v1 and v2 share the same web address (origin), so v2's service worker only ever clears its own `kite2-` caches, never v1's.
