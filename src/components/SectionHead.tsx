type SectionHeadProps = {
  /** Handwritten marker before the title, e.g. "02". */
  num?: string;
  title: string;
  /** Use "h1" when the head is the page title rather than a section. */
  as?: "h1" | "h2";
};

export function SectionHead({ num, title, as: Heading = "h2" }: SectionHeadProps) {
  return (
    <div className="section__head">
      {num && <span className="section__num handwrite">{num}</span>}
      <Heading className="section__title">
        {title}
        <svg
          className="doodle doodle--title-underline draw"
          viewBox="0 0 300 18"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            pathLength={1}
            d="M4 10 C 60 4, 130 14, 200 8 C 250 4, 285 11, 296 8"
          />
          <path pathLength={1} d="M20 14 C 90 10, 180 16, 280 11" />
        </svg>
      </Heading>
    </div>
  );
}
