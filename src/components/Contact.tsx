export function Contact() {
  return (
    <section className="contact" id="contact">
      <p className="handwrite contact__note">
        Got a project in mind?
        <svg
          className="doodle doodle--contact-arrow draw"
          viewBox="0 0 140 80"
          aria-hidden="true"
        >
          <path pathLength={1} d="M10 10 C 50 20, 90 40, 116 62" />
          <path pathLength={1} d="M114 44 L 118 64 L 96 62" />
        </svg>
      </p>
      <h2 className="contact__title">
        LET&apos;S BUILD
        <br />
        SOMETHING <span className="contact__title-accent">GREAT</span>
      </h2>
      <a className="contact__cta" href="mailto:big.phanuwit@gmail.com">
        <span>big.phanuwit@gmail.com</span>
        <svg
          className="doodle doodle--cta-circle draw"
          viewBox="0 0 560 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            pathLength={1}
            d="M280 8 C 100 4, 16 24, 18 46 C 20 72, 150 86, 300 82 C 460 78, 546 60, 542 38 C 538 16, 400 4, 220 10"
          />
        </svg>
      </a>
      <ul className="contact__links" role="list">
        <li>
          <a
            href="https://linkedin.com/in/phanuwit13"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a href="tel:+66842683954">084-268-3954</a>
        </li>
        <li>
          <a href="mailto:big.phanuwit@gmail.com">Email</a>
        </li>
        <li>
          <a
            href="/phanuwit-kittirong-resume.pdf"
            download="Phanuwit Kittirong.pdf"
          >
            Resume (PDF)
          </a>
        </li>
      </ul>
      <footer className="footer">
        <p>© 2026 Phanuwit Kittirong — Sketched with ✒️ &amp; code.</p>
      </footer>
    </section>
  );
}
