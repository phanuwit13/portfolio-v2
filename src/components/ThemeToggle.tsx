"use client";

/**
 * Paper ↔ chalkboard switch. The current theme lives on
 * <html data-theme> (set before paint by the inline script in layout.tsx);
 * this button just flips it and persists the choice. Which icon shows is
 * decided by CSS from data-theme, so no state/hydration concerns.
 */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — theme just won't persist */
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle chalkboard mode"
    >
      {/* moon (shown on paper → switch to chalkboard) */}
      <svg className="theme-toggle__moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16 3.5 C 10 4.5, 6.5 9, 7.5 14 C 8.5 18.8, 13 21.5, 17.5 20 C 12.5 19, 9.8 15.5, 10 11.5 C 10.2 7.5, 12.5 4.8, 16 3.5" />
      </svg>
      {/* sun (shown on chalkboard → switch back to paper) */}
      <svg className="theme-toggle__sun" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 8.2 C 9.8 8.5, 8.4 10.2, 8.6 12.2 C 8.8 14.2, 10.6 15.7, 12.4 15.4 C 14.4 15.1, 15.6 13.3, 15.4 11.5 C 15.2 9.6, 13.8 8.3, 12 8.2" />
        <path d="M12 2.5 L 12 5 M 12 19 L 12 21.5 M 2.5 12 L 5 12 M 19 12 L 21.5 12 M 5.2 5.2 L 7 7 M 17 17 L 18.8 18.8 M 18.8 5.2 L 17 7 M 7 17 L 5.2 18.8" />
      </svg>
    </button>
  );
}
