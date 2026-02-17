import { Section } from '@/components/section';

const experiences = [
  {
    slug: 'freelance',
    location: 'Hybrid',
    period: 'Jan 2026 - Present',
    role: 'Independent Senior Software Engineer',
    description:
      'I partner with companies that need to bring structure to complex frontend ecosystems. I design scalable architectures, evolve platform foundations, and improve developer experience across teams — balancing technical robustness with organizational clarity.',
  },
  {
    slug: 'technogym-lead',
    location: 'Cesena, Italy',
    company: 'Technogym',
    period: 'Jul 2025 - Dec 2025',
    role: 'Lead Software Engineer',
    description:
      'Led the evolution of the Mywellness Enterprise platform, shaping an enterprise API layer and embeddable integrations to expose the Technogym ecosystem to third-party partners. Focused on platform robustness, integrator experience, and long-term architectural sustainability.',
  },
  {
    slug: 'technogym-senior',
    location: 'Cesena, Italy',
    company: 'Technogym',
    period: 'Jul 2024 - Jul 2025',
    role: 'Senior Software Engineer',
    description:
      'Within the Developer Experience team, I contributed to company-wide enablement initiatives, standardizing workflows and evolving shared tooling. I promoted scalable architectural patterns and strengthened internal platform foundations across teams.',
  },
  {
    slug: 'technogym',
    location: 'Cesena, Italy',
    company: 'Technogym',
    period: 'Jun 2022 - Jul 2024',
    role: 'React Software Engineer',
    description:
      'As a senior frontend engineer within the Mywellness CRM team, I contributed to business-critical automation and analytics modules while strengthening the shared frontend foundation used across applications.',
  },
  {
    slug: 'giglio',
    location: 'Remote',
    company: 'Giglio Group',
    period: 'Nov 2021 - Jun 2022',
    role: 'Senior Frontend Engineer',
    description:
      'Defined frontend architectural direction for ecommerce solutions, designing a reusable microfrontend foundation and coordinating external consultants across institutional and marketing platforms.',
  },
  {
    slug: 'brg',
    location: 'Cesenatico, Italy',
    company: 'BRG - Company for digital innovation',
    period: 'Sep 2017 - Nov 2021',
    role: 'Frontend Engineer',
    description:
      'Built and evolved internal SaaS products and authored a design system powering hospitality and luxury fashion platforms, contributing to architectural transitions toward service-oriented systems.',
  },
  {
    slug: 'avarice',
    location: 'Remote',
    company: 'Avarice',
    period: 'Dec 2016 - Feb 2017',
    role: 'Junior Frontend Developer',
    description:
      'Contributed to the migration of a healthcare platform toward a more structured MVC architecture, gaining early exposure to system evolution and UI standardization within a small, autonomous team.',
  },
];

export function Experience() {
  return (
    <Section name="Experience">
      {experiences.map(({ slug, company, location, period, role, description }) => {
        const summary = company
          ? `${company} • ${location} • ${period}`
          : `${location} • ${period}`;

        return (
          <Section.Reveal key={slug} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-primary/70">{summary}</p>
              <h3 className="text-2xl font-bold">{role}</h3>
            </div>
            <p>{description}</p>
          </Section.Reveal>
        );
      })}
    </Section>
  );
}
