'use client'
import React, { useState, ReactElement, cloneElement, Children } from 'react';
import { useInterface, useTransition, UseTransitionProps, UseTransitionState } from 'naxui-manager';

export type TransitionProps = UseTransitionProps & {
    children: ReactElement;
    open: boolean;
}

const Transition = ({ children, open, ...rest }: TransitionProps) => {
    const props: any = useInterface("Transition", {
        variant: "fade"
    }, rest)
    const [state, setState] = useState<UseTransitionState>('open')

    const cls = useTransition(open, {
        ...props,
        onState: (s) => {
            console.log(s);

            setState(s)
        }
    })
    if (!children || Array.isArray(children)) throw new Error("Invalid children in Transition")
    const first: any = Children.toArray(children).shift();
    return state == 'closed' ? <></> : cloneElement(first, { className: cls })
}

export default Transition