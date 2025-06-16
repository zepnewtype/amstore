declare module 'framer-motion' {
  import { ComponentType, ReactNode } from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }

  export interface MotionComponent extends ComponentType<MotionProps> {
    (props: MotionProps): JSX.Element;
  }

  export const motion: {
    div: MotionComponent;
    span: MotionComponent;
    h1: MotionComponent;
    h2: MotionComponent;
    h3: MotionComponent;
    h4: MotionComponent;
    h5: MotionComponent;
    h6: MotionComponent;
    p: MotionComponent;
    section: MotionComponent;
    article: MotionComponent;
    img: MotionComponent;
    button: MotionComponent;
    a: MotionComponent;
    [key: string]: MotionComponent;
  };

  export const AnimatePresence: ComponentType<{
    children?: ReactNode;
    mode?: string;
    initial?: boolean;
    [key: string]: any;
  }>;
} 