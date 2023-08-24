import { useEffect } from 'react';
import { m, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ----------------------------------------------------------------------

export default function MotionInView({
  children,
  variants,
  transition,
  threshold,
  className,
  ...other
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: threshold || 0,
    triggerOnce: true
  });

  useEffect(() => {
    if (!variants) return;
    if (inView) {
      controls.start(Object.keys(variants)[1]);
    } else {
      controls.start(Object.keys(variants)[0]);
    }
  }, [controls, inView, variants]);

  return (
    <m.div
      ref={ref}
      initial={variants ? Object.keys(variants)[0] : false}
      animate={controls}
      variants={variants}
      transition={transition}
      className={className}
      {...other}
    >
      {children}
    </m.div>
  );
}
