import { Section } from '@/components/section';

const skills = [
  'TypeScript',
  'JavaScript',
  'React',
  'Next.js',
  'React Native',
  'Frontend Architecture',
  'Design Systems',
  'Microfrontends',
  'API Design',
  'System Design',
  'CI/CD',
  'Node.js',
  'Fastify',
  'PostgreSQL',
  'AWS',
  'Infrastructure as Code',
  'TDD',
  'DevEx',
  'AI Engineering',
];

export function Skills() {
  return (
    <Section name="Skills">
      <Section.Reveal>
        <ul className="relative flex shrink-0 grow basis-0 flex-wrap content-center items-center justify-start gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="border-primary relative flex items-center gap-2.5 rounded-lg border border-b-2 px-3 pt-1 pb-1.25 text-base leading-5 font-normal whitespace-nowrap"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Section.Reveal>
    </Section>
  );
}
