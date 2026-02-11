import * as motion from "motion/react-client";
import { type Variants } from "motion";
import { splitWords } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

const parentAnimation: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 2,
      staggerChildren: 0.04,
    },
  },
}

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
}

export function Seniority() {
  const { source, lines } = splitWords(
    `2016→${new Date().getFullYear()}\n10 yrs exp.`,
  );

  return (
    <motion.h2
      variants={parentAnimation}
      initial="hidden"
      animate="show"
      aria-label={source}
      className="relative z-1 justify-end w-full h-auto whitespace-pre-wrap wrap-break-word leading-[0.9]"
    >
      {lines.map((line, index) => (
        <Fragment key={line.key}>
            {line.tokens.map((word) => (
              <motion.span
                className="font-sans font-bold text-4xl text-accent inline-block"
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
