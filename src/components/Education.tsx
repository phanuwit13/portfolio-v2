import { SectionHead } from "./SectionHead";

export function Education() {
  return (
    <section className="section" id="education">
      <SectionHead num="05" title="Education & Awards" />

      <div className="edu">
        <div className="edu__card sketch-box">
          <p className="job__period handwrite">May 2017 — March 2021</p>
          <h3 className="job__title">Bachelor of Computer Engineering</h3>
          <p className="job__company">
            Rajamangala University of Technology Isan
          </p>
          <ul className="job__points">
            <li>
              GPA: 3.7{" "}
              <span className="handwrite edu__honors">
                (Second Class Honors!)
              </span>
            </li>
            <li>
              Specialized in OOP, Machine Learning, Computer Vision, Data
              Structures, and Web Programming.
            </li>
          </ul>
        </div>
        <div className="edu__card sketch-box">
          <p className="job__period handwrite">Award 🏆</p>
          <h3 className="job__title">First Runner-up</h3>
          <p className="job__company">
            Rajamangala Engineering Academic Competition
          </p>
          <ul className="job__points">
            <li>For a project on IoT applications for engineers.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
