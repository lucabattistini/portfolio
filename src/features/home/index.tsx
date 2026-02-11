import { NavAnchor, Navbar } from "@/components/navbar";
import { Particles } from "@/components/particles";
import { About } from "./sections/about";
import { Contacts } from "./sections/contacts";
import { Education } from "./sections/education";
import { Experience } from "./sections/experience";
import { Hero } from "./sections/hero/hero";
import { Hobbies } from "./sections/hobbies";
import { Languages } from "./sections/languages";
import { Skills } from "./sections/skills";
import { Thanks } from "./sections/thanks/thanks";

export function Home() {
  return (
    <main className="relative flex w-full h-min min-h-screen flex-col items-center justify-start content-center gap-0 overflow-visible p-0 bg-background">
      <Navbar />
      <Particles picture="/me.png" />
      <article className="relative w-full max-w-384 pointer-events-none">
        <Hero />
        <div className="py-56 px-16">
          <About />
          <Experience />
          <Skills />
          <Education />
          <Languages />
          <Hobbies />
          <Contacts />
        </div>
        <Thanks />
      </article>
      <NavAnchor />
    </main>
  );
}
