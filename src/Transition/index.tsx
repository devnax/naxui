'use client'
import React, { useEffect } from 'react';
import { UseTransitionsVariantsTypes, UseTransitionsVariantCallback, useTransitions, UseTransitionsProps, Tag, TagProps, useInterface } from 'naxui-manager';

export type TransitionProps = TagProps<"div"> & UseTransitionsProps & {
    in?: boolean;
    type?: UseTransitionsVariantsTypes | UseTransitionsVariantCallback;
}

const _Transition = ({ children, in: _in, ...rest }: TransitionProps, ref: React.Ref<any>) => {
    const {
        type,
        ease,
        easing,
        duration,
        delay,
        onStart,
        onFinish,
        ...rootProps
    } = useInterface("Transition", {}, rest)

    const [_ref, cls] = useTransitions(type || "fade", _in, {
        ease,
        easing,
        duration: duration || 400,
        delay,
        onStart,
        onFinish
    })

    useEffect(() => {
        if (ref) ref = _ref
    }, [])

    return (
        <Tag
            display="inline-block"
            {...rootProps}
            className={cls}
            baseClass='transition'
            ref={_ref}
        >
            {children}
        </Tag>
    )
}

const Transition = React.forwardRef(_Transition) as typeof _Transition
export default Transition