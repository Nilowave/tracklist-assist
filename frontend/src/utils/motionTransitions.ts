import { MotionProps } from 'framer-motion';

export enum Transitions {
  Fade = 'fade',
  SlideFade = 'slideFade',
}

export const variantProps = {
  animate: 'animate',
  initial: 'initial',
  exit: 'exit',
};

export const eases = {
  outExpo: [0.19, 1, 0.22, 1],
  outBackExpo: [0.19, 1.56, 0.22, 1],
  inExpo: [0.7, 0, 0.84, 0],
  inBackExpo: [0.7, 0, 0.84, -0.56],
};

export const staggerChildren = (stagger = 0.1): MotionProps => ({
  ...variantProps,
  variants: {
    animate: {
      transition: {
        staggerChildren: stagger,
      },
    },
  },
});

export const slideFade = (
  axis: 'x' | 'y' = 'x',
  duration = 0.5,
  offset = 50,
  direction: 1 | -1 = 1,
  isChild = false,
  oppositeExit = false
): MotionProps => ({
  ...(isChild ? {} : variantProps),
  variants: {
    initial: {
      [axis]: direction * offset,
      opacity: 0,
    },
    animate: {
      [axis]: 0,
      opacity: 1,
      transition: {
        ease: eases.outExpo,
        duration,
      },
    },
    exit: {
      [axis]: (oppositeExit ? -direction : direction) * -offset,
      opacity: 0,
      transition: {
        ease: eases.inExpo,
      },
    },
  },
});

export const fade = (duration = 0.5, isChild = false): MotionProps => ({
  ...(isChild ? {} : variantProps),
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        ease: eases.outExpo,
        duration,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ease: eases.outExpo,
      },
    },
  },
});

export const scale = (scale = 0.8, duration = 0.5, isChild = false): MotionProps => ({
  ...(isChild ? {} : variantProps),
  variants: {
    initial: {
      opacity: 0,
      scale,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: eases.outExpo,
        duration,
      },
    },
    exit: {
      opacity: 0,
      scale,
      transition: {
        ease: eases.outExpo,
      },
    },
  },
});
