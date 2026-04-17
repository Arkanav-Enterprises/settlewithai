"""
Procedural generator — 3-state particle morph for the contact section.

Loop: S → Illustration (person + atom) → Claude-Code bot → S.
Targets:
  - S: sampled from the actual SVG path (viewBox 199x298) at page.tsx:731+
  - Illustration: skeletonized strokes from Anthropic's Claude Opus illustration
      (scripts/assets/illustration-ai.webp). Black particles = person/hand, white = atom.
  - bot: 16×10 pixel-art silhouette of the Claude-Code mascot

Output: public/settle-morph.json (Lottie v5.12, 500 particles, 480 frames @ 60fps = 8s loop).
"""

import json, math, random, re
from pathlib import Path
import numpy as np
from PIL import Image
from skimage.morphology import skeletonize, closing, disk

random.seed(17)

# ─── Canvas ───────────────────────────────────────────────────────
W, H = 199, 298
FPS = 60
TOTAL = 480  # 8s loop
N = 500
R_DOT = 1.55  # slightly larger than before for richness

# ─── Timeline ─────────────────────────────────────────────────────
#   0- 30  S hold (0.5s)
#  30-130  morph → Illustration  (per-particle arrival randomized in this window)
# 130-190  Illustration hold (1.0s)
# 190-290  morph → bot
# 290-350  bot hold (1.0s)
# 350-450  morph → S
# 450-480  S settle (0.5s)

WHITE = [1.0, 1.0, 1.0, 1.0]
BLACK = [0.0, 0.0, 0.0, 1.0]

EASINGS = [
    (0.00, 0.00, 0.58, 1.00),  # out-cubic
    (0.40, 0.00, 0.20, 1.00),  # premium (MD3)
    (0.65, 0.00, 0.35, 1.00),  # in-out-cubic
    (0.19, 1.00, 0.22, 1.00),  # out-expo
    (0.33, 1.00, 0.68, 1.00),  # soft-out
]

def ease_tangents(idx):
    ox, oy, ix, iy = EASINGS[idx]
    return ({"x": [ox], "y": [oy]}, {"x": [ix], "y": [iy]})

# ─── Cubic Bezier path sampling ───────────────────────────────────
def cubic(p0, p1, p2, p3, t):
    u = 1 - t
    return (
        u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
        u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1],
    )

def seg_length(p0, p1, p2, p3, n=40):
    last, total = p0, 0.0
    for i in range(1, n + 1):
        cur = cubic(p0, p1, p2, p3, i / n)
        total += math.hypot(cur[0] - last[0], cur[1] - last[1])
        last = cur
    return total

def parse_path(d):
    tokens = re.findall(r"[A-Za-z]|-?\d*\.?\d+(?:[eE][-+]?\d+)?", d)
    segs, i = [], 0
    current = (0.0, 0.0); start = current
    while i < len(tokens):
        t = tokens[i]
        if t == "M":
            i += 1
            current = (float(tokens[i]), float(tokens[i+1])); i += 2
            start = current
        elif t == "C":
            i += 1
            while i < len(tokens) and not tokens[i].isalpha():
                p1 = (float(tokens[i]),   float(tokens[i+1]))
                p2 = (float(tokens[i+2]), float(tokens[i+3]))
                p3 = (float(tokens[i+4]), float(tokens[i+5]))
                segs.append((current, p1, p2, p3))
                current = p3
                i += 6
        elif t == "Z":
            i += 1; current = start
        else:
            i += 1
    return segs

def sample_path(d, count, jitter=0.0):
    segs = parse_path(d)
    lens = [seg_length(*s) for s in segs]
    total = sum(lens)
    pts = []
    for s, L in zip(segs, lens):
        n = max(1, round(count * L / total))
        for k in range(n):
            t = (k + 0.5) / n
            x, y = cubic(*s, t)
            if jitter:
                x += random.uniform(-jitter, jitter)
                y += random.uniform(-jitter, jitter)
            pts.append((x, y))
    random.shuffle(pts)
    return pts[:count] if len(pts) >= count else pts + [random.choice(pts) for _ in range(count - len(pts))]

# ─── S geometry (exactly the paths rendered by the site) ──────────
S_MAIN = "M146.118 42.7126C134.632 77.172 157.605 100.145 180.578 65.6855C203.551 31.2261 192.064 -3.23338 157.605 8.2531C123.145 19.7396 79.1857 107.5 88.6857 157.577C98.1857 207.655 146.536 175.199 143.686 198C141.183 218.02 122.766 234.672 103.186 252.601C78.9328 274.809 48.99 295.263 29.4417 293.252C-6.69105 289.535 -2.97404 253.403 32.1474 231.455C67.2688 209.507 78.7483 239.9 54.095 266.576"
S_FLICK_TOP = "M163.02 26.5102C169.912 15.0237 179.101 19.6183 174.507 33.4021"
S_FLICK_BOT = "M38.0201 243.892C44.9119 255.378 54.1011 250.784 49.5065 237"
S_DOTS = [(106.507, 248.486), (187.507, 11.4865), (94.5065, 98.4865)]

def sample_dots(centers, per_dot, radius):
    pts = []
    for cx, cy in centers:
        for _ in range(per_dot):
            a = random.uniform(0, 2 * math.pi)
            r = radius * math.sqrt(random.random())
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return pts

def sample_s():
    """Total 500: 430 along the long stroke + 18 on flicks + 45 in the 3 accent dots + 7 spare"""
    pts  = sample_path(S_MAIN, 430, jitter=1.4)
    pts += sample_path(S_FLICK_TOP, 9, jitter=0.5)
    pts += sample_path(S_FLICK_BOT, 9, jitter=0.5)
    pts += sample_dots(S_DOTS, per_dot=15, radius=8.5)  # 45 total
    # pad/trim
    random.shuffle(pts)
    return pts[:N] if len(pts) >= N else pts + [random.choice(pts) for _ in range(N - len(pts))]

# ─── Illustration — skeletonized strokes from a webp ──────────────
# Black strokes (person profile + hand) → black particles at AI hold.
# White strokes (atom/orbital) → white particles throughout.
# Landscape illustration is fit to 90% of viewBox width, centered.
def sample_illustration(n_black=300, n_white=200):
    """Returns [(x, y, is_black), ...] — 500 particles total, colored by stroke source."""
    img_path = Path(__file__).parent / "assets" / "illustration-ai.webp"
    arr = np.array(Image.open(img_path).convert("RGB"))
    r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
    black_mask = (r < 80) & (g < 80) & (b < 80)
    white_mask = (r > 225) & (g > 225) & (b > 225)

    # Close small gaps, then skeletonize to 1-pixel centerlines
    black_skel = skeletonize(closing(black_mask, disk(2)))
    white_skel = skeletonize(closing(white_mask, disk(2)))

    ys_b, xs_b = np.where(black_skel)
    ys_w, xs_w = np.where(white_skel)

    # Even-stride sampling along the skeleton (keeps strokes continuous)
    def stride_sample(xs, ys, n):
        if len(xs) == 0:
            return []
        idxs = np.linspace(0, len(xs) - 1, n).astype(int)
        return list(zip(xs[idxs].tolist(), ys[idxs].tolist()))

    black_px = stride_sample(xs_b, ys_b, n_black)
    white_px = stride_sample(xs_w, ys_w, n_white)

    # Fit: use the union bbox so both sets share the same coordinate transform
    all_x = [p[0] for p in black_px + white_px]
    all_y = [p[1] for p in black_px + white_px]
    bx_min, bx_max = min(all_x), max(all_x)
    by_min, by_max = min(all_y), max(all_y)
    bw = bx_max - bx_min
    bh = by_max - by_min

    # Fit to 90% of viewBox width, preserve aspect
    target_w = W * 0.90
    scale = target_w / bw
    rendered_w = bw * scale
    rendered_h = bh * scale
    ox = (W - rendered_w) / 2
    oy = (H - rendered_h) / 2

    def transform(pts, is_black):
        jitter = 0.6  # soft organic feel
        return [
            (
                ox + (x - bx_min) * scale + random.uniform(-jitter, jitter),
                oy + (y - by_min) * scale + random.uniform(-jitter, jitter),
                is_black,
            )
            for x, y in pts
        ]

    pts = transform(black_px, True) + transform(white_px, False)
    random.shuffle(pts)
    # Pad/trim to exactly N
    if len(pts) >= N:
        return pts[:N]
    return pts + [random.choice(pts) for _ in range(N - len(pts))]

# ─── Claude-Code bot silhouette ───────────────────────────────────
# Extracted from ~/Downloads/claudecode.webp (1280×1280, 56px-per-block pixel art).
# 16 wide × 10 tall. '#' = white body cell, 'X' = black eye cell, '.' = background.
BOT_BITMAP = [
    "..############..",
    "..############..",
    "..##X######X##..",  # eye row 1
    "..##X######X##..",  # eye row 2
    "################",  # arms extend full width
    "################",
    "..############..",
    "..############..",
    "...#.#....#.#...",  # legs
    "...#.#....#.#...",
]

def sample_bot():
    """
    Render the 16×10 bot silhouette, fitted to the viewBox at 88% width.
    Each opaque cell (# or X) becomes a cluster of particles; X cells are flagged black.
    Returns [(x, y, is_black), ...] length N.
    """
    opaque = [(x, y, ch == "X")
              for y, row in enumerate(BOT_BITMAP)
              for x, ch in enumerate(row) if ch in "#X"]
    if not opaque:
        return [(W/2, H/2, False)] * N

    bw = len(BOT_BITMAP[0])  # 16
    bh = len(BOT_BITMAP)     # 10

    # Fit: scale to fill ≈88% of viewBox width while preserving aspect
    target_w = W * 0.88
    scale = target_w / bw
    rendered_w = bw * scale
    rendered_h = bh * scale
    ox = (W - rendered_w) / 2
    oy = (H - rendered_h) / 2

    # Particles per cell, proportional with carried remainder
    per_cell = N / len(opaque)
    pts = []
    remainder = 0.0
    for (cx_idx, cy_idx, is_black) in opaque:
        count = per_cell + remainder
        k = int(count)
        remainder = count - k
        jitter = scale * 0.45  # slightly smaller than full cell for cohesion
        cx = ox + (cx_idx + 0.5) * scale
        cy = oy + (cy_idx + 0.5) * scale
        for _ in range(k):
            pts.append((cx + random.uniform(-jitter, jitter),
                        cy + random.uniform(-jitter, jitter),
                        is_black))
    random.shuffle(pts)
    return pts[:N] if len(pts) >= N else pts + [random.choice(pts) for _ in range(N - len(pts))]

# ─── Organic angle-pair matching across all 3 shapes ──────────────
CX, CY = W / 2, H / 2
def angle(p): return math.atan2(p[1] - CY, p[0] - CX)

def align_by_angle(*point_sets, swap_pct=0.10):
    """Sort each set by angle from center, return N-tuples (one position per shape per particle)."""
    sorted_sets = [sorted(pts, key=angle) for pts in point_sets]
    paired = list(zip(*sorted_sets))
    for _ in range(int(len(paired) * swap_pct)):
        i = random.randint(0, len(paired) - 2)
        paired[i], paired[i+1] = paired[i+1], paired[i]
    return paired

# ─── Lottie layer ─────────────────────────────────────────────────
def particle_layer(idx, s_pos, ai_data, bot_data):
    ai_x, ai_y, ai_is_black = ai_data
    bot_x, bot_y, bot_is_black = bot_data
    ai_pos = (ai_x, ai_y)
    bot_pos = (bot_x, bot_y)

    # Morph 1: S → Illustration
    d1 = random.randint(30, 55)
    a1 = random.randint(85, 130)
    if a1 <= d1 + 15: a1 = d1 + 25
    # Morph 2: Illustration → bot
    d2 = random.randint(190, 215)
    a2 = random.randint(245, 290)
    if a2 <= d2 + 15: a2 = d2 + 25
    # Morph 3: bot → S
    d3 = random.randint(350, 375)
    a3 = random.randint(405, 450)
    if a3 <= d3 + 15: a3 = d3 + 25

    o1, i1 = ease_tangents(random.randint(0, len(EASINGS) - 1))
    o2, i2 = ease_tangents(random.randint(0, len(EASINGS) - 1))
    o3, i3 = ease_tangents(random.randint(0, len(EASINGS) - 1))
    hold = {"x": [0.5], "y": [0.5]}

    pos_kfs = [
        {"t": 0,   "s": list(s_pos),   "o": hold, "i": hold},
        {"t": d1,  "s": list(s_pos),   "o": o1,   "i": i1},
        {"t": a1,  "s": list(ai_pos),  "o": hold, "i": hold},
        {"t": d2,  "s": list(ai_pos),  "o": o2,   "i": i2},
        {"t": a2,  "s": list(bot_pos), "o": hold, "i": hold},
        {"t": d3,  "s": list(bot_pos), "o": o3,   "i": i3},
        {"t": a3,  "s": list(s_pos)},
    ]

    # Color animation: white in S state. Particles that are black in AI state hold black through
    # the illustration window; particles that are black in bot state hold black through the bot
    # window (for the eye slots). Everything returns to white during the bot→S morph.
    ai_color  = BLACK if ai_is_black  else WHITE
    bot_color = BLACK if bot_is_black else WHITE
    if ai_is_black or bot_is_black:
        color_prop = {"a": 1, "k": [
            {"t": d1, "s": list(WHITE),     "o": o1, "i": i1},
            {"t": a1, "s": list(ai_color),  "h": 1},
            {"t": d2, "s": list(ai_color),  "o": o2, "i": i2},
            {"t": a2, "s": list(bot_color), "h": 1},
            {"t": d3, "s": list(bot_color), "o": o3, "i": i3},
            {"t": a3, "s": list(WHITE)},
        ]}
    else:
        color_prop = {"a": 0, "k": list(WHITE)}

    return {
        "ddd": 0, "ind": idx + 1, "ty": 4, "nm": f"p{idx}", "sr": 1,
        "ks": {
            "o": {"a": 0, "k": 100},
            "r": {"a": 0, "k": 0},
            "p": {"a": 1, "k": pos_kfs},
            "a": {"a": 0, "k": [0, 0, 0]},
            "s": {"a": 0, "k": [100, 100, 100]},
        },
        "ao": 0,
        "shapes": [{
            "ty": "gr", "nm": "g",
            "it": [
                {"ty": "el", "d": 1,
                 "s": {"a": 0, "k": [R_DOT * 2, R_DOT * 2]},
                 "p": {"a": 0, "k": [0, 0]}, "nm": "dot"},
                {"ty": "fl", "nm": "fill",
                 "c": color_prop,
                 "o": {"a": 0, "k": 100}, "r": 1, "bm": 0},
                {"ty": "tr",
                 "p": {"a": 0, "k": [0, 0]}, "a": {"a": 0, "k": [0, 0]},
                 "s": {"a": 0, "k": [100, 100]}, "r": {"a": 0, "k": 0},
                 "o": {"a": 0, "k": 100}},
            ],
        }],
        "ip": 0, "op": TOTAL, "st": 0, "bm": 0,
    }

def main():
    s_pts   = sample_s()
    ai_pts  = sample_illustration()
    bot_pts = sample_bot()
    triples = align_by_angle(s_pts, ai_pts, bot_pts, swap_pct=0.12)

    layers = [particle_layer(i, s, a, b) for i, (s, a, b) in enumerate(triples)]

    out_path = Path(__file__).parent.parent / "public" / "settle-morph.json"
    lottie = {
        "v": "5.12.2",
        "fr": FPS, "ip": 0, "op": TOTAL,
        "w": W, "h": H,
        "nm": "settle-morph-3",
        "ddd": 0, "assets": [],
        "layers": layers,
        "meta": {"g": "settle-3state", "a": "motion-design-skill"},
    }
    out_path.write_text(json.dumps(lottie, separators=(",", ":")))
    print(f"wrote {out_path}  ({len(layers)} particles, {TOTAL} frames @ {FPS}fps, {TOTAL/FPS}s loop)")

if __name__ == "__main__":
    main()
