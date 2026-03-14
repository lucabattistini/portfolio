import * as motion from 'motion/react-client';
import { type Variants } from 'motion';
import { splitWords } from '@/lib/utils';
import { Fragment } from 'react/jsx-runtime';

const parentAnimation: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.9,
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

const START_YEAR = 2016;
const END_YEAR = new Date().getFullYear();

export function Seniority() {
  const seniority =
    (END_YEAR - START_YEAR) % 10 === 0 ? `${END_YEAR - START_YEAR} yrs exp.` : '10+ yrs exp.';
  const { source, lines } = splitWords(`${START_YEAR}→${END_YEAR}\n${seniority}`);

  return (
    <motion.h2
      variants={parentAnimation}
      initial="hidden"
      animate="show"
      aria-label={source}
      className="relative z-1 h-auto w-full justify-end leading-[0.9] wrap-break-word whitespace-pre-wrap"
    >
      {lines.map((line, index) => (
        <Fragment key={line.key}>
          {line.tokens.map((word) => (
            <motion.span
              className="text-accent inline-block font-sans text-4xl font-bold"
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
