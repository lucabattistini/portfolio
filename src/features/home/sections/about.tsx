import { Section } from '@/components/section';

export function About() {
  return (
    <Section name="About">
      <Section.Reveal className="flex flex-col gap-3">
        <p>
          I am a born and raised Italian software engineer who tries to make the www a better place.
        </p>
        <p>
          Over time, I moved from crafting interfaces to designing the systems behind them —
          focusing on scalable frontend architectures and the platform foundations that support
          them. I am most engaged where complexity emerges and structure, clarity, and long-term
          thinking become essential.
        </p>
        <p>
          I care about developer experience, architectural sustainability, and pragmatic AI-assisted
          workflows. My goal is simple: build systems that scale technically and enable teams to
          move faster with confidence.
        </p>
        <p>
          Today, I work independently, partnering with companies across Italian and international
          markets to help evolve complex systems — starting from the frontend and shaping the
          platforms that sustain them over time.
        </p>
      </Section.Reveal>
    </Section>
  );
}
