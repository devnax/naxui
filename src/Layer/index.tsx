'use client'
import React, { useEffect, useRef, useState } from 'react'
import useBlurCss from '../useBlurCss'
import { Tag, TagProps, UseTransitionsProps } from 'naxui-manager'
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
    onOpen?: () => void;
    onClose?: () => void;
    onClickOutside?: () => void;
    transitionProps?: Omit<UseTransitionsProps, "onFinish" | "type">;
    contentProps?: Omit<TagProps<"div">, "children" | "content">;
    rootProps?: Omit<TagProps<"div">, "children" | "content">;
}

const state = new Map<string, Function>()

const Layer = ({ open, children: Content, zIndex, blur, bgImage, transition, onOpen, onClose, onClickOutside, transitionProps, rootProps, contentProps }: LayerProps) => {
    const contentRef = useRef<HTMLDivElement>()
    const blurCss = useBlurCss(blur)
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


const LayerWithAction = ({ children: Content, id, ...props }: LayerProps & { id: string }) => {
    const [open, setOpen] = useState(true)
    useEffect(() => {
        state.set(id, () => setOpen(!open))
        return () => {
            state.delete(id)
        }
    }, [])

    return (
        <Layer {...props} open={open} >
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
            onClose={() => {
                container.remove()
                state.delete(id)
                props?.onClose && props.onClose()
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
}
Layer.closeAll = () => state.forEach((_v, id) => Layer.close(id))
Layer.isOpen = (id: string) => state.has(id)


export default Layer