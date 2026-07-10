import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav() {
  return (
    <header className="nav" id="top">
      <a className="nav__logo" href="#top" aria-label="Back to top">
        PK<span className="nav__dot">.</span>
      </a>
      <div className="nav__right">
        <nav aria-label="Main navigation">
          <ul className="nav__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
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
