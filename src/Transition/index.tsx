'use client'
import React, { useState, useRef, useEffect } from 'react';
import { TagProps, TagComponenntType, useProps, css, keyframes } from 'naxui-manager';
import { animated, useSpring, UseSpringProps } from '@react-spring/web'
import * as variants from './variants'
import { classNames } from 'naxcss'

export type TransitionProps<T extends TagComponenntType = "div"> = TagProps<T> & UseSpringProps & {
    in?: boolean;
    type?: "Zoom" | "ZoomOver" | "Collapse" | "SlideDown" | "SlideUp" | "SlideLeft" | "SlideRight"
}


const _Transition = <T extends TagComponenntType = "div">({ children, type, ...rest }: TransitionProps<T>, ref: React.Ref<any>) => {
    const [contentHeight, setContentHeight] = useState(0);
    ref = ref || useRef();

    useEffect(() => {
        ref && setContentHeight((ref as any)?.current.scrollHeight)
    }, [ref, contentHeight])

    let _in = rest.in === undefined ? true : rest.in
    delete rest.in;
    type = type || "Zoom"

    let {
        from,
        to,
        loop,
        delay,
        immediate,
        reset,
        reverse,
        pause,
        cancel,
        config,
        onStart,
        onRest,
        onChange,
        onPause,
        onResume,
        onResolve,
        onProps,
        ...props
    } = rest
    const compProps = useProps({ display: "inline-block", ...props })

    if (!from && !to) {
        let variant = variants[type]({ contentHeight })
        if (_in) {
            from = variant.in.from
            to = variant.in.to
        } else {
            from = variant.out.from
            to = variant.out.to
        }
    }

    const springProps = useSpring({
        loop,
        delay,
        immediate,
        reset,
        reverse,
        pause,
        cancel,
        config,
        onStart,
        onRest,
        onChange,
        onPause,
        onResume,
        onResolve,
        onProps,
        from,
        to
    })

    return <animated.div {...compProps} style={springProps} ref={ref}>{children}</animated.div>
}




const Transition = <T extends TagComponenntType = "div">({ children, type, onRest, ...rest }: TransitionProps<T>, ref: React.Ref<any>) => {

    let _in = rest.in === undefined ? true : rest.in
    delete rest.in;


    const compProps = useProps(rest)

    return <div {...compProps} className={classNames(compProps.className)} ref={ref}>{children}</div>
}

export default React.forwardRef(Transition) as typeof Transition


