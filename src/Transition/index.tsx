'use client'
import { ReactElement, cloneElement, Children } from 'react';
import { useInterface, useTransition, UseTransitionProps } from 'naxui-manager';

export type TransitionProps = UseTransitionProps & {
    children: ReactElement;
    open: boolean;
}

const Transition = ({ children, open, ...rest }: TransitionProps) => {
    const props: any = useInterface("Transition", {
        variant: "fade"
    }, rest)

    const { classname } = useTransition(open, props)
    if (!children || Array.isArray(children)) throw new Error("Invalid children in Transition")
    const first: any = Children.toArray(children).shift();
    return cloneElement(first, { className: classname })
}




export default Transition