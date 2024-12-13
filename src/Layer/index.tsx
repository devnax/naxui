import React, { ReactNode, useEffect, useState } from 'react'
import { Tag, TagProps, useBreakpointProps, useBreakpointPropsType, useInterface, UseTransitionProps } from "naxui-manager"
import Portal, { PortalProps } from "../Portal";
import Transition from '../Transition';
import { useMemo } from "react"
import { alpha } from "naxui-manager";
import Renderar from '../ThemeProvider/RenderRoot';


let _d: CSSStyleDeclaration;

const useBlurCss = (blur: number, mode: LayerProps["blurMode"]) => {
    return useMemo(() => {
        let transparent = { bgcolor: alpha("#000000", blur / 100) }
        if (typeof window === 'undefined' || mode === 'transparent') {
            return transparent
        }
        const d = _d || (_d = window.document.createElement("div").style)
        return d['backdropFilter'] !== undefined ? { backdropFilter: `blur(${(blur / 100) * 10}px)` } : transparent
    }, [blur])
}


export type LayerProps = {
    open: boolean;
    children: ReactNode;
    id?: string;
    transition?: UseTransitionProps['variant'];
    zIndex?: number;
    blur?: useBreakpointPropsType<number>
    blurMode?: useBreakpointPropsType<"blur" | "transparent">
    onClickOutside?: () => void;
    onOpen?: Function;
    onOpened?: Function;
    onClose?: Function;
    onClosed?: Function;
    slotProps?: {
        root?: Omit<TagProps<"div">, "children">;
        transition?: Omit<UseTransitionProps, "open" | "variant" | "onClose" | "onClosed" | "onOpen" | "onOpened">;
        portal?: Omit<PortalProps, "children">;
        content?: Omit<TagProps<"div">, "children">;
    }
}

const Layer = ({ children, open, id, ...props }: LayerProps) => {
    let [{
        onClickOutside,
        placement,
        transition,
        zIndex,
        blur,
        blurMode,
        onOpen,
        onOpened,
        onClose,
        onClosed,
        slotProps
    }] = useInterface<any>("Layer", props, {})
    const _p: any = {}
    if (blur) _p.blur = blur
    if (blurMode) _p.blurMode = blurMode
    const p: any = useBreakpointProps(_p)

    blur = p.blur
    blurMode = p.blurMode

    const [closed, setClosed] = useState(!open)
    placement = placement || "bottom-left"
    const blurCss = blur ? useBlurCss(blur, blurMode) : {}

    useEffect(() => {
        if (closed && open) {
            setClosed(false)
        }
    }, [open])

    if (closed) return <></>
    let duration = slotProps?.transition?.duration || 300
    let delay = slotProps?.transition?.delay || 0

    return (
        <Portal {...slotProps?.portal}>
            <Transition
                duration={duration}
                delay={delay}
                easing="easeOut"
                variant={"fade"}
                open={open}
            >
                <Tag
                    baseClass="layer"
                    {...slotProps?.root}
                    id={id}
                    sxr={{
                        ...slotProps?.root?.sx,
                        position: "fixed",
                        zIndex: 1500 + (zIndex || 0),
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        ...blurCss
                    }}
                    onClick={(e: any) => {
                        if (!e.currentTarget.firstChild?.contains(e.target)) {
                            if (onClickOutside) {
                                onClickOutside()
                            }
                        }
                    }}
                >
                    <Transition
                        duration={duration}
                        delay={delay}
                        easing="easeOut"
                        variant={transition || "zoomOver"}
                        {...slotProps?.transition}
                        open={open}
                        onOpen={onOpen}
                        onOpened={onOpened}
                        onClose={onClose}
                        onClosed={() => {
                            setClosed(true)
                            onClosed && onClosed()
                        }}
                    >
                        {children}
                    </Transition>
                </Tag>
            </Transition>
        </Portal>
    )
}

export type LayerHandlerProps = Omit<LayerProps, "open" | "children">
const layers = new Map<string, { id: string, open: boolean; props?: LayerHandlerProps, content: ReactNode }>()

export const LayerHandler = () => {
    return Array.from(layers.values()).map((l, key) => {
        return (
            <Layer
                open={l.open}
                key={"layer-" + key}
                id={l.id}
                {...l.props}
                zIndex={layers.size}
                onClosed={() => {
                    layers.delete(l.id)
                    l?.props?.onClosed && l?.props?.onClosed()
                }}
            >{l.content}</Layer>
        )
    })
}


Renderar.create("LAYERS_RENDER", LayerHandler)

Layer.open = (id: string, content: ReactNode, props?: LayerHandlerProps) => {
    if (layers.has(id)) return
    layers.set(id, { id, props, content, open: true })
    Renderar.dispatch()
}

Layer.close = (id: string) => {
    const get = layers.get(id)
    if (get) {
        layers.set(id, { ...get, open: false })
        Renderar.dispatch()
    }
}



export default Layer