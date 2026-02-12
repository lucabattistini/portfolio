'use client';

import * as motion from 'motion/react-client';
import Link from 'next/link';
import { Timezone } from './timezone';
import { computeStuckCoordinates, useCursorActorRef } from '../cursor';
import { type Variants } from 'motion/react';

const animation: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Navbar() {
  const cursorActor = useCursorActorRef();

  const onPointerEnter = (event: React.PointerEvent<HTMLAnchorElement>) => {
    cursorActor.send({
      type: 'STICK',
      position: computeStuckCoordinates(event.currentTarget.getBoundingClientRect()),
    });
  };

  const onPointerLeave = () => {
    cursorActor.send({ type: 'UNSTICK' });
  };

  return (
    <nav className="fixed top-8 z-20 flex h-min w-full max-w-384 items-start justify-between gap-0 overflow-visible p-0 px-16">
      <motion.div
        variants={animation}
        initial="hidden"
        animate="show"
        className="relative flex h-auto w-full items-center gap-4 select-none"
      >
        <p className="text-primary font-sans text-xl font-bold">Luca Battistini</p>
        <div className="relative flex flex-row items-center gap-2">
          <i className="relative h-3 w-3 flex-none overflow-visible">
            <motion.span
              className="bg-accent absolute h-3 w-3 rounded-full"
              animate={{
                opacity: [0.18, 0.36, 0.18],
                scale: [0.95, 1.25, 0.95],
                rotate: [0, 4.5, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.span
              className="bg-accent absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1 -translate-y-1 rounded-full"
              animate={{
                scale: [0.995, 1.005, 0.995],
                rotate: [0, 1.2, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </i>
          <p className="text-accent font-sans text-xl font-semibold">Available for work</p>
        </div>
      </motion.div>
      <div className="relative flex w-1/4 justify-between">
        <ul className="relative flex flex-col">
          <li>
            <Link
              className="text-primary hover:text-accent font-sans text-xl font-bold transition select-none"
              href="/luca-battistini-resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
            >
              Download Resume
            </Link>
          </li>
          <li>
            <Link
              className="text-primary hover:text-accent font-sans text-xl font-bold transition select-none"
              href="mailto:hello@lucabattistini.dev"
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
            >
              Contact Me
            </Link>
          </li>
        </ul>
        <div className="relative flex flex-none flex-col items-center justify-start select-none">
          <Timezone />
        </div>
      </div>
    </nav>
  );
}
