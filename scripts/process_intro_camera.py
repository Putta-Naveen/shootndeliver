"""One-off: remove checker / light background from intro camera PNG (edge BFS)."""
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "images" / "intro-camera-source.png"
OUT_DIR = ROOT / "assets" / "images"
OUT = OUT_DIR / "intro-camera.png"


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source: {SRC}")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    img = Image.open(SRC).convert("RGBA")
    arr = np.array(img)
    h, w = arr.shape[0], arr.shape[1]
    bg = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    def luma_sat(y: int, x: int) -> tuple[float, float]:
        r, g, b = arr[y, x, :3].astype(np.float64)
        lu = 0.299 * r + 0.587 * g + 0.114 * b
        sa = float(np.max([r, g, b]) - np.min([r, g, b]))
        return lu, sa

    def seed_edge(y: int, x: int) -> None:
        lu, sa = luma_sat(y, x)
        if lu > 158 and sa < 72 and not bg[y, x]:
            bg[y, x] = True
            q.append((y, x))

    for x in range(w):
        seed_edge(0, x)
        seed_edge(h - 1, x)
    for y in range(h):
        seed_edge(y, 0)
        seed_edge(y, w - 1)

    while q:
        y, x = q.popleft()
        lu, sa = luma_sat(y, x)
        for dy, dx in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            ny, nx = y + dy, x + dx
            if ny < 0 or ny >= h or nx < 0 or nx >= w or bg[ny, nx]:
                continue
            lu2, sa2 = luma_sat(ny, nx)
            if lu2 > 148 and sa2 < 78:
                bg[ny, nx] = True
                q.append((ny, nx))

    out = arr.copy()
    out[:, :, 3] = np.where(bg, 0, out[:, :, 3])
    Image.fromarray(out).save(OUT, optimize=True)
    print("Wrote", OUT)


if __name__ == "__main__":
    main()
