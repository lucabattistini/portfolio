import { NavAnchor, Navbar } from '@/components/navbar';
import { Particles } from '@/components/particles';
import { About } from './sections/about';
import { Contacts } from './sections/contacts';
import { Education } from './sections/education';
import { Experience } from './sections/experience';
import { Hero } from './sections/hero/hero';
import { Hobbies } from './sections/hobbies';
import { Languages } from './sections/languages';
import { Skills } from './sections/skills';
import { Thanks } from './sections/thanks/thanks';

export function Home() {
  return (
    <main className="bg-background relative flex h-min min-h-screen w-full flex-col content-center items-center justify-start gap-0 overflow-visible p-0">
      <Navbar />
      <Particles picture="/me.png" />
      <article className="pointer-events-none relative w-full max-w-384">
        <Hero />
        <div className="px-16 py-56">
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
