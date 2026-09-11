import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}


export function ScrollReveal({ children, delay = 0, direction = 'up' }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const yOffset = direction === 'up' ? 50 : direction === 'down' ? -50 : 0;
  const xOffset = direction === 'left' ? 50 : direction === 'right' ? -50 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, x: xOffset, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' } : { opacity: 0, y: yOffset, x: xOffset, filter: 'blur(10px)' }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
