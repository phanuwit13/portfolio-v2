import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { InkThread } from "@/components/InkThread";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { SketchEffects } from "@/components/SketchEffects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <InkThread />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
      </main>
      <SketchEffects />
    </>
  );
}
