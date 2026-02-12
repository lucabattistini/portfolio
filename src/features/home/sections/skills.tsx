import { Section } from '@/components/section';

const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'GraphQL',
  'PostgreSQL',
  'MongoDB',
  'Git',
  'CI/CD',
  'AWS',
  'System Design',
  'AI',
  'Technical Writing',
  'Code Reviews',
  'Performance Optimization',
  'Product Thinking',
  'Testing',
  'Debugging',
  'Remote Collaboration',
];

export function Skills() {
  return (
    <Section name="03. Skills">
      <ul className="relative flex shrink-0 grow basis-0 flex-wrap content-center items-center justify-start gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="border-primary relative flex w-min items-center gap-2.5 overflow-hidden rounded-lg border border-b-2 px-3 pt-1 pb-1.25 leading-5 whitespace-nowrap"
          >
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  );
}
