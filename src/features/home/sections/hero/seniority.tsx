import * as motion from "motion/react-client";
import { type Variants } from "motion";

const parent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22, 
      delayChildren: 0.05,
    },
  },
};

const line: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.085, 
    },
  },
};

const word: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  show: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Word({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block overflow-hidden align-baseline ${className}`}
    >
      <motion.span
        variants={word}
        className="font-sans font-bold text-4xl text-accent"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Seniority() {
  return (
    <motion.div
      variants={parent}
      initial="hidden"
      animate="show"
      className={`relative z-1 flex flex-col flex-none justify-end w-full h-auto whitespace-pre-wrap wrap-break-word`}
    >
      <h2 className="leading-[0.9]">
        <motion.div variants={line} className="leading-[0.9]">
          <Word>2016→{new Date().getFullYear()}</Word>
        </motion.div>

        <motion.div variants={line} className="leading-[0.9] mt-1">
          {["10", "yrs", "exp."].map((word, index) => (
            <Word
              key={`${word}-${index}`}
              className={index < ["10", "yrs", "exp."].length - 1 ? "mr-2" : ""}
            >
              {word}
            </Word>
          ))}
        </motion.div>
      </h2>
    </motion.div>
  );
}
