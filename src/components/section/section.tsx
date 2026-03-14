import { ReactNode } from 'react';
import * as motion from 'motion/react-client';
import { type Variants } from 'motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
};

const animation: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Reveal({ children, className }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={animation}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type SectionProps = {
  name: string;
  children: ReactNode;
};

export function Section({ name, children }: SectionProps) {
  return (
    <section className="border-primary/30 relative flex flex-col items-start gap-8 border-t pt-8 pb-30 md:grid md:w-[67%] md:grid-cols-[1fr_2fr] md:gap-20">
      <h2 className="text-primary shrink-0 grow-4 basis-0 font-sans text-4xl font-semibold uppercase">
        {name}
      </h2>
      <div className="text-primary relative flex shrink-0 grow-4 basis-0 flex-col gap-20 p-0 font-sans text-lg leading-6.5 font-normal">
        {children}
      </div>
    </section>
  );
}

Section.Reveal = Reveal;
