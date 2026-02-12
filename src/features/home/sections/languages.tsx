import { Section } from '@/components/section';

const languages = [
  {
    language: 'English',
    proficiency: 'Highly Proficient',
  },
  {
    language: 'Italian',
    proficiency: 'Native',
  },
];

export function Languages() {
  return (
    <Section name="05. Languages">
      <ul className="relative grid shrink-0 grow basis-0 auto-rows-fr grid-cols-[repeat(auto-fill,minmax(180px,1fr))] justify-center gap-6">
        {languages.map(({ language, proficiency }) => (
          <li
            key={language}
            className="border-primary relative flex w-min flex-col items-center gap-2.5 overflow-hidden rounded-lg border border-b-2 px-3 pt-1 pb-1.25 leading-5 whitespace-nowrap"
          >
            <h3>{language}</h3>
            <p className="text-secondary text-sm">{proficiency}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
