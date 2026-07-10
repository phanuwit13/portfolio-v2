import { SectionHead } from "./SectionHead";

/**
 * Selected work. Most of these live behind a login, so instead of
 * screenshots each card carries a hand-drawn wireframe of the product's
 * signature screen — same pen language as the rest of the site.
 */

/* --- hand-drawn wireframes (draw themselves on scroll via .draw) --- */

function CheckinPlusSketch() {
  return (
    <svg className="sketch-wire draw" viewBox="0 0 280 170" aria-hidden="true">
      {/* frame */}
      <path pathLength={1} d="M10 14 C 80 10, 200 12, 270 14 C 272 60, 270 120, 268 158 C 200 162, 80 160, 12 158 C 10 110, 12 60, 10 14" />
      {/* header divider + calendar grid */}
      <path pathLength={1} d="M12 40 C 90 37, 190 42, 268 40" />
      <path pathLength={1} d="M76 42 C 77 80, 75 120, 76 156" />
      <path pathLength={1} d="M140 42 C 141 82, 139 118, 140 156" />
      <path pathLength={1} d="M204 42 C 205 80, 203 122, 204 156" />
      <path pathLength={1} d="M12 80 C 96 78, 190 82, 268 80" />
      <path pathLength={1} d="M12 118 C 90 116, 200 120, 268 118" />
      {/* booking bars across the room/date grid */}
      <path pathLength={1} className="wire-bold" d="M86 60 C 108 58, 128 60, 148 59" />
      <path pathLength={1} className="wire-bold" d="M150 98 C 176 96, 200 99, 236 97" />
      <path pathLength={1} className="wire-bold" d="M24 136 C 44 134, 58 136, 66 135" />
    </svg>
  );
}

function LotteryPlusSketch() {
  return (
    <svg className="sketch-wire draw" viewBox="0 0 280 170" aria-hidden="true">
      {/* search bar + magnifier */}
      <path pathLength={1} d="M14 18 C 80 15, 160 17, 224 18 C 226 26, 226 34, 224 42 C 160 44, 80 43, 15 42 C 13 34, 13 26, 14 18" />
      <path pathLength={1} d="M248 20 C 256 18, 262 24, 261 31 C 260 38, 252 41, 246 38 C 240 35, 240 24, 248 20 M 258 37 L 268 46" />
      {/* ticket cards with scribbled numbers */}
      <path pathLength={1} d="M16 62 C 42 60, 70 61, 90 62 C 91 76, 91 92, 90 104 C 66 106, 40 105, 17 104 C 15 90, 15 74, 16 62 M 28 82 C 42 79, 62 84, 80 81" />
      <path pathLength={1} d="M104 62 C 130 60, 156 61, 176 62 C 177 76, 177 92, 176 104 C 152 106, 128 105, 105 104 C 103 90, 103 74, 104 62 M 116 82 C 132 79, 150 84, 166 81" />
      <path pathLength={1} d="M190 62 C 216 60, 242 61, 262 62 C 263 76, 263 92, 262 104 C 238 106, 214 105, 191 104 C 189 90, 189 74, 190 62 M 202 82 C 218 79, 236 84, 252 81" />
      <path pathLength={1} d="M16 120 C 42 118, 70 119, 90 120 C 91 134, 91 148, 90 158 C 66 160, 40 159, 17 158 C 15 146, 15 132, 16 120 M 28 139 C 42 136, 62 141, 80 138" />
      <path pathLength={1} d="M104 120 C 130 118, 156 119, 176 120 C 177 134, 177 148, 176 158 C 152 160, 128 159, 105 158 C 103 146, 103 132, 104 120 M 116 139 C 132 136, 150 141, 166 138" />
      <path pathLength={1} className="wire-bold" d="M196 132 C 216 128, 240 134, 258 130" />
    </svg>
  );
}

function InsurePlusSketch() {
  return (
    <svg className="sketch-wire draw" viewBox="0 0 280 170" aria-hidden="true">
      {/* stepper */}
      <path pathLength={1} d="M30 28 C 36 20, 48 22, 50 30 C 51 38, 42 44, 34 40 C 27 36, 26 30, 30 28" />
      <path pathLength={1} d="M54 32 C 80 30, 104 33, 126 31" />
      <path pathLength={1} d="M132 28 C 138 20, 150 22, 152 30 C 153 38, 144 44, 136 40 C 129 36, 128 30, 132 28" />
      <path pathLength={1} d="M156 32 C 182 30, 206 33, 228 31" />
      <path pathLength={1} d="M234 28 C 240 20, 252 22, 254 30 C 255 38, 246 44, 238 40 C 231 36, 230 30, 234 28" />
      {/* form fields */}
      <path pathLength={1} d="M26 66 C 100 63, 190 65, 254 66 C 256 74, 256 82, 254 88 C 180 90, 96 89, 27 88 C 25 80, 25 72, 26 66" />
      <path pathLength={1} d="M26 102 C 100 99, 190 101, 254 102 C 256 110, 256 118, 254 124 C 180 126, 96 125, 27 124 C 25 116, 25 108, 26 102" />
      {/* pay button with ink fill */}
      <path pathLength={1} d="M88 138 C 130 135, 168 137, 194 138 C 196 145, 196 153, 194 159 C 160 161, 122 160, 89 159 C 87 152, 87 144, 88 138" />
      <path pathLength={1} className="wire-bold" d="M98 148 C 124 145, 158 151, 184 147" />
    </svg>
  );
}

function PoppaSketch() {
  return (
    <svg className="sketch-wire draw" viewBox="0 0 280 170" aria-hidden="true">
      {/* axes */}
      <path pathLength={1} d="M22 18 C 20 60, 24 110, 22 150 C 70 152, 130 150, 168 151" />
      {/* chart bars */}
      <path pathLength={1} className="wire-bold" d="M46 148 C 47 130, 45 112, 46 98" />
      <path pathLength={1} className="wire-bold" d="M78 148 C 79 126, 77 96, 78 72" />
      <path pathLength={1} className="wire-bold" d="M110 148 C 111 134, 109 122, 110 112" />
      <path pathLength={1} className="wire-bold" d="M142 148 C 143 118, 141 72, 142 44" />
      {/* attendee list */}
      <path pathLength={1} d="M196 34 C 202 26, 214 28, 216 36 C 217 44, 208 50, 200 46 C 193 42, 192 36, 196 34 M 226 38 C 240 36, 252 39, 262 38" />
      <path pathLength={1} d="M196 72 C 202 64, 214 66, 216 74 C 217 82, 208 88, 200 84 C 193 80, 192 74, 196 72 M 226 76 C 240 74, 252 77, 262 76" />
      <path pathLength={1} d="M196 110 C 202 102, 214 104, 216 112 C 217 120, 208 126, 200 122 C 193 118, 192 112, 196 110 M 226 114 C 240 112, 252 115, 262 114" />
      <path pathLength={1} d="M190 138 C 214 136, 240 138, 264 137 C 265 144, 265 150, 264 156 C 240 158, 214 157, 191 156 C 189 150, 189 142, 190 138" />
    </svg>
  );
}

/* --- project data --- */

type Project = {
  name: string;
  tag: string;
  description: string;
  points: string[];
  tech: string[];
  sketch: React.ReactNode;
};

const PROJECTS: Project[] = [
  {
    name: "CheckinPlus",
    tag: "Hotel PMS + Booking",
    description:
      "Property management and hotel booking platform — room inventory, rate plans, and reservations handled end-to-end.",
    points: [
      "Architected the front-end from scratch with Next.js + TypeScript, structured so the product could grow for years without a rewrite.",
      "Built the booking calendar — a room × date grid rendering hundreds of cells that stays responsive while dragging reservations.",
      "Established shared form patterns (react-hook-form + Zod) reused across reservation, rate, and guest flows.",
    ],
    tech: ["Next.js", "TypeScript", "TanStack Query", "Zod"],
    sketch: <CheckinPlusSketch />,
  },
  {
    name: "Lottery Plus",
    tag: "Online Lottery Marketplace",
    description:
      "High-traffic marketplace for buying lottery tickets online — number search across a huge inventory, cart, and secure checkout.",
    points: [
      "Designed the number-search experience with debounced, cache-aware queries so browsing feels instant even on draw days.",
      "Hardened the checkout flow — optimistic UI with careful rollback so an order never ends in an ambiguous state.",
      "Kept long ticket lists smooth with virtualization and skeleton loading under peak traffic.",
    ],
    tech: ["Next.js", "TypeScript", "TanStack Query"],
    sketch: <LotteryPlusSketch />,
  },
  {
    name: "InsurePlus",
    tag: "Compulsory Motor Insurance",
    description:
      "Self-service flow for buying compulsory motor insurance (พ.ร.บ.) — quote, vehicle details, payment, and policy issuance.",
    points: [
      "Built a resilient multi-step form with schema validation (Zod) — users can drop off mid-flow and resume without losing data.",
      "Integrated insurer APIs with explicit loading, error, and retry states for every external call.",
      "Simplified vehicle-detail input so non-technical buyers complete the flow without support.",
    ],
    tech: ["React", "TypeScript", "Zod"],
    sketch: <InsurePlusSketch />,
  },
  {
    name: "POPPA",
    tag: "Event Social — Back Office",
    description:
      "Event-based social media app; I built the organizer back office — event setup, ticket types, attendee management, and analytics.",
    points: [
      "Designed role-based dashboards and data grids that handle bulk attendee operations safely.",
      "Extracted reusable table, filter, and bulk-action primitives shared across every management screen.",
      "Shipped check-in and sales analytics views organizers rely on during live events.",
    ],
    tech: ["React", "TypeScript", "TanStack Query"],
    sketch: <PoppaSketch />,
  },
];

export function Projects() {
  return (
    <section className="section" id="projects">
      <SectionHead num="02" title="Selected Projects" />
      <p className="handwrite projects__note">
        most of these live behind a login — so here are pen sketches instead
        of screenshots ✏️
      </p>

      <div className="projects">
        {PROJECTS.map((project) => (
          <article key={project.name} className="project sketch-box">
            <div className="project__sketch">{project.sketch}</div>
            <p className="project__tag handwrite">{project.tag}</p>
            <h3 className="project__title">{project.name}</h3>
            <p className="project__desc">{project.description}</p>
            <ul className="job__points">
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <ul className="tags project__tech" role="list">
              {project.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
