import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useAppDispatch } from '../app/hooks';
import Charming from '../common/components/charming/Charming';
import Cursor from '../features/cursor/Cursor';
import { hide, stick, unstick } from '../features/cursor/cursorSlice';
import { computeStuckCoordinates } from '../features/cursor/cursorUtils';

const Custom404: NextPage = () => {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      className="font-sans bg-stone-900 flex h-screen overflow-hidden relative cursor-none"
      layout
    >
      <Head>
        <title>404 — not found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Cursor />
      <main className="fixed left-0 top-0 h-screen w-full flex flex-col items-center justify-center px-10 py-12 cursor-auto">
        <motion.span
          initial={{ opacity: 0, right: '-12px' }}
          animate={{ opacity: 1, right: 0, transition: { duration: 0.5 } }}
          className="flex relative select-none"
        >
          <Link href="/">
            <a
              className="flex"
              onMouseEnter={(e) =>
                dispatch(stick(computeStuckCoordinates(e.currentTarget.getBoundingClientRect())))
              }
              onMouseLeave={() => dispatch(unstick())}
              onClick={() => {
                dispatch(unstick());
                dispatch(hide());
              }}
            >
              <span className="inline-flex animate-back origin-[90%_100%] mr-2">🔙</span>
              <Charming delay={100}>
                <span className="text-stone-600">this page could not be found</span>
              </Charming>
            </a>
          </Link>
        </motion.span>
      </main>
    </motion.div>
  );
};

export default Custom404;
