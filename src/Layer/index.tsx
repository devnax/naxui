'use client'
import React, { useEffect, useState } from 'react'
import useBlurCss from '../useBlurCss'
import { Tag, TagProps, UseTransitionsProps } from 'naxui-manager'
import { ReactElement } from "react";
import { createRoot } from 'react-dom/client'
import Transition from '../Transition'


export type LayerContentType = ReactElement | ((props: { open: boolean }) => ReactElement)

export type LayerProps = Omit<TagProps<"div">, "children" | "content"> & {
    id: string;
    content: LayerContentType;
    blur?: number;
    bgImage?: string;
    index?: number;
    transition?: "fade" | "fadeDown" | "fadeUp" | "fadeRight" | "fadeLeft" | "zoom" | "zoomOver" | "collapsVerticle" | "collapsHorizental"
    onOpen?: () => void;
    onClose?: () => void;
    transitionProps?: Omit<UseTransitionsProps, "onFinish" | "type">;
    container: HTMLDivElement
}


const state = new Map<string, Function>()


const View = ({ id, content: Content, index, blur, bgImage, transition, onOpen, onClose, container, transitionProps, ...rest }: LayerProps) => {
    const [open, setOpen] = useState(true)
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
                baseClass='layer-root'
                position="fixed"
                top={0}
                left={0}
                height="100%"
                width="100%"
                zIndex={1000 + state.size + (index || 0)}
                {...rest}
                {...bgcss}
                {...(!bgImage ? blurCss : {})}
            >
                <Tag
                    baseClass='layer-content'
                    {...(bgImage ? blurCss : {})}
                    height="100%"
                    width="100%"
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