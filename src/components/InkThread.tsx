"use client";

import { useEffect, useRef } from "react";

/**
 * A single continuous brush stroke running from the top of the page to
 * the bottom, drawn in sync with scroll, with a pen-nib dot at the tip.
 *
 * Brush feel:
 * - variable width in one stroke — the centerline is expanded into a
 *   filled ribbon whose width follows a "pen pressure" curve (thick
 *   bellies, thin passages, tapered tips), like a real ink stroke
 * - the descent is a lazy, human "S": low-frequency drift with no
 *   regular left-right rhythm, plus layered hand tremor
 * - a faint thin scratch line rides beside the stroke (ink doubling)
 *
 * Readability: before building the path, the real bounding boxes of all
 * text blocks are measured; wherever the stroke would cross text it is
 * steered into the empty gutter beside the content column instead, with
 * smoothed (low-pass filtered) transitions so the detour still reads as
 * one flowing hand movement. Crossings only happen in the whitespace
 * between sections. On narrow screens with no gutters the stroke is
 * hidden entirely (CSS).
 *
 * Scroll reveal: dash animation can't reveal a filled shape, so the
 * ribbon sits under an SVG mask whose stroked centerline is drawn with
 * stroke-dashoffset. Path geometry is rebuilt from the real document
 * size on resize/content changes.
 */

type Pt = { x: number; y: number };

type Block = {
  top: number;
  bottom: number;
  gutterX: number | null;
};

/** text blocks the stroke must not cross */
const AVOID_SELECTOR = [
  ".hero__hello",
  ".hero__name",
  ".hero__tagline",
  ".hero__meta",
  ".section__head",
  ".about__grid",
  ".projects__note",
  ".projects",
  ".skills",
  ".timeline",
  ".edu",
  ".contact__note",
  ".contact__title",
  ".contact__cta",
  ".contact__links",
  ".footer",
].join(", ");

/** deterministic pseudo-random in [0, 1) — stable across rebuilds */
const rand = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const toPathData = (points: Pt[]) =>
  points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

export function InkThread() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const ribbonRef = useRef<SVGPathElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);
  const nibRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const maskPath = maskPathRef.current;
    const ribbon = ribbonRef.current;
    const ghost = ghostRef.current;
    const nib = nibRef.current;
    if (!wrap || !svg || !maskPath || !ribbon || !ghost || !nib) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let maskLength = 0;

    const update = () => {
      if (maskLength === 0) return;
      const vh = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = docHeight - vh;

      // The pen tip tracks ~2/3 down the viewport, remapped so the stroke
      // starts slightly drawn at the top and completes at page bottom.
      const startFraction = Math.min(0.15, (vh * 0.66) / docHeight);
      const scrolled = maxScroll > 0 ? window.scrollY / maxScroll : 1;
      const fraction = prefersReducedMotion
        ? 1
        : clamp(startFraction + scrolled * (1 - startFraction), 0, 1);

      maskPath.style.strokeDashoffset = String(maskLength * (1 - fraction));

      const tip = maskPath.getPointAtLength(maskLength * fraction);
      nib.setAttribute("cx", tip.x.toFixed(1));
      nib.setAttribute("cy", tip.y.toFixed(1));
      nib.style.opacity = fraction >= 0.999 ? "0" : "1";
    };

    const build = () => {
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.scrollHeight;
      wrap.style.height = `${h}px`;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

      const phase = Array.from(
        { length: 6 },
        (_, i) => rand(i + 11) * Math.PI * 2
      );
      const inset = Math.max(34, w * 0.045);
      const step = 12;
      const pad = 28; // keep this much air between stroke and text

      // natural drift of the stroke, before any text avoidance
      const driftX = (y: number) => {
        const u = y / h;
        const drift =
          0.5 +
          0.26 * Math.sin(u * Math.PI * 2 * 1.4 + phase[0]) + // the big S
          0.12 * Math.sin(u * Math.PI * 2 * 3.3 + phase[1]) + // slow counter-curve
          0.045 * Math.sin(y * 0.0052 + phase[2]); // medium wander
        return clamp(w * drift, inset, w - inset);
      };

      // --- measure text blocks and pick an escape gutter for each ---
      const pageY = window.scrollY;
      const blocks: Block[] = Array.from(
        document.querySelectorAll(AVOID_SELECTOR)
      )
        .map((el, k) => {
          const r = el.getBoundingClientRect();
          if (r.width < 40 || r.height < 10) return null;
          const top = r.top + pageY - 50;
          const bottom = r.bottom + pageY + 50;
          const leftRoom = r.left - pad - inset;
          const rightRoom = w - inset - (r.right + pad);
          const natural = driftX((top + bottom) / 2);

          let gutterX: number | null = null;
          const canLeft = leftRoom >= 36;
          const canRight = rightRoom >= 36;
          if (canLeft || canRight) {
            const leftX = inset + leftRoom * 0.5;
            const rightX = r.right + pad + rightRoom * 0.5;
            let side: "l" | "r";
            if (canLeft && canRight) {
              side = Math.abs(leftX - natural) < Math.abs(rightX - natural) ? "l" : "r";
            } else {
              side = canLeft ? "l" : "r";
            }
            const room = side === "l" ? leftRoom : rightRoom;
            gutterX =
              (side === "l" ? leftX : rightX) +
              (rand(k * 13 + 7) - 0.5) * Math.min(24, room * 0.3);
          }
          return { top, bottom, gutterX };
        })
        .filter((b): b is Block => b !== null)
        .sort((a, b) => a.top - b.top);

      // --- sample the centerline: drift, but detour into gutters over text ---
      const ys: number[] = [];
      const rawX: number[] = [];
      for (let y = 0; y <= h + step; y += step) {
        const yy = Math.min(y, h);
        const block = blocks.find((b) => yy >= b.top && yy <= b.bottom);
        const x =
          block && block.gutterX !== null ? block.gutterX : driftX(yy);
        ys.push(yy);
        rawX.push(x);
        if (yy === h) break;
      }

      // low-pass filter (forward + backward EMA) so detours become smooth,
      // flowing hand movements instead of sharp jumps
      const alpha = step / (step + 150);
      const xs = rawX.slice();
      for (let i = 1; i < xs.length; i += 1) {
        xs[i] = xs[i - 1] + alpha * (xs[i] - xs[i - 1]);
      }
      for (let i = xs.length - 2; i >= 0; i -= 1) {
        xs[i] = xs[i + 1] + alpha * (xs[i] - xs[i + 1]);
      }

      // layered hand tremor on top of the smoothed line
      const pts: Pt[] = ys.map((yy, i) => ({
        x:
          xs[i] +
          Math.sin(yy * 0.05 + phase[3]) * 1.3 +
          Math.sin(yy * 0.016 + phase[4]) * 2.6 +
          (rand(yy * 0.5 + 3) - 0.5) * 1.2,
        y: yy,
      }));

      // --- pen pressure → variable width along the stroke ---
      const widths = pts.map((p) => {
        const pressure =
          1 +
          0.62 * Math.sin(p.y * 0.0038 + phase[5]) +
          0.38 * Math.sin(p.y * 0.0011 + phase[0]) +
          0.18 * Math.sin(p.y * 0.021 + phase[1]);
        // taper to a point over the first/last ~300px
        const taper = Math.min(1, p.y / 300, (h - p.y) / 300);
        return clamp(
          4.4 * Math.max(0.08, pressure) * Math.max(0.03, taper) ** 0.7,
          0.8,
          13
        );
      });

      // --- expand centerline into a filled ribbon via point normals ---
      const leftEdge: string[] = [];
      const rightEdge: string[] = [];
      for (let i = 0; i < pts.length; i += 1) {
        const prev = pts[Math.max(0, i - 1)];
        const next = pts[Math.min(pts.length - 1, i + 1)];
        const tx = next.x - prev.x;
        const ty = next.y - prev.y;
        const tl = Math.hypot(tx, ty) || 1;
        const nx = -ty / tl;
        const ny = tx / tl;
        const hw = widths[i] / 2;
        const p = pts[i];
        leftEdge.push(
          `${(p.x + nx * hw).toFixed(1)} ${(p.y + ny * hw).toFixed(1)}`
        );
        rightEdge.push(
          `${(p.x - nx * hw).toFixed(1)} ${(p.y - ny * hw).toFixed(1)}`
        );
      }
      ribbon.setAttribute(
        "d",
        `M${leftEdge.join(" L")} L${rightEdge.reverse().join(" L")} Z`
      );

      // --- faint thin scratch beside the stroke ---
      const ghosted = pts.map((p, idx) => ({
        x:
          p.x +
          4 +
          Math.sin(p.y * 0.02 + 1.1) * 2.6 +
          (rand(idx * 5 + 9) - 0.5) * 0.9,
        y: p.y + 1.2,
      }));
      ghost.setAttribute("d", toPathData(ghosted));

      // --- centerline drives the reveal mask and the nib ---
      maskPath.setAttribute("d", toPathData(pts));
      maskPath.setAttribute("stroke-width", "40");
      maskLength = maskPath.getTotalLength();
      maskPath.style.strokeDasharray = String(maskLength);

      update();
    };

    build();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Rebuild whenever the document grows/shrinks (fonts, images, resize)
    const resizeObserver = new ResizeObserver(() => build());
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="ink-thread" aria-hidden="true">
      <svg ref={svgRef} preserveAspectRatio="none">
        <defs>
          <mask id="ink-thread-reveal" maskUnits="userSpaceOnUse">
            <path
              ref={maskPathRef}
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        </defs>
        <g mask="url(#ink-thread-reveal)">
          <path ref={ghostRef} className="ink-thread__ghost" />
          <path ref={ribbonRef} className="ink-thread__ribbon" />
        </g>
        <circle ref={nibRef} r="4.5" />
      </svg>
    </div>
  );
}
