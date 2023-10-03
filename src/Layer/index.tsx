'use client'
import React, { useEffect, useRef, useState } from 'react'
import useBlurCss from '../useBlurCss'
import { Tag, TagProps, UseTransitionsProps } from 'naxui-manager'
import { ReactElement } from "react";
import { createRoot } from 'react-dom/client'
import Transition from '../Transition'


export type LayerContentType = ReactElement | ((props: { open: boolean }) => ReactElement)

export type LayerProps = {
    id: string;
    content: LayerContentType;
    blur?: number;
    bgImage?: string;
    zIndex?: number;
    transition?: "fade" | "fadeDown" | "fadeUp" | "fadeRight" | "fadeLeft" | "zoom" | "zoomOver" | "collapsVerticle" | "collapsHorizental"
    onOpen?: () => void;
    onClose?: () => void;
    onClickOutside?: () => void;
    transitionProps?: Omit<UseTransitionsProps, "onFinish" | "type">;
    contentProps?: Omit<TagProps<"div">, "children" | "content">;
    rootProps?: Omit<TagProps<"div">, "children" | "content">;
    container: HTMLDivElement
}


const state = new Map<string, Function>()


const View = ({ id, content: Content, zIndex, blur, bgImage, transition, onOpen, onClose, onClickOutside, container, transitionProps, rootProps, contentProps }: LayerProps) => {
    const [open, setOpen] = useState(true)
    const contentRef = useRef<HTMLDivElement>()
    const blurCss = useBlurCss(blur)
    useEffect(() => {
        state.set(id, () => setOpen(!open))
    }, [])

    let bgcss: any = {}
    if (bgImage) {
        bgcss = {
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
        }
    }

    return (
        <Transition
            in={open}
            easing="easeOut"
            onFinish={() => {
                if (open) {
                    onOpen && onOpen()
                } else {
                    onClose && onClose()
                    container.remove()
                    state.delete(id)
                }
            }}
            type={transition || "fade"}
            {...transitionProps}
        >
            <Tag
                {...rootProps}
                position="fixed"
                top={0}
                left={0}
                height="100%"
                width="100%"
                baseClass='layer-root'
                zIndex={1000 + state.size + (zIndex || 0)}
                bgcolor="rgba(0,0,0,.01)"
                {...bgcss}
                {...(!bgImage ? blurCss : {})}
            >
                <Tag
                    {...contentProps}
                    {...(bgImage ? blurCss : {})}
                    height="100%"
                    width="100%"
                    baseClass='layer-content'
                    onClick={(e: any) => {
                        if (onClickOutside && contentRef) {
                            if (!e.currentTarget.firstChild?.contains(e.target)) {
                                onClickOutside()
                            }
                        }
                    }}
                >
                    {typeof Content === "function" ? <Content open={open} /> : Content}
                </Tag>
            </Tag>
        </Transition>
    )
}


const Layer = {
    open: (id: string, content: LayerContentType, props?: Omit<LayerProps, 'id' | 'container' | 'content'>) => {
        if (!state.has(id)) {
            const container = document.createElement("div")
            document.body.append(container)
            const root = createRoot(container)
            root.render(<View {...props} id={id} container={container} content={content} />)
        }
    },
    close: (id: string) => {
        const dispatch = state.get(id)
        dispatch && dispatch()
    },
    closeAll: () => state.forEach((_v, id) => Layer.close(id)),
    isOpen: (id: string) => state.has(id)
}

export default Layer