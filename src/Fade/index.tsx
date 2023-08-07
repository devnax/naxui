import React, { useEffect, useMemo, useRef, useState } from 'react'
import Box, { BoxProps } from '../Box'

type Props = BoxProps & {
    enter: boolean;
    onFinish?: () => void;
}


interface UseTransitionProps {
    from?: object;
    to?: object;
    onFinish?: () => void;
}

const useTransition = ({ from, to, onFinish }: UseTransitionProps) => {
    const ref: any = useRef()
    const [_css, setCs] = useState<any>(from)
    const handleTransitionEnd = () => {
        ref.current?.removeEventListener("transitionend", handleTransitionEnd);
        onFinish && onFinish()
    }
    useEffect(() => {
        ref.current?.removeEventListener("transitionend", handleTransitionEnd);
        ref.current?.addEventListener("transitionend", handleTransitionEnd);
        setCs(to)
    }, [JSON.stringify({ ...from, ...to })])

    return [ref, _css]
}


const variants = {
    in: {
        from: {
            transform: "scale(1.5)",
            opacity: 0
        },
        to: {
            transform: "scale(1)",
            opacity: 1
        }
    },
    out: {
        from: {
            transform: "scale(1)",
            opacity: 1
        },
        to: {
            transform: "scale(1.5)",
            opacity: 0
        }
    }
}

const Fade = ({ enter, children, onFinish, ...rest }: Props) => {

    enter = enter === undefined ? true : enter
    const [args, setargs] = useState({
        boxHeight: 0,
        boxWidth: 0,
        initial: false
    });

    useEffect(() => {
        if (ref && ref.current) {
            let h = (ref as any).current.scrollHeight;
            let w = (ref as any).current.scrollWidth
            if (!(h === args.boxHeight && w === args.boxWidth)) {
                setargs({
                    ...args,
                    boxHeight: h,
                    boxWidth: w,
                })
            }
        }
    }, [args.boxHeight, args.boxWidth])

    useEffect(() => {
        if (!args.initial && enter) {
            setargs({
                ...args,
                initial: true
            })
        }
    }, [enter])

    let variant = enter ? variants.in : variants.out
    let [ref, _css]: any = useTransition({
        ...variant,
        onFinish
    });
    _css = args.initial ? _css : ({ visibility: "hidden" });

    return (
        <Box
            display="inline-block"
            {...rest}
            {...variant.from}
            {..._css}
            transition={args.initial ? "all 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 0ms" : ""}
            ref={ref}
        >
            {children}
        </Box>
    )
}


export default Fade