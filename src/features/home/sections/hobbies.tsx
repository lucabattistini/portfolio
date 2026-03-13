import { Section } from '@/components/section';
import Link from 'next/link';

export function Hobbies() {
  return (
    <Section name="Hobbies">
      <Section.Reveal>
        <p>
          Beyond software engineering, I blast my bass and scream my lungs out as part of my band
          <Link
            className="hover:text-accent pointer-events-auto mx-1 transition"
            href="https://linktr.ee/wearenoye"
            target="_blank"
            rel="noopener noreferrer"
          >
            NOYÉ
          </Link>
          , where I&apos;m actively involved in music production and live performance. When I&apos;m
          not coding or playing, I train consistently across strength and endurance disciplines,
          from armwrestling and streetlifting to calisthenics and running.
        </p>
      </Section.Reveal>
    </Section>
  );
}
