import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const SECTION_LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

type NavProps = {
  /** Page the nav sits on. Omit on the home page. */
  current?: "slides";
};

export function Nav({ current }: NavProps) {
  const onHome = current === undefined;

  return (
    <header className="nav" id="top">
      {onHome ? (
        <a className="nav__logo" href="#top" aria-label="Back to top">
          PK<span className="nav__dot">.</span>
        </a>
      ) : (
        <Link className="nav__logo" href="/" aria-label="Home">
          PK<span className="nav__dot">.</span>
        </Link>
      )}
      <div className="nav__right">
        <nav className="nav__menu" aria-label="Main navigation">
          <ul className="nav__links">
            {SECTION_LINKS.map((item) => (
              <li key={item.id}>
                {onHome ? (
                  <a href={`#${item.id}`}>{item.label}</a>
                ) : (
                  <Link href={`/#${item.id}`}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <Link
            className="nav__page-link"
            href="/slides"
            aria-current={current === "slides" ? "page" : undefined}
          >
            Slides
          </Link>
        </nav>
        <ThemeToggle />
      </div>
      {/* pen-stroke page progress, driven by SketchEffects */}
      <svg
        className="nav__progress"
        viewBox="0 0 1000 10"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          pathLength={1}
          d="M0 5 C 120 2, 250 8, 400 5 C 550 2, 700 8, 850 5 C 920 3.5, 970 6, 1000 5"
        />
      </svg>
    </header>
  );
}
