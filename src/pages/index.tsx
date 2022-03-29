import { AnimateSharedLayout } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Charming from '../common/components/charming/Charming';
import Cursor from '../features/cursor/Cursor';
import { stick, unstick } from '../features/cursor/cursorSlice';
import Loader from '../features/loader/Loader';
import { selectLoaderState } from '../features/loader/loaderSlice';

const Home: NextPage = () => {
  const loaderState = useAppSelector(selectLoaderState);
  const dispatch = useAppDispatch();

  return (
    <div className="font-sans bg-stone-900 flex h-screen overflow-hidden relative cursor-none">
      <Head>
        <title>luca battistini — frontend developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimateSharedLayout>
        {!loaderState.isCompleted ? (
          <Loader />
        ) : (
          <>
            <Cursor />
            <main className="fixed left-0 top-0 h-screen w-full flex flex-col items-start px-10 py-12 cursor-auto">
              <div className="flex items-center flex-none">
                <Charming delay={0.1}>
                  <h1 className="font-sans text-lg font-normal text-red-700">luca battistini</h1>
                </Charming>
              </div>
              <div className="flex items-center flex-none mt-auto w-full">
                <div className="flex items-center leading-none">
                  <span className="text-stone-600 mr-3 py-px">he</span>
                  <hr className="bg-stone-600 w-px h-5 mr-3 rotate-[22.5deg] border-0" />
                  <span className="bg-red-700 text-stone-900 py-px">him</span>
                </div>

                <a
                  className="flex ml-auto"
                  href="mailto:hello@lucabattistini.dev"
                  onMouseEnter={() => dispatch(stick())}
                  onMouseLeave={() => dispatch(unstick())}
                >
                  <span className="inline-flex animate-hello origin-[90%_100%] px-2">👋</span>
                  <Charming delay={0.1}>
                    <span className="text-stone-600">say hello</span>
                  </Charming>
                </a>
              </div>
            </main>
          </>
        )}
      </AnimateSharedLayout>
    </div>
  );
};

export default Home;
