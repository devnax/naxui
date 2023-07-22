'use client'
import React, { forwardRef, ReactElement, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import variants from './variants';
export { variants }
export type AnimationType = 'zoom' | 'zoomOver' | 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight';

export interface AnimateBoxProps extends MotionProps {
    children: ReactElement | ReactNode;
    type?: AnimationType | 'none';
    ref?: any;
    step?: 1 | 2 | 3 | 4 | 5
}

const AnimateBox = ({ children, type, step, ...props }: AnimateBoxProps, ref: React.Ref<any>) => {
    type = type || 'zoomOver';
    let _variants: any = variants.zoomOver(step || 1);
    if (variants.hasOwnProperty(type)) {
        _variants = (variants as any)[type](step || 1);
    }

    if (type === 'none') {
        _variants = {};
    }

    return (
        <motion.div
            ref={ref}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={_variants}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default forwardRef(AnimateBox) as typeof AnimateBox
