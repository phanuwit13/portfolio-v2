type SectionHeadProps = {
  num: string;
  title: string;
};

export function SectionHead({ num, title }: SectionHeadProps) {
  return (
    <div className="section__head">
      <span className="section__num handwrite">{num}</span>
      <h2 className="section__title">
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
      </h2>
    </div>
  );
}
