import { Section } from "@/components/section";

const languages = [
  {
    language: "English",
    proficiency: "Highly Proficient",
  },
  {
    language: "Italian",
    proficiency: "Native",
  },
];

export function Languages() {
  return (
    <Section name="05. Languages">
      <ul
        className="relative grid grow shrink-0 basis-0 justify-center gap-6 grid-cols-[repeat(auto-fill,minmax(180px,1fr))] auto-rows-fr"
      >
        {languages.map(({ language, proficiency }) => (
          <li
            key={language}
            className="relative flex flex-col items-center gap-2.5 w-min px-3 pt-1 pb-1.25 overflow-hidden rounded-lg border border-b-2 border-primary whitespace-nowrap leading-5"
          >
            <h3>{language}</h3>
            <p className="text-sm text-secondary">{proficiency}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
