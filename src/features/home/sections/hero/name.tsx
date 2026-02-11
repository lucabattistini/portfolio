import * as motion from "motion/react-client";
import { type Variants } from "motion";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export function Name() {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-display uppercase text-primary text-right font-semibold leading-[0.9] text-[clamp(3rem,14vw,12.5rem)]"
    >
      luca
      <br />
      battistini
    </motion.h1>
  );
}
