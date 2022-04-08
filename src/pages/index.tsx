import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Charming from '../common/components/charming/Charming';
import Cursor from '../features/cursor/Cursor';
import { hover, stick, unhover, unstick } from '../features/cursor/cursorSlice';
import { computeStuckCoordinates } from '../features/cursor/cursorUtils';
import Loader from '../features/loader/Loader';
import { selectLoaderState } from '../features/loader/loaderSlice';
import Particles from '../features/particles/Particles';
import { explode, unexplode } from '../features/particles/particlesSlice';

const Home: NextPage = () => {
  const loaderState = useAppSelector(selectLoaderState);
  const dispatch = useAppDispatch();

  return (
    <motion.div className="font-sans bg-stone-900 flex h-screen overflow-hidden relative" layout>
      <NextSeo
        title="luca battistini — frontend developer"
        description="i am an italian born and raised frontend developer who tries to make the www a
      better place"
        openGraph={{
          type: 'website',
          url: 'https://www.lucabattistini.dev',
          site_name: 'luca battistini — frontend developer',
          images: [
            {
              url: 'https://www.lucabattistini.dev/og/1200x675.jpg',
              alt: 'luca battistini',
              height: 675,
              width: 1200,
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />

      {!loaderState.isCompleted ? (
        <Loader />
      ) : (
        <>
          <Cursor />
          <main className="fixed left-0 top-0 h-full w-full flex flex-col items-start px-10 py-12 z-10 pointer-events-none">
            <div className="flex items-center flex-none">
              <motion.div
                initial={{ opacity: 0, left: '-12px' }}
                animate={{ opacity: 1, left: 0, transition: { duration: 0.5 } }}
                className="flex items-center leading-none relative pointer-events-auto"
                onMouseEnter={() => dispatch(hover())}
                onMouseLeave={() => dispatch(unhover())}
              >
                <Charming delay={125}>
                  <h1 className="font-sans text-lg font-normal text-red-700 select-none">
                    luca battistini
                  </h1>
                </Charming>
              </motion.div>
            </div>

            <div className="flex flex-1 lg:flex-none items-end w-full mt-auto mb-8">
              <motion.div
                initial={{ opacity: 0, left: '-12px' }}
                animate={{ opacity: 1, left: 0, transition: { duration: 0.5 } }}
                className="flex items-center leading-none relative max-w-xs pointer-events-auto"
                onMouseEnter={() => dispatch(hover())}
                onMouseLeave={() => dispatch(unhover())}
              >
                <Charming delay={50}>
                  <p className="font-sans text-base font-normal text-red-700 select-none">
                    i am an italian born and raised frontend developer who tries to make the www a
                    better place
                  </p>
                </Charming>
              </motion.div>
            </div>

            <div className="flex items-center flex-none mt-auto w-full">
              <motion.div
                initial={{ opacity: 0, left: '-12px' }}
                animate={{ opacity: 1, left: 0, transition: { duration: 0.5 } }}
                className="flex items-center leading-none relative select-none pointer-events-auto"
                onMouseEnter={() => dispatch(hover())}
                onMouseLeave={() => dispatch(unhover())}
              >
                <span className="text-stone-600 mr-3 py-px">he</span>
                <hr className="bg-stone-600 w-px h-5 mr-3 rotate-[22.5deg] border-0" />
                <span className="bg-red-700 text-stone-900 py-px">him</span>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, right: '-12px' }}
                animate={{ opacity: 1, right: 0, transition: { duration: 0.5 } }}
                className="flex ml-auto relative select-none pointer-events-auto"
                href="mailto:hello@lucabattistini.dev"
                onMouseEnter={(e) => {
                  dispatch(stick(computeStuckCoordinates(e.currentTarget.getBoundingClientRect())));
                  dispatch(explode());
                }}
                onMouseLeave={() => {
                  dispatch(unstick());
                  dispatch(unexplode());
                }}
              >
                <span className="inline-flex animate-hello origin-[90%_100%] mr-2">👋</span>
                <Charming delay={100}>
                  <span className="text-stone-600">say hello</span>
                </Charming>
              </motion.a>
            </div>
          </main>
          <Particles colorThreshold={34} picture="/media/me.png" />
        </>
      )}
    </motion.div>
  );
};

export default Home;
