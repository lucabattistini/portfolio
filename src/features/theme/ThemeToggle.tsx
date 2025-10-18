import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { stick, unstick } from '../cursor/cursorSlice';
import { computeStuckCoordinates } from '../cursor/cursorUtils';
import { selectTheme, toggleTheme } from './themeSlice';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(stick(computeStuckCoordinates(e.currentTarget.getBoundingClientRect())));
  };

  const handleMouseLeave = () => {
    dispatch(unstick());
  };

  return (
    <motion.div
      className={classNames('flex ml-auto relative select-none pointer-events-auto', className)}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={() => theme !== 'light' && dispatch(toggleTheme())}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classNames('py-px mr-3 transition-colors duration-300', {
          'text-theme-text-secondary': theme !== 'light',
          'bg-theme-accent text-theme-button-text px-2 rounded': theme === 'light',
        })}
        aria-label="Switch to light theme"
      >
        light
      </button>

      <hr className="bg-theme-text-secondary w-px h-5 mr-3 rotate-[22.5deg] border-0" />

      <button
        onClick={() => theme !== 'dark' && dispatch(toggleTheme())}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classNames('py-px transition-colors duration-300', {
          'text-theme-text-secondary': theme !== 'dark',
          'bg-theme-accent text-theme-button-text px-2 rounded': theme === 'dark',
        })}
        aria-label="Switch to dark theme"
      >
        dark
      </button>
    </motion.div>
  );
};

export default ThemeToggle;
