import * as motion from 'motion/react-client';
import { type Variants } from 'motion';
import { splitWords } from '@/lib/utils';
import { Fragment } from 'react/jsx-runtime';

const parentAnimation: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.04,
    },
  },
};

const wordAnimation: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Payoff() {
  const { source, lines } = splitWords("Let's make the\nwww a better\nplace, together");

  return (
    <motion.h2
      variants={parentAnimation}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={source}
      className="text-accent w-[50%] self-end font-sans text-4xl leading-[0.9] font-bold tracking-wide wrap-break-word whitespace-pre-wrap"
    >
      {lines.map((line, index) => (
        <Fragment key={line.key}>
          {line.tokens.map((word) => (
            <motion.span
              className="inline-block"
              key={word.key}
              aria-hidden
              variants={wordAnimation}
            >
              {word.value}
            </motion.span>
          ))}

          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </motion.h2>
  );
}
