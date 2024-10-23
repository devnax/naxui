'use client'
import { ReactElement, cloneElement, Children } from 'react';
import { useInterface, useTransition, UseTransitionProps } from 'naxui-manager';

export type TransitionProps = UseTransitionProps & {
    children: ReactElement;
    open: boolean;
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