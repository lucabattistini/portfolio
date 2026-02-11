import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

const charParent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
}

const charItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function SplitChars({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          variants={charItem}
          className="inline-block will-change-transform"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </>
  )
}

export function Role() {
  return (
    <motion.div
      variants={charParent}
      initial="hidden"
      animate="show"
      className="text-primary font-sans font-semibold text-lg relative z-1 flex flex-col flex-none w-full h-auto whitespace-pre-wrap wrap-break-word"
    >
      <p className="">
        <span className="whitespace-nowrap">
          <SplitChars text="Senior" />
        </span>{" "}
        <span className="whitespace-nowrap">
          <SplitChars text="Software" />
        </span>{" "}
        <span className="whitespace-nowrap">
          <SplitChars text="Engineer," />
        </span>{" "}
        <span className="whitespace-nowrap">
          <SplitChars text="based" />
        </span>{" "}
        <span className="whitespace-nowrap">
          <SplitChars text="in" />
        </span>{" "}
        <span className="whitespace-nowrap">
          <SplitChars text="Cesenatico," />
        </span>{" "}
        <span className="whitespace-nowrap">
          <SplitChars text="Italy" />
        </span>
      </p>
    </motion.div>
  )
}