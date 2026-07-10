import { LetterLine } from "./HandLettering";

const HIGHLIGHT_STROKES: Record<string, string> = {
  "React.js": "M4 8 C 40 4, 80 11, 118 7 C 150 4, 178 9, 196 6",
  TypeScript: "M3 7 C 50 11, 96 4, 140 9 C 165 11, 186 6, 197 8",
  "Next.js": "M5 9 C 36 5, 74 10, 110 6 C 145 3, 176 10, 195 7",
};

function InkUnderline({ word }: { word: keyof typeof HIGHLIGHT_STROKES }) {
  return (
    <span className="ink-underline">
      {word}
      <svg
        className="doodle draw"
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path pathLength={1} d={HIGHLIGHT_STROKES[word]} />
      </svg>
    </span>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <p className="hero__hello handwrite" data-parallax="-0.1">
        Hello, I&apos;m
        <svg
          className="doodle doodle--hello-arrow draw"
          viewBox="0 0 120 60"
          aria-hidden="true"
        >
          <path pathLength={1} d="M8 8 C 30 40, 70 48, 104 34" />
          <path pathLength={1} d="M92 28 L 106 34 L 96 46" />
        </svg>
      </p>

      <h1 className="hero__name">
        <span className="sr-only">Phanuwit Kittirong</span>
        <span className="hero__line" data-parallax="0.08" aria-hidden="true">
          <LetterLine text="PHANUWIT" startDelay={0.35} />
        </span>
        <span className="hero__line" data-parallax="0.16" aria-hidden="true">
          <LetterLine text="KITTIRONG" startDelay={0.35} soft />
        </span>
      </h1>

      <div className="hero__role">
        <span className="hero__role-text">Senior Front-End Developer</span>
        <svg
          className="doodle doodle--circle draw"
          viewBox="0 0 460 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            pathLength={1}
            d="M230 10 C 90 4, 14 22, 16 46 C 18 72, 120 84, 244 80 C 372 76, 448 62, 444 40 C 440 18, 330 6, 180 12"
          />
        </svg>
      </div>

      <p className="hero__tagline">
        Crafting scalable, high-performance web experiences with{" "}
        <InkUnderline word="React.js" />, <InkUnderline word="TypeScript" /> &{" "}
        <InkUnderline word="Next.js" /> — for 5+ years and counting.
      </p>

      <div className="hero__meta">
        <a href="mailto:big.phanuwit@gmail.com">big.phanuwit@gmail.com</a>
        <span className="hero__meta-sep" aria-hidden="true">
          ✦
        </span>
        <a
          href="https://linkedin.com/in/phanuwit13"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin.com/in/phanuwit13
        </a>
        <span className="hero__meta-sep" aria-hidden="true">
          ✦
        </span>
        <a href="tel:+66842683954">084-268-3954</a>
      </div>

      <div className="hero__actions">
        <a
          className="btn-sketch"
          href="/phanuwit-kittirong-resume.pdf"
          download="Phanuwit Kittirong.pdf"
        >
          Download Resume
          <svg
            className="btn-sketch__arrow"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 3 C 11 8, 13 12, 12 17 M 6 12 L 12 19 L 18 12" />
          </svg>
        </a>
      </div>

      <svg
        className="doodle doodle--scroll draw"
        viewBox="0 0 60 120"
        aria-hidden="true"
      >
        <path
          pathLength={1}
          d="M30 8 C 22 30, 40 44, 30 66 C 22 84, 34 94, 30 104"
        />
        <path pathLength={1} d="M18 92 L 30 108 L 42 92" />
      </svg>

      <svg
        className="doodle doodle--star doodle--star-1 draw"
        viewBox="0 0 60 60"
        aria-hidden="true"
        data-parallax="-0.22"
      >
        <path
          pathLength={1}
          d="M30 4 L 30 56 M 4 30 L 56 30 M 12 12 L 48 48 M 48 12 L 12 48"
        />
      </svg>
      <svg
        className="doodle doodle--star doodle--star-2 draw"
        viewBox="0 0 60 60"
        aria-hidden="true"
        data-parallax="-0.35"
      >
        <path pathLength={1} d="M30 6 L 30 54 M 8 30 L 52 30" />
      </svg>
    </section>
  );
}
