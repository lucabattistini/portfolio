import React, { PropsWithChildren, useMemo } from 'react';
import { motion } from 'framer-motion';

export interface CharmingProps {
  delay?: number;
  exitEaseFunction?: string | number[];
  mountEaseFunction?: string | number[];
  onCharmingComplete?: () => void;
  pattern?: RegExp;
}

const Charming: React.FunctionComponent<PropsWithChildren<CharmingProps>> = ({
  children = undefined,
  delay = 50,
  exitEaseFunction = [0.22, 1, 0.36, 1],
  mountEaseFunction = [0.64, 0, 0.78, 0],
  onCharmingComplete = undefined,
  pattern = new RegExp(''),
}) => {
  const charmed = useMemo(() => {
    const traverse = (element: string | React.ReactElement, index?: number) => {
      if (typeof element === 'string') {
        const letters = element.split(pattern || '');

        return letters.map((letter, index) => {
          return (
            <motion.span
              aria-hidden="true"
              key={index}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: index * (delay / 1000),
                  duration: 0.1,
                  ease: mountEaseFunction,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  delay: (letters.length - index) * (delay / 1000),
                  duration: 0.1,
                  ease: exitEaseFunction,
                },
              }}
              onAnimationComplete={() => {
                if (letters.length - 1 === index) {
                  if (onCharmingComplete !== undefined) {
                    setTimeout(() => {
                      onCharmingComplete();
                    }, delay);
                  }
                }
              }}
            >
              {letter}
            </motion.span>
          );
        });
      } else if (typeof element === 'object') {
        const processedElements = traverse(element.props.children);

        let ariaLabel = null;

        if (typeof element.props.children === 'string') {
          ariaLabel = element.props.children;
        }

        return (
          <element.type aria-label={ariaLabel} {...element.props} key={index}>
            {processedElements}
          </element.type>
        );
      } else {
        return element;
      }
    };

    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return traverse(child, index);
      }

      return undefined;
    });
  }, [children]);

  return <>{charmed}</>;
};

export default Charming;
