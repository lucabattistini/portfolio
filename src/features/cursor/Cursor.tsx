import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useMobileDetect from '../../common/hooks/useMobileDetect';
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
          className={classNames(
            'pointer-events-none',
            'absolute',
            '-top-10',
            '-left-10',
            'z-10',
            'flex',
            'h-20',
            'w-20',
            'origin-center',
            'items-center',
            'justify-center',
            'overflow-visible',
            'rounded-full',
            { 'mix-blend-overlay': state.isHovered },
          )}
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
              'transition-all',
              'duration-[350ms]',
              'ease-in-out',
              { 'bg-red-700 scale-100 opacity-40': state.isStuck },
              { 'bg-red-700 scale-[0.25]': !state.isStuck },
              { 'bg-stone-900': state.isHovered },
            )}
          ></span>
        </motion.div>
      )}
    </>
  );
};

export default Cursor;
