import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useMedia from '../../common/hooks/useMedia';
import useMousePosition from '../../common/hooks/useMousePosition';
import { selectCursorState, setPosition, setSpeed, showCursor } from './cursorSlice';

export interface CursorProps {
  easingFunction?: string | number[];
}

const Cursor: React.VoidFunctionComponent<CursorProps> = ({ easingFunction = 'easeOut' }) => {
  const state = useAppSelector(selectCursorState);

  const mousePosition = useMousePosition();

  const isMobile = useMedia('(max-width: 768px)');

  const dispach = useAppDispatch();

  useEffect(() => {
    if (state.isVisible === false) {
      setTimeout(() => {
        dispach(setSpeed(0.2));
      }, 100);

      dispach(showCursor());
    }

    if (state.isStuck === false) {
      dispach(setPosition(mousePosition));
    }
  }, [mousePosition]);

  return (
    <>
      {!isMobile && (
        <motion.div
          className={classNames(
            'pointer-events-none',
            'absolute',
            'top-[-47.5px]',
            'left-[-47.5px]',
            'z-10',
            'flex',
            'h-[95px]',
            'w-[95px]',
            'origin-center',
            'items-center',
            'justify-center',
            'overflow-visible',
            'rounded-full',
            { 'scale-100 opacity-20': state.isStuck },
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
            className="absolute -z-20 h-full w-full origin-[50%_50%] 
        scale-[0.2] rounded-full bg-red-700 
        transition-all duration-[350ms] ease-in-out"
          ></span>
        </motion.div>
      )}
    </>
  );
};

export default Cursor;
