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
    <section className="border-primary/30 relative flex h-min w-[67%] items-start justify-start gap-0 border-t pt-8 pb-30">
      <h2 className="text-primary shrink-0 grow-4 basis-0 font-sans text-4xl font-semibold uppercase">
        {name}
      </h2>
      <div className="text-primary relative flex h-min w-px shrink-0 grow-4 basis-0 flex-col gap-20 p-0 font-sans text-lg font-normal">
        {children}
      </div>
    </section>
  );
}

Section.Reveal = Reveal;
