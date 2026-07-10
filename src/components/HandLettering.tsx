/**
 * Hand-lettered headline that writes itself on page load.
 *
 * Each glyph is a hand-authored single-stroke (monoline) letterform —
 * real pen paths, not font outlines — drawn sequentially with a CSS
 * stroke-dashoffset animation, so the effect runs from first paint with
 * no JavaScript. Slight per-letter y-jitter and rotation keep it human.
 *
 * Glyph grid: y 0 (cap) → 72 (baseline), per-glyph width below.
 */

type Glyph = { w: number; strokes: string[] };

const GLYPHS: Record<string, Glyph> = {
  P: {
    w: 52,
    strokes: [
      "M9 72 C 7 50, 8 26, 9 4",
      "M9 8 C 28 4, 45 8, 46 20 C 47 32, 29 38, 11 36",
    ],
  },
  H: {
    w: 58,
    strokes: [
      "M8 4 C 7 26, 9 50, 8 72",
      "M50 4 C 49 28, 51 50, 50 72",
      "M8 38 C 22 36, 36 39, 50 37",
    ],
  },
  A: {
    w: 56,
    strokes: [
      "M4 72 C 12 48, 20 26, 28 4",
      "M28 4 C 36 27, 44 49, 52 72",
      "M14 49 C 24 47, 34 48, 43 48",
    ],
  },
  N: {
    w: 58,
    strokes: [
      "M8 72 C 8 49, 8 26, 8 4",
      "M8 4 C 22 26, 36 50, 50 72",
      "M50 72 C 50 49, 50 26, 50 4",
    ],
  },
  U: {
    w: 58,
    strokes: [
      "M8 4 C 7 26, 6 44, 10 57 C 15 70, 43 71, 48 57 C 52 44, 51 26, 50 4",
    ],
  },
  W: {
    w: 66,
    strokes: [
      "M4 4 C 9 27, 14 50, 19 71",
      "M19 71 C 24 52, 29 34, 33 18",
      "M33 18 C 38 35, 42 53, 47 71",
      "M47 71 C 52 49, 57 26, 62 4",
    ],
  },
  I: {
    w: 20,
    strokes: ["M10 4 C 9 27, 11 50, 10 72"],
  },
  T: {
    w: 56,
    strokes: [
      "M4 5 C 20 3, 38 6, 52 4",
      "M28 6 C 27 28, 29 51, 28 72",
    ],
  },
  K: {
    w: 54,
    strokes: [
      "M8 4 C 7 27, 9 50, 8 72",
      "M48 4 C 35 17, 21 30, 9 39",
      "M18 33 C 28 45, 38 58, 49 72",
    ],
  },
  R: {
    w: 54,
    strokes: [
      "M8 72 C 7 50, 8 26, 8 4",
      "M8 7 C 27 3, 44 8, 45 19 C 46 31, 28 37, 10 36",
      "M27 37 C 34 48, 41 60, 49 72",
    ],
  },
  O: {
    w: 58,
    strokes: [
      "M28 4 C 9 6, 4 22, 5 38 C 6 58, 14 71, 29 71 C 46 71, 52 56, 52 37 C 52 19, 47 5, 30 4 C 27 4, 25 5, 23 6",
    ],
  },
  G: {
    w: 58,
    strokes: [
      "M49 12 C 43 5, 30 2, 20 7 C 7 13, 4 30, 6 44 C 8 60, 18 71, 32 70 C 44 69, 50 60, 50 47 C 50 45, 50 44, 50 42 C 43 41, 36 42, 30 42",
    ],
  },
};

const LETTER_GAP = 13;
const STROKE_STAGGER = 0.06;

type LetterLineProps = {
  text: string;
  /** seconds before the first stroke of this line starts */
  startDelay: number;
  soft?: boolean;
};

export function LetterLine({ text, startDelay, soft }: LetterLineProps) {
  const letters: React.ReactNode[] = [];
  let x = 0;
  let strokeIndex = 0;

  [...text].forEach((ch, i) => {
    if (ch === " ") {
      x += 26;
      return;
    }
    const glyph = GLYPHS[ch];
    if (!glyph) return;

    // subtle hand jitter: each letter sits and tilts a touch differently
    const dy = Math.sin(i * 5.13) * 1.6;
    const tilt = Math.sin(i * 3.7) * 1.4;

    letters.push(
      <g
        key={`${ch}-${i}`}
        transform={`translate(${x} ${dy.toFixed(1)}) rotate(${tilt.toFixed(1)} ${glyph.w / 2} 38)`}
      >
        {glyph.strokes.map((d, s) => (
          <path
            key={s}
            d={d}
            pathLength={1}
            style={{
              animationDelay: `${(startDelay + strokeIndex++ * STROKE_STAGGER).toFixed(2)}s`,
            }}
          />
        ))}
      </g>
    );
    x += glyph.w + LETTER_GAP;
  });

  const width = x - LETTER_GAP + 6;
  return (
    <svg
      className={`hand-letters${soft ? " hand-letters--soft" : ""}`}
      viewBox={`-3 -6 ${width} 86`}
      aria-hidden="true"
    >
      {letters}
    </svg>
  );
}
