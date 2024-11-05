'use client'
import { ReactElement, cloneElement, Children } from 'react';
import { useInterface, useTransition, UseTransitionProps } from 'naxui-manager';

export type TransitionProps = Omit<UseTransitionProps, "variant"> & {
    children: ReactElement;
    open: boolean;
    variant?: UseTransitionProps['variant']
}

const Transition = ({ children, open, ...rest }: TransitionProps) => {
    let [props] = useInterface<any>("Transition", rest, {
        variant: "fade"
    })

    const { classname } = useTransition(open, props)
    if (!children || Array.isArray(children)) throw new Error("Invalid children in Transition")
    const first: any = Children.toArray(children).shift();
    return cloneElement(first, { className: classname })
}




export default Transition