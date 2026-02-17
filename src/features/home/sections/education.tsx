import { Section } from '@/components/section';

const educations = [
  {
    slug: 'alma-mater',
    institution: 'Alma Mater Studiorum — University of Bologna',
    period: '2012-2017',
    degree: "Bachelor's Degree in Computer Engineering",
    description:
      'Studied core principles of software engineering, system architecture, and computer science foundations — shaping the structured mindset that continues to guide my approach to scalable systems.',
  },
  {
    slug: 'itis-pascal',
    institution: 'I.T.I.S. “Blaise Pascal”',
    period: '2007-2012',
    degree: 'Diploma in Information Technology',
    description:
      'Early technical formation in programming and system fundamentals, marking the beginning of my path in software engineering.',
  },
];

export function Education() {
  return (
    <Section name="Education">
      {educations.map(({ slug, institution, period, degree, description }) => {
        const summary = `${institution} • ${period}`;
        return (
          <Section.Reveal key={slug} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-primary/70">{summary}</p>
              <h3 className="text-2xl font-bold">{degree}</h3>
            </div>
            <p>{description}</p>
          </Section.Reveal>
        );
      })}
    </Section>
  );
}
