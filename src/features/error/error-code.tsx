'use client';

import * as motion from 'motion/react-client';
import { type Variants } from 'motion/react';
import { useCursorActorRef } from '@/components/cursor/store';
import Link from 'next/link';
import { splitWords } from '@/lib/utils';
import { Fragment } from 'react/jsx-runtime';
import { useParticlesActorRef } from '@/components/particles';

const codeAnimation: Variants = {
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

const parentMessageAnimation: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.04,
    },
  },
};

const wordMessageAnimation: Variants = {
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

const ctaAnimation: Variants = {
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

type ErrorCodeProps = {
  code: string;
  message: string;
};

export function ErrorCode({ code, message }: ErrorCodeProps) {
  const { source, lines } = splitWords(message);
  const cursorActor = useCursorActorRef();
  const particlesActor = useParticlesActorRef();

  const onPointerEnter = () => {
    cursorActor.send({
      type: 'HOVER',
    });
    particlesActor.send({ type: 'EXPLODE' });
  };

  const onPointerLeave = () => {
    cursorActor.send({ type: 'UNHOVER' });
    particlesActor.send({ type: 'REPAIR' });
  };

  return (
    <article className="pointer-events-none relative flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
      <div className="z-1 flex flex-col items-center justify-center gap-4">
        <motion.h1
          variants={codeAnimation}
          initial="hidden"
          animate="show"
          className="text-primary font-display text-[clamp(3rem,14vw,12.5rem)] leading-[0.9] font-bold tracking-wide"
        >
          {code}
        </motion.h1>

        <motion.h2
          variants={parentMessageAnimation}
          initial="hidden"
          animate="show"
          aria-label={source}
          className="wrap-break-word whitespace-pre-wrap"
        >
          {lines.map((line, index) => (
            <Fragment key={line.key}>
              {line.tokens.map((word) => (
                <motion.span
                  className="text-accent inline-block font-sans text-4xl font-bold"
                  key={word.key}
                  aria-hidden
                  variants={wordMessageAnimation}
                >
                  {word.value}
                </motion.span>
              ))}

              {index < lines.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </motion.h2>
      </div>

      <motion.div
        variants={ctaAnimation}
        initial="hidden"
        animate="show"
        className="flex justify-end"
      >
        <Link
          href="/"
          className="text-primary hover:text-accent pointer-events-auto font-sans text-xl font-bold transition"
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
        >
          Go to the Home Page
        </Link>
      </motion.div>
    </article>
  );
}
