'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useInterface } from 'naxui-manager';
import Transition, { TransitionProps } from '../Transition';

export type CollapsProps<T extends TagComponentType = "div"> = TagProps<T> & Omit<TransitionProps, "variant" | "children"> & {}

const _Collaps = <T extends TagComponentType = "div">({ children, open, ...props }: CollapsProps<T>, ref: any) => {
    let [{
        ease,
        easing,
        duration,
        delay,
        onStart,
        onFinish,
        onOpen,
        onOpened,
        onClose,
        onClosed,
        ...rest
    }] = useInterface<any>("Collaps", props, {})

    open ??= false
    easing ??= "easeOut"

    return (
        <Transition
            {...{
                ease,
                easing,
                duration,
                delay,
                onStart,
                onFinish,
                onOpen,
                onOpened,
                onClose,
                onClosed
            }}
            variant="collapsVerticle"
            open={open}
        >
            <Tag
                {...rest}
                baseClass='collaps'
                ref={ref}
            >{children}</Tag>
        </Transition>
    )
}

const Collaps = React.forwardRef(_Collaps) as typeof _Collaps
export default Collaps


