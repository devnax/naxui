import { useId, useState, useEffect, useMemo } from 'react'
import { CSSProps, formatProp } from 'naxcss';
import * as predefinedVariant from './variants'
import { AliasesTypes, animationEases, css, useTheme } from 'naxui-manager';
export type UseTransitionVariantTypes = keyof typeof predefinedVariant


export type UseTransitionState = "open" | "opened" | "close" | "closed"
export interface UseTransitionProps {
    hideable?: boolean;
    variant: {
        from: CSSProps<AliasesTypes>;
        to: CSSProps<AliasesTypes>;
    } | UseTransitionVariantTypes;
    ease?: string;
    easing?: keyof typeof animationEases;
    duration?: number;
    delay?: number;
    onStart?: (type: "startOpen" | "startClose") => void;
    onFinish?: (type: "finishedOpen" | "finishedClose") => void;
    onOpen?: () => void;
    onOpened?: () => void;
    onClose?: () => void;
    onClosed?: () => void;
    onState?: (state: UseTransitionState) => void;
}

export type UseTransitionElementProps = {
    height: number;
    width: number;
    rect: DOMRect | null
}

const useTransition = (open: boolean, props: UseTransitionProps | ((element: UseTransitionElementProps) => UseTransitionProps)) => {

    const id = "transition-" + useId().replace(/\:/gi, "")
    const theme = useTheme()
    const [initial, setInitial] = useState(false)

    const [element, setElement] = useState<UseTransitionElementProps>({
        height: 0,
        width: 0,
        rect: null
    });

    props = typeof props === "function" ? props(element as any) : props

    let { hideable, variant, duration, delay, ease, easing, onFinish, onStart, onOpen, onOpened, onClose, onClosed, onState } = props as UseTransitionProps
    let _ease = ease || (animationEases as any)[easing as any] || animationEases.easeBounceOut
    duration ??= 400
    if (typeof variant === 'string') {
        variant = (predefinedVariant as any)[variant](element)
    }

    const [_css, setCss] = useState<any>({ ...(variant as any).to, visibility: "hidden" })
    const [transitionState, setTransitionState] = useState<UseTransitionState>(open ? "open" : "closed")

    useMemo(() => {
        if (open && transitionState === 'closed') {
            setTransitionState("open")
        }
    }, [open])

    useEffect(() => {
        if (initial) {
            if (open) {
                setCss((variant as any).to)
            }
        }
    }, [JSON.stringify(variant)])

    useEffect(() => {
        if (!initial) {
            if (open) {
                setCss({ ...(variant as any).from, transition: "all 0s", visibility: "hidden" })
            } else {
                setCss({ ...(variant as any).to, transition: "all 0s", visibility: "hidden" })
            }
            const ele = document.querySelector(`.${id}`)
            if (ele) {
                (ele as any).ontransitionstart = (ev: any) => {
                    if (ev.propertyName === Object.keys(_css)[0]) {
                        const isOpen = Array.from(ele.classList).includes("transition-open")
                        onStart && onStart(isOpen ? "startOpen" : "startClose");
                        (onOpen && isOpen) && onOpen();
                        (onClose && !isOpen) && onClose()
                        onState && onState(isOpen ? "open" : "close")
                        setTransitionState(isOpen ? "open" : "close")
                    }
                }
                (ele as any).ontransitionend = (ev: any) => {
                    if (ev.propertyName === Object.keys(_css)[0]) {
                        const isOpen = Array.from(ele.classList).includes("transition-open")
                        onFinish && onFinish(isOpen ? "finishedOpen" : "finishedClose");
                        (onOpened && isOpen) && onOpened();
                        (onClosed && !isOpen) && onClosed();
                        onState && onState(isOpen ? "opened" : "closed")
                        setTransitionState(isOpen ? "opened" : "closed")
                    }
                }
                setElement({
                    height: ele.clientHeight,
                    width: ele.clientWidth,
                    rect: ele.getBoundingClientRect()
                })
            }

            setTimeout(() => setInitial(true), 100);
        } else {

            if (open) {
                setCss((variant as any).to)
            } else {
                setCss((p: any) => p.visibility ? { ...(variant as any).from, transition: "all 0s" } : (variant as any).from)
            }
        }
    }, [open, initial])

    let trans = ` ${duration}ms ${_ease} ${delay || 0}ms`

    let _ = {
        transition: Object.keys(_css || {}).map(k => formatProp(k)).join(trans + ", ") + trans,
        ..._css
    }

    if (hideable && transitionState === 'closed') {
        _.display = 'none!important'
    }
    const cls = css(_, theme)

    return {
        classname: cls + " " + id + " transition-" + (open ? "open" : "close") + " " + "transition-state-" + transitionState,
        state: transitionState
    }
}

export default useTransition