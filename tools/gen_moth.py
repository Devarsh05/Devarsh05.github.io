"""Generate the Field Journal hero moth in two variants.

A: clean moth  -- forest-ink single-weight linework, nothing else.
B: graph moth  -- A, plus wing veins resolving into a directed graph with
                  one vivid-lime node reading as an active state.

Right half is authored, left half is a mirror, so symmetry is exact.
"""
import math

W, H = 460, 380
CX = W / 2.0          # 230, axis of symmetry
INK = "#003329"
LIME = "#9bff48"

# ---------------------------------------------------------------- body axis
HEAD_Y   = 104
THORAX_Y = 142
ABDO_TOP = 168
ABDO_BOT = 286


def q(p0, p1, p2, t):
    """Point on a quadratic bezier."""
    u = 1 - t
    return (u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
            u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1])


def qtan(p0, p1, p2, t):
    """Unit tangent of a quadratic bezier."""
    u = 1 - t
    dx = 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0])
    dy = 2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1])
    n = math.hypot(dx, dy) or 1.0
    return dx / n, dy / n


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def pt(p):
    return f"{f(p[0])} {f(p[1])}"


# ---------------------------------------------------------------- wings
# Forewing: swept back, pointed apex. Shoulder sits at the thorax.
FORE = ("M 240 133 "
        "C 286 105 352 93 406 106 "
        "C 416 108 418 119 412 130 "
        "C 399 161 379 193 353 213 "
        "C 331 230 301 233 273 223 "
        "C 255 217 244 203 243 185 Z")

# Hindwing: smaller, rounder, tucked below the forewing margin.
HIND = ("M 244 189 "
        "C 282 199 332 223 354 255 "
        "C 364 271 359 288 342 296 "
        "C 317 308 287 301 267 284 "
        "C 251 270 243 246 243 213 Z")

# Vein fans: (base, tip) pairs. Veins radiate from the wing base.
FORE_BASE = (245, 152)
FORE_TIPS = [(398, 116), (409, 131), (386, 177), (352, 206), (302, 224)]
HIND_BASE = (247, 202)
HIND_TIPS = [(346, 257), (333, 285), (297, 296)]


def vein_paths(base, tips, bow=0.16):
    """Gently bowed veins so they read as drawn, not ruled."""
    out = []
    for tx, ty in tips:
        mx, my = (base[0] + tx) / 2.0, (base[1] + ty) / 2.0
        dx, dy = tx - base[0], ty - base[1]
        # perpendicular offset gives the vein its curve
        cx, cy = mx - dy * bow, my + dx * bow
        out.append((base, (cx, cy), (tx, ty)))
    return out


FORE_VEINS = vein_paths(FORE_BASE, FORE_TIPS)
HIND_VEINS = vein_paths(HIND_BASE, HIND_TIPS, bow=0.12)


# ---------------------------------------------------------------- antenna
ANT_P0 = (237, 100)
ANT_P1 = (270, 64)
ANT_P2 = (299, 46)


def antenna_barbs(n=7, length=9.0):
    """Pectinate teeth along the antenna shaft, angled back toward the head."""
    segs = []
    for i in range(n):
        t = 0.16 + (0.80 - 0.16) * i / (n - 1)
        px, py = q(ANT_P0, ANT_P1, ANT_P2, t)
        tx, ty = qtan(ANT_P0, ANT_P1, ANT_P2, t)
        # perpendicular, swept back a touch for a feathered look
        nx, ny = ty, -tx
        sweep = 0.35
        bx = px + (nx - tx * sweep) * length
        by = py + (ny - ty * sweep) * length
        segs.append(((px, py), (bx, by)))
    return segs


BARBS = antenna_barbs()


# ---------------------------------------------------------------- assembly
def right_half(graph=False):
    """Everything on the right of the axis. Mirrored for the left."""
    p = []
    p.append(f'<path d="{FORE}"/>')
    p.append(f'<path d="{HIND}"/>')

    veins = FORE_VEINS + HIND_VEINS
    vein_op = ' class="vein"' if graph else ""
    for a, c, b in veins:
        p.append(f'<path{vein_op} d="M {pt(a)} Q {pt(c)} {pt(b)}"/>')

    # antenna
    p.append(f'<path d="M {pt(ANT_P0)} Q {pt(ANT_P1)} {pt(ANT_P2)}"/>')
    for a, b in BARBS:
        p.append(f'<path d="M {pt(a)} L {pt(b)}"/>')

    # foreleg
    p.append('<path d="M 236 150 C 249 163 256 176 257 190"/>')
    return p


def graph_layer():
    """Nodes on real vein junctions; chevrons make the veins directed edges."""
    out = []
    # A node where the forewing veins converge, and one at each vein tip.
    out_nodes = [q(a, c, b, 0.9) for a, c, b in FORE_VEINS]

    # Directed chevrons riding the veins, pointing outward along the tangent.
    for a, c, b in FORE_VEINS:
        px, py = q(a, c, b, 0.52)
        tx, ty = qtan(a, c, b, 0.52)
        nx, ny = ty, -tx
        L, Wd = 5.0, 3.2
        tip = (px + tx * L, py + ty * L)
        l1 = (px - tx * L * 0.2 + nx * Wd, py - ty * L * 0.2 + ny * Wd)
        l2 = (px - tx * L * 0.2 - nx * Wd, py - ty * L * 0.2 - ny * Wd)
        out.append(f'<path class="edge" d="M {pt(l1)} L {pt(tip)} L {pt(l2)}"/>')

    out.append(f'<circle class="node" cx="{f(FORE_BASE[0])}" cy="{f(FORE_BASE[1])}" r="3"/>')
    for nx, ny in out_nodes:
        out.append(f'<circle class="node" cx="{f(nx)}" cy="{f(ny)}" r="3"/>')
    return out


def active_node():
    """Exactly one lime node, on the right forewing only. Asymmetry is the point."""
    a, c, b = FORE_VEINS[1]
    x, y = q(a, c, b, 0.9)
    return (f'<circle class="node-active" cx="{f(x)}" cy="{f(y)}" r="4.2"/>')


def body():
    return [
        # abdomen, tapering
        '<path d="M 221 170 C 217 206 220 248 227 281 '
        'C 229 288 231 288 233 281 C 240 248 243 206 239 170 Z"/>',
        # thorax
        f'<ellipse cx="{f(CX)}" cy="{THORAX_Y}" rx="14" ry="23"/>',
        # head
        f'<circle cx="{f(CX)}" cy="{HEAD_Y}" r="9.5"/>',
        # abdomen segment ticks
        '<path d="M 223 196 L 237 196"/>',
        '<path d="M 224 216 L 236 216"/>',
        '<path d="M 225 236 L 235 236"/>',
        '<path d="M 226 256 L 234 256"/>',
    ]


def build(graph=False):
    half = "\n      ".join(right_half(graph))
    bod = "\n    ".join(body())
    defs = ""
    style = ""
    glayer = ""

    if graph:
        style = (
            '\n  <style>\n'
            '    .vein { opacity: .4; }\n'
            '    .edge { opacity: .75; }\n'
            '    .node { fill: %s; stroke: none; }\n'
            '    .node-active { fill: %s; stroke: %s; stroke-width: 1.5; }\n'
            '  </style>' % (INK, LIME, INK)
        )
        g = "\n      ".join(graph_layer())
        glayer = (
            f'\n    <g class="moth-graph">\n      {g}\n    </g>'
            f'\n    <g class="moth-graph" transform="translate({W} 0) scale(-1 1)">'
            f'\n      {g}\n    </g>'
            f'\n    {active_node()}'
        )

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" \
class="moth" role="img" aria-hidden="true" fill="none" stroke="{INK}" \
stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{defs}{style}
  <g class="moth-wings">
    <g>
      {half}
    </g>
    <g transform="translate({W} 0) scale(-1 1)">
      {half}
    </g>
  </g>{glayer}
  <g class="moth-body">
    {bod}
  </g>
</svg>
'''


if __name__ == "__main__":
    import sys
    out = sys.argv[1] if len(sys.argv) > 1 else "."
    with open(f"{out}/moth-a.svg", "w", encoding="utf-8") as fh:
        fh.write(build(graph=False))
    with open(f"{out}/moth-b.svg", "w", encoding="utf-8") as fh:
        fh.write(build(graph=True))
    print("wrote moth-a.svg (clean) and moth-b.svg (graph)")
