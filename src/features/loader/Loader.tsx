import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Charming from '../../common/components/charming/Charming';
import useInterval from '../../common/hooks/useInterval';
import { complete, selectLoaderState, setValue, start, stop } from './loaderSlice';

export interface LoaderProps {
  maxValue?: number;
}

const Loader: React.VoidFunctionComponent<LoaderProps> = ({
  maxValue = new Date().getFullYear(),
}) => {
  const state = useAppSelector(selectLoaderState);
  const dispatch = useAppDispatch();

  useInterval(
    () => {
      if (state.value < maxValue) {
        dispatch(setValue(state.value + state.step));
      } else {
        dispatch(stop());
      }
    },
    state.isLoading ? 125 : null,
  );

  return (
    <AnimatePresence onExitComplete={() => dispatch(complete())}>
      {!state.shouldExit && (
        <Charming delay={125} onCharmingComplete={() => dispatch(start())}>
          <h1 className="fixed left-10 top-12 font-sans text-lg font-normal text-red-700 select-none">
            {state.value.toString()}
          </h1>
        </Charming>
      )}
    </AnimatePresence>
  );
};

export default Loader;
