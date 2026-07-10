import { SectionHead } from "./SectionHead";

export function About() {
  return (
    <section className="section" id="about">
      <SectionHead num="01" title="About Me" />

      <div className="about__grid">
        <p className="about__lead">
          A skilled <strong>Senior Front-End Developer</strong> with 5+ years
          of experience building scalable, high-performance web applications.
          Proven track record of leading development teams, architecting
          efficient solutions, and mentoring as a Full-Stack Instructor.
        </p>
        <div className="about__aside">
          <p className="handwrite about__note">
            focused on writing clean, maintainable code — robust frontend
            architecture ✍️
          </p>
          <svg
            className="doodle doodle--loop draw"
            viewBox="0 0 160 80"
            aria-hidden="true"
          >
            <path
              pathLength={1}
              d="M10 60 C 30 20, 60 16, 70 40 C 78 60, 56 70, 48 52 C 40 34, 80 18, 110 30 C 136 40, 146 56, 152 66"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
