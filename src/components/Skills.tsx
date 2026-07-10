import { SectionHead } from "./SectionHead";

type SkillGroup = {
  name: string;
  tags: string[];
  wide?: boolean;
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Frontend",
    tags: [
      "React.js",
      "Next.js",
      "Vue.js",
      "Nuxt.js",
      "Svelte",
      "Angular",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
    ],
  },
  {
    name: "State & Data Fetching",
    tags: [
      "Zustand",
      "Redux Toolkit",
      "TanStack Router",
      "TanStack Query",
      "TanStack Form",
    ],
  },
  {
    name: "Backend & APIs",
    tags: ["Node.js", "Nest.js", "Express.js", "ElysiaJS", "Go (Golang)"],
  },
  {
    name: "Database & ORM",
    tags: ["PostgreSQL", "MySQL", "Prisma", "Drizzle"],
  },
  {
    name: "Architecture & Tools",
    tags: ["Hexagonal Architecture", "Docker", "Git", "Zod", "Jest"],
    wide: true,
  },
];

export function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHead num="03" title="Technical Skills" />

      <div className="skills">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.name}
            className={`skill-group sketch-box${group.wide ? " skill-group--wide" : ""}`}
          >
            <h3 className="skill-group__name">{group.name}</h3>
            <ul className="tags" role="list">
              {group.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
