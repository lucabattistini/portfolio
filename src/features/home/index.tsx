'use client';

import { NavAnchor, Navbar, useNavbarSelector } from '@/components/navbar';
import { Particles } from '@/components/particles';
import { About } from './sections/about';
import { Contacts } from './sections/contacts';
import { Education } from './sections/education';
import { Experience } from './sections/experience';
import { Hero } from './sections/hero/hero';
import { Hobbies } from './sections/hobbies';
import { Languages } from './sections/languages';
import { Skills } from './sections/skills';
import { Footer } from './sections/footer/footer';
import { useMobileDetect } from '@/lib/hooks';
import { motion } from 'motion/react';

export function Home() {
  const isMobile = useMobileDetect();
  const { isMenuOpen } = useNavbarSelector((snapshot) => snapshot.context);

  return (
    <main className="bg-background relative flex min-h-screen w-full flex-col content-center items-center justify-start gap-0 overflow-visible p-0">
      <Navbar />

      <Particles picture="/me.png" isBlurred={isMenuOpen} />
      <motion.article
        animate={{ filter: isMenuOpen ? 'blur(16px)' : 'blur(0px)' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="pointer-events-none relative w-full md:max-w-384"
      >
        <Hero />
        <div className="px-8 py-28 md:px-16 md:py-56">
          <About />
          <Experience />
          <Skills />
          <Education />
          <Languages />
          <Hobbies />
          <Contacts />
        </div>
        <Footer />
      </motion.article>
      {!isMobile && <NavAnchor />}
    </main>
  );
}
