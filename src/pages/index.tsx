import { AnimateSharedLayout } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAppSelector } from '../app/hooks';
import Charming from '../common/components/charming/Charming';
import Cursor from '../features/cursor/Cursor';
import Loader from '../features/loader/Loader';
import { selectLoaderState } from '../features/loader/loaderSlice';

const Home: NextPage = () => {
  const loaderState = useAppSelector(selectLoaderState);

  return (
    <div className="font-sans bg-stone-900">
      <Head>
        <title>luca battistini :: frontend developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen overflow-hidden relative">
        <AnimateSharedLayout>
          {!loaderState.isCompleted ? (
            <Loader />
          ) : (
            <>
              <Cursor />
              <div className="fixed left-0 top-0 h-screen w-full px-10 py-12">
                <Charming>
                  <h1 className="font-sans text-lg font-normal text-red-700">luca battistini</h1>
                </Charming>
              </div>
            </>
          )}
        </AnimateSharedLayout>
      </main>
    </div>
  );
};

export default Home;
