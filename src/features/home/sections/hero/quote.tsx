import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

const parent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
}

const word: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function SplitWords({ text }: { text: string }) {
  const parts = text.split(" ")
  return (
    <>
      {parts.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className="inline-block will-change-transform"
        >
          {w}
          {i < parts.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </>
  )
}

export function Quote() {
  return (
    <div className="z-1 relative flex flex-col flex-none items-center justify-start content-center gap-0 w-1/4 h-[76.5432vh] p-0 overflow-hidden">
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="text-accent font-sans font-semibold relative flex flex-col flex-none justify-start w-full h-auto whitespace-pre-wrap wrap-break-word"
      >
        <p className="text-justify text-2xl font-sans">
          <SplitWords text="Hands-on software engineering with experience in technical leadership roles." />
        </p>
      </motion.div>
    </div>
  )
}