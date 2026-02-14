import * as motion from 'motion/react-client';
import { type Variants } from 'motion';
import { splitWords } from '@/lib/utils';
import { Fragment } from 'react/jsx-runtime';

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

export function Thanks() {
  const { source, lines } = splitWords("Be part of\nwhat's\nnext");

  return (
    <motion.h1
      variants={animation}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={source}
      className="font-display text-primary self-start text-[clamp(3rem,14vw,12.5rem)] leading-[0.9] font-bold wrap-break-word whitespace-pre-wrap uppercase"
    >
      {lines.map((line, index) => (
        <Fragment key={line.key}>
          {line.tokens.map((word) => (
            <span className="inline-block" key={word.key} aria-hidden>
              {word.value}
            </span>
          ))}

          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </motion.h1>
  );
}
