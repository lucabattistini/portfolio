import { Section } from '@/components/section';

export function About() {
  return (
    <Section name="About">
      <Section.Reveal className="flex flex-col gap-3">
        <p>
          I am a born and raised Italian software engineer who tries to make the www a better place.
        </p>
        <p>
          Over the years, my focus evolved from crafting interfaces to designing scalable frontend
          architectures and platform foundations. I work where systems start to grow complex — where
          structure, clarity, and long-term thinking matter more than short-term delivery.
        </p>
        <p>
          I care about developer experience, architectural sustainability, and pragmatic AI-assisted
          workflows. My goal is simple: build systems that scale technically and enable teams to
          move faster with confidence.
        </p>
        <p>
          Today, I operate as an independent consultant, partnering with companies across Italian
          and international markets to bring order, evolution, and structure to their frontend
          ecosystems.
        </p>
      </Section.Reveal>
    </Section>
  );
}
