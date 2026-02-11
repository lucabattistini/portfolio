import * as motion from "motion/react-client";
import Link from "next/link";
import { Timezone } from "./timezone";

export function Navbar() {
  return (
    <nav className="fixed max-w-384 flex items-start justify-between gap-0 w-full h-min p-0 overflow-visible z-20 top-8 px-16">
      <div className="relative flex items-center gap-4 w-full h-auto select-none">
        <div>
          <p className="text-xl text-primary font-sans font-bold">
            Luca Battistini
          </p>
        </div>
        <div className="relative flex flex-row items-center gap-2">
          <i className="flex-none w-3 h-3 relative overflow-visible">
            <motion.span
              className="absolute rounded-full bg-accent w-3 h-3"
              animate={{
                opacity: [0.18, 0.36, 0.18],
                scale: [0.95, 1.25, 0.95],
                rotate: [0, 4.5, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.span
              className="absolute rounded-full bg-accent w-2 h-2 top-1/2 left-1/2 -translate-x-1 -translate-y-1"
              animate={{
                scale: [0.995, 1.005, 0.995],
                rotate: [0, 1.2, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </i>
          <p className="text-xl text-accent font-sans font-semibold">
            Available for work
          </p>
        </div>
      </div>
      <div className="relative flex justify-between w-1/4">
        <ul className="relative flex flex-col">
          <li>
            <Link
              className="text-xl text-primary hover:text-accent transition font-sans font-bold select-none"
              href="/luca-battistini-resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </Link>
          </li>
          <li>
            <Link
              className="text-xl text-primary hover:text-accent transition font-sans font-bold select-none"
              href="mailto:hello@lucabattistini.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Me
            </Link>
          </li>
        </ul>
        <div className="relative flex flex-col flex-none items-center justify-start select-none">
          <Timezone />
        </div>
      </div>
    </nav>
  );
}
