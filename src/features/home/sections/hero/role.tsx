import * as motion from 'motion/react-client';
import { type Variants } from 'motion/react';
import { splitWords } from '@/lib/utils';
import { Fragment } from 'react/jsx-runtime';

const animation: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Role() {
  const { source, lines } = splitWords('Senior Software Engineer, based in Cesenatico, Italy');

  return (
    <motion.p
      variants={animation}
      initial="hidden"
      animate="show"
      aria-label={source}
      className="text-primary relative z-1 h-auto w-full flex-none font-sans text-xl font-semibold wrap-break-word whitespace-pre-wrap"
    >
      {lines.map((line, index) => (
        <Fragment key={line.key}>
          {line.tokens.map((word) => (
            <motion.span className="inline-block" key={word.key} aria-hidden>
              {word.value}
            </motion.span>
          ))}

          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </motion.p>
  );
}
