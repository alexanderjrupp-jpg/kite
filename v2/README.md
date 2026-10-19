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

## Deploy

- **Vercel:** project imported from this repo with Root Directory = `v2`. No build step, no framework preset.
- **GitHub Pages:** also reachable at `/kite/v2/`, because Pages publishes the whole repo. Use the Vercel link for testing.
