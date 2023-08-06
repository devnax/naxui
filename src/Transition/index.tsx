'use client'
import React, { useState, useRef, useEffect } from 'react';
import { TagProps, TagComponenntType, useProps, keyframes } from 'naxui-manager';
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
    const [timer, setTimer] = useState(null);
    const [contentHeight, setContentHeight] = useState(0);
    ref = ref || useRef();

    useEffect(() => {
        ref && setContentHeight((ref as any)?.current.scrollHeight)
    }, [ref, contentHeight])

    let _in = rest.in === undefined ? true : rest.in
    delete rest.in;
    type = type || "Zoom"

    useEffect(() => {
        clearTimeout(timer as any)
        setTimer(setTimeout(() => {
            onRest && onRest()
        }, 200) as any)
    }, [_in])

    let {
        ...props
    } = rest

    let frame: any = {
        from: {
            transform: _in ? "scale(1.5)" : "scale(1)",
            opacity: _in ? 0 : 1
        },
        to: {
            transform: _in ? "scale(1)" : "scale(1.5)",
            opacity: _in ? 1. : 0
        }
    }

    const compProps = useProps({
        display: "inline-block",
        animation: `${keyframes(frame)} 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 0ms`,
        ...frame.to,
        ...props
    })



    return <div {...compProps} ref={ref}>{children}</div>
}

export default React.forwardRef(Transition) as typeof Transition


