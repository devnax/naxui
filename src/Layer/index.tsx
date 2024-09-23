'use client'
import React, { useEffect, useRef, useState } from 'react'
import useBlurCss from '../useBlurCss'
import { Tag, TagProps, useInterface, UseTransitionsProps } from 'naxui-manager'
import { ReactElement } from "react";
import { createRoot } from 'react-dom/client'
import Transition, { TransitionProps } from '../Transition'

export type LayerContentType = ReactElement | ((props: { open: boolean }) => ReactElement)

export type LayerProps = {
    open: boolean;
    children: LayerContentType;
    blur?: number;
    bgImage?: string;
    zIndex?: number;
    transition?: TransitionProps['type'];

    onOpened?: () => void;
    onClosed?: () => void;
    onClickOutside?: () => void;
    slotProps?: {
        root?: Omit<TagProps<"div">, "children" | "content">;
        transition?: Omit<UseTransitionsProps, "onFinish" | "type">;
        content?: Omit<TagProps<"div">, "children" | "content">;
    }
}

const state = new Map<string, Function>()

const Layer = ({ open, children: Content, ...rest }: LayerProps) => {
    const contentRef = useRef<HTMLDivElement>()
    let { zIndex, blur, bgImage, transition, onOpened, onClosed, onClickOutside, slotProps } = useInterface("Layer", {}, rest)
    const blurCss = blur ? useBlurCss(blur) : {}
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
                    onOpened && onOpened()
                } else {
                    onClosed && onClosed()
                }
            }}
            type={transition || "fade"}
            {...slotProps?.transition}
        >
            <Tag
                bgcolor="red"
                {...transition?.root}
                position="fixed"
                top={0}
                left={0}
                height="100%"
                width="100%"
                baseClass='layer'
                zIndex={1000 + state.size + (zIndex || 0)}
                {...bgcss}
                {...(!bgImage ? blurCss : {})}
            >
                <Tag
                    {...slotProps?.content}
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


const LayerWithAction = ({ children: Content, id, ...props }: LayerProps & { id: string }) => {
    const [open, setOpen] = useState(true)
    const [closed, setClosed] = useState(false)

    useEffect(() => {
        state.set(id, () => setOpen(!open))
        return () => {
            state.delete(id)
        }
    }, [])

    if (closed) return <></>

    return (
        <Layer
            {...props}
            open={open}
            onClosed={() => {
                props.onClosed && props.onClosed()
                setClosed(true)
            }}
        >
            {Content}
        </Layer>
    )
}

Layer.open = (id: string, content: LayerContentType, props?: Omit<LayerProps, 'id' | 'children' | 'open'>) => {
    if (id && !state.has(id)) {
        const container = document.createElement("div")
        document.body.append(container)
        const root = createRoot(container)
        root.render(<LayerWithAction
            {...props}
            open={true}
            id={id}
            onClosed={() => {
                state.delete(id)
                props?.onClosed && props.onClosed()
                container.remove()
            }}
        >
            {content}
        </LayerWithAction>)
    }
    return id
}

Layer.close = (id: string) => {
    const dispatch = state.get(id)
    dispatch && dispatch()
    state.delete(id)
}

Layer.closeAll = () => state.forEach((_v, id) => Layer.close(id))
Layer.isOpen = (id: string) => state.has(id)

export default Layer