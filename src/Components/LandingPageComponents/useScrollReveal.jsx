import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Scroll-reveal animation wrapper using framer-motion.
 * 
 * Usage:
 *   <Reveal>
 *     <h2>Content that fades in on scroll</h2>
 *   </Reveal>
 */
export function Reveal({
  children,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  delay = 0,
  duration = 0.7,
  distance = 40,
  once = true,
  threshold = 0.15,
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered reveal for lists of items.
 * Wrap each child and they'll animate in sequence.
 */
export function StaggerReveal({
  children,
  stagger = 0.1,
  direction = 'up',
  duration = 0.7,
  distance = 30,
  once = true,
  threshold = 0.1,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directionMap[direction] || directionMap.up;

  return (
    <div ref={ref}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, ...offset }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
              transition={{
                duration,
                delay: i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </div>
  );
}
