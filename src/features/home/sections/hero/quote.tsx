import * as motion from "motion/react-client";
import type { Variants } from "motion/react";
import { splitWords } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

const parentAnimation: Variants = {
  hidden: {},
  show: {
    transition: {
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

export function Quote() {
  const { source, lines } = splitWords(
    "Hands-on software engineering with experience in technical leadership roles.",
  );

  return (
    <div className="z-1 relative flex flex-col flex-none items-center justify-start content-center gap-0 w-1/4 h-[76.5432vh] p-0 overflow-hidden">
      <motion.p
        variants={parentAnimation}
        initial="hidden"
        animate="show"
        aria-label={source}
        className="text-accent text-2xl font-sans font-semibold relative flex-none justify-start w-full h-auto whitespace-pre-wrap wrap-break-word"
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
