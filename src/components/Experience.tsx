import { SectionHead } from "./SectionHead";

type Job = {
  period: string;
  title: string;
  company: string;
  context?: string;
  points: string[];
};

const JOBS: Job[] = [
  {
    period: "July 2024 — Present",
    title: "Senior Front-End Web Developer",
    company: "7solutions Company Limited",
    context:
      "E-commerce platforms (ticketing & insurance), Property Management Systems, and back-office systems for dating and event apps.",
    points: [
      "Led the development of scalable front-end architecture from scratch utilizing React, TypeScript, and Next.js, ensuring highly maintainable long-term solutions.",
      "Implemented comprehensive unit testing with Jest, establishing high code reliability and minimizing post-launch defects.",
      "Collaborated directly with cross-functional teams to design and implement features, ensuring seamless UX and on-time delivery of core product modules.",
    ],
  },
  {
    period: "May 2022 — Present",
    title: "Full-Stack Development Instructor",
    company: "WeStride (Thailand)",
    points: [
      "Provide expert guidance and mentorship to students in front-end development, focusing on HTML, CSS, JavaScript, and React.js.",
      "Deliver high-quality content and support, ensuring students successfully build functional portfolios and deeply understand web development best practices.",
    ],
  },
  {
    period: "August 2023 — July 2024",
    title: "Senior Software Engineer",
    company: "Big C Supercenter Public Company Limited",
    context:
      "Enterprise platforms including a B2B medical representative CRM, a branch campaign manager, and a retail planogram compliance system.",
    points: [
      "Architected scalable web applications using Next.js, React.js, TypeScript, and Spring Boot.",
      "Led code reviews to enforce coding standards, effectively managing and reducing technical debt.",
      "Mentored junior developers to accelerate their onboarding and strengthen overall team capabilities.",
    ],
  },
  {
    period: "October 2022 — August 2023",
    title: "Front-End Developer",
    company: "HarmonyX Solution Co., Ltd.",
    context:
      "Custom enterprise e-commerce platforms and CMS solutions for prominent brands like IT City and Jim Thompson.",
    points: [
      "Developed responsive, high-performance components tailored for complex data rendering.",
      "Collaborated with design and back-end teams to ensure seamless API integration and stable performance.",
      "Delivered core functionalities that directly enhanced user experience and customer engagement.",
    ],
  },
  {
    period: "April 2021 — October 2022",
    title: "Front-End Developer",
    company: "Chomchobgroup Co., Ltd.",
    context:
      "Web shopping platforms, NFT ticket sales, crypto exchange platforms, and redeem point systems.",
    points: [
      "Developed interactive, user-friendly interfaces with React.js end-to-end, contributing to highly active user platforms and smooth, secure transaction flows.",
    ],
  },
];

export function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHead num="04" title="Work Experience" />

      <div className="timeline">
        {/* spine draws in sync with scroll (SketchEffects), not one-shot */}
        <svg
          className="timeline__spine"
          viewBox="0 0 20 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            pathLength={1}
            d="M10 0 C 4 100, 16 200, 8 300 C 2 400, 18 500, 10 600 C 4 700, 16 800, 8 900 C 6 950, 12 980, 10 1000"
          />
        </svg>

        {JOBS.map((job) => (
          <article key={`${job.company}-${job.period}`} className="job">
            <div className="job__marker" aria-hidden="true" />
            <p className="job__period handwrite">{job.period}</p>
            <h3 className="job__title">{job.title}</h3>
            <p className="job__company">{job.company}</p>
            {job.context && <p className="job__context">{job.context}</p>}
            <ul className="job__points">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
