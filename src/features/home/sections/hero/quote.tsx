import * as motion from 'motion/react-client';
import { type Variants } from 'motion/react';
import { splitWords } from '@/lib/utils';
import { Fragment } from 'react/jsx-runtime';

const parentAnimation: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.45,
      staggerChildren: 0.04,
    },
  },
};

const wordAnimation: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Quote() {
  const { source, lines } = splitWords(
    'Hands-on software engineering with experience in technical leadership roles.',
  );

  return (
    <div className="relative z-1 flex h-[77vh] w-1/4 flex-none flex-col content-center items-center justify-start gap-0 overflow-hidden p-0">
      <motion.p
        variants={parentAnimation}
        initial="hidden"
        animate="show"
        aria-label={source}
        className="text-accent relative h-auto w-full flex-none justify-start font-sans text-2xl font-semibold wrap-break-word whitespace-pre-wrap"
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
      </motion.p>
    </div>
  );
}
