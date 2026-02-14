import { Section } from '@/components/section';

const languages = [
  {
    language: 'English',
    proficiency: 'Highly proficient',
  },
  {
    language: 'Italian',
    proficiency: 'Native speaker',
  },
];

export function Languages() {
  return (
    <Section name="05. Languages">
      <Section.Reveal>
        <ul className="relative grid shrink-0 grow basis-0 auto-rows-fr grid-cols-[repeat(auto-fill,minmax(180px,1fr))] justify-center gap-6">
          {languages.map(({ language, proficiency }) => (
            <li
              key={language}
              className="border-primary relative flex flex-col items-start gap-6 rounded-xl border border-b-2 px-5 pt-3 pb-3.25 leading-5 whitespace-nowrap"
            >
              <h3 className="text-primary text-xl font-semibold">{language}</h3>
              <p className="text-primary/70 text-base font-normal">{proficiency}</p>
            </li>
          ))}
        </ul>
      </Section.Reveal>
    </Section>
  );
}
