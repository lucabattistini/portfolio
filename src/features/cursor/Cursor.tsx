import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useMobileDetect from '../../common/hooks/useDeviceDetect';
import useMousePosition from '../../common/hooks/useMousePosition';
import { selectCursorState, setPosition, setSpeed, showCursor } from './cursorSlice';

export interface CursorProps {
  easingFunction?: string | number[];
}

const Cursor: React.VoidFunctionComponent<CursorProps> = ({ easingFunction = 'easeOut' }) => {
  const state = useAppSelector(selectCursorState);

  const mousePosition = useMousePosition();

  const isMobile = useMobileDetect();

  const dispach = useAppDispatch();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (state.isVisible === false) {
      timer = setTimeout(() => {
        dispach(setSpeed(0.2));
      }, 100);

      dispach(showCursor());
    }

    if (state.isStuck === false) {
      dispach(setPosition(mousePosition));
    }

    return () => clearTimeout(timer);
  }, [mousePosition]);

  return (
    <>
      {!isMobile && (
        <motion.div
          className="pointer-events-none absolute top-[-47.5px] left-[-47.5px] z-10 flex h-[95px] w-[95px] origin-center items-center justify-center overflow-visible rounded-full"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transform: `matrix(1, 0, 0, 1, ${state.position.x}, ${state.position.y})`,
          }}
          transition={{ ease: easingFunction, duration: state.speed }}
        >
          <span
            className={classNames(
              'absolute',
              '-z-20',
              'h-full',
              'w-full',
              'origin-[50%_50%]',
              'rounded-full',
              'bg-red-700',
              'transition-all',
              'duration-[350ms]',
              'ease-in-out',
              { 'scale-100 opacity-40': state.isStuck },
              { 'scale-[0.2]': !state.isStuck },
            )}
          ></span>
        </motion.div>
      )}
    </>
  );
};

export default Cursor;
