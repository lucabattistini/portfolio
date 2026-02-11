import { Section } from "@/components/section";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "GraphQL",
  "PostgreSQL",
  "MongoDB",
  "Git",
  "CI/CD",
  "AWS",
  "System Design",
  "AI",
  "Technical Writing",
  "Code Reviews",
  "Performance Optimization",
  "Product Thinking",
  "Testing",
  "Debugging",
  "Remote Collaboration",
];

export function Skills() {
  return (
    <Section name="03. Skills">
      <ul className="relative flex flex-wrap grow shrink-0 basis-0 items-center justify-start content-center gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="relative flex items-center gap-2.5 w-min px-3 pt-1 pb-1.25 overflow-hidden rounded-lg border border-b-2 border-primary whitespace-nowrap leading-5"
          >
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  );
}
