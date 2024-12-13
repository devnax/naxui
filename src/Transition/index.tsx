'use client'
import { ReactElement, cloneElement, Children } from 'react';
import { useBreakpointProps, useInterface, useTransition, UseTransitionProps, useBreakpointPropsType } from 'naxui-manager';


export type TransitionProps = Omit<UseTransitionProps, "variant"> & {
    children: ReactElement;
    open: boolean;
    variant?: useBreakpointPropsType<UseTransitionProps['variant']>
}

const Transition = ({ children, open, ...rest }: TransitionProps) => {
    let [props] = useInterface<any>("Transition", rest, {
        variant: "fade"
    })

    const _p: any = {}
    if (props.variant) _p.variant = props.variant
    const p: any = useBreakpointProps(_p)
    props.variant = p.variant

    const { classname } = useTransition(open, props)
    if (!children || Array.isArray(children)) throw new Error("Invalid children in Transition")
    const first: any = Children.toArray(children).shift();
    return cloneElement(first, { className: classname })
}




export default Transition