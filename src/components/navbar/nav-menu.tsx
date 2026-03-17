import * as motion from 'motion/react-client';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { useNavbarActorRef, useNavbarSelector } from './store';
import { Timezone } from './timezone';
import { type Variants } from 'motion/react';
import { splitWords } from '@/lib/utils';
import { useEffect } from 'react';
import { Fragment } from 'react/jsx-runtime';

const parentAnimation: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.45,
      staggerChildren: 0.04,
    },
  },
};

const wordAnimation: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const liAnimation: Variants = {
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

export function NavMenu() {
  const lenis = useLenis();
  const actorRef = useNavbarActorRef();
  const { isMenuOpen } = useNavbarSelector((snapshot) => snapshot.context);

  useEffect(() => {
    if (!lenis) return;
    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isMenuOpen]);

  const label = isMenuOpen ? 'Close' : 'Menu';

  const { source, lines } = splitWords(
    'Hands-on software engineering with experience in technical leadership roles.',
  );

  return (
    <>
      <div className="relative z-20 flex w-1/4 justify-end">
        <button
          className="text-primary hover:text-accent font-sans text-xl font-bold transition select-none"
          onClick={() => actorRef.send({ type: 'TOGGLE_MENU' })}
        >
          {label}
        </button>
      </div>
      {isMenuOpen && (
        <menu className="fixed top-0 left-0 z-10 h-screen w-screen">
          <div className="relative flex h-full w-full flex-col justify-end gap-8 px-8 pb-8">
            <motion.p
              variants={parentAnimation}
              initial="hidden"
              animate="show"
              aria-label={source}
              className="text-accent relative h-auto w-full flex-none justify-start font-sans text-2xl leading-[1.2] font-semibold wrap-break-word whitespace-pre-wrap"
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
            <ul className="relative flex flex-col">
              <motion.li variants={liAnimation} initial="hidden" animate="show">
                <Link
                  className="text-primary hover:text-accent font-sans text-xl font-bold transition select-none"
                  href="/resume.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </Link>
              </motion.li>
              <motion.li variants={liAnimation} initial="hidden" animate="show">
                <Link
                  className="text-primary hover:text-accent font-sans text-xl font-bold transition select-none"
                  href="mailto:hello@lucabattistini.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Me
                </Link>
              </motion.li>
              <motion.li variants={liAnimation} initial="hidden" animate="show">
                <Timezone />
              </motion.li>
            </ul>
          </div>
        </menu>
      )}
    </>
  );
}
