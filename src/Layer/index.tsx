'use client'
import React, { useEffect, useRef, useState } from 'react'
import useBlurCss from '../useBlurCss'
import { Tag, TagProps, useInterface } from 'naxui-manager'
import { ReactElement } from "react";
import { createRoot } from 'react-dom/client'
import Transition, { TransitionProps } from '../Transition'

const actionState = new Map<string, Function>()

export type LayerContentType = ReactElement | ((props: { open: boolean }) => ReactElement)

export type LayerProps = Omit<TagProps<"div">, "children" | "content"> & {
    open: boolean;
    children: LayerContentType;
    blur?: number;
    bgImage?: string;
    zIndex?: number;

    onOpened?: () => void;
    onClosed?: () => void;
    onClickOutside?: () => void;
    closeOutsideClick?: boolean;

    slotProps?: {
        transition?: Omit<TransitionProps, "onFinish" | "type">;
        content?: Omit<TagProps<"div">, "children" | "content">;
    }
}

const Layer = ({ open, children: Content, id, ...rest }: LayerProps) => {
    const contentRef = useRef<HTMLDivElement>()
    let { zIndex, blur, bgImage, transition, onOpened, onClosed, onClickOutside, closeOutsideClick, slotProps, ...rootProps } = useInterface("Layer", {}, rest)
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
            open={open}
            // easing="easeOut"
            onOpened={() => {
                onOpened && onOpened()
            }}
            onClosed={() => {
                onClosed && onClosed()
            }}
            variant={transition || "zoom"}
            {...slotProps?.transition}
        >
            <Tag
                {...rootProps}
                position="fixed"
                top={0}
                left={0}
                height="100%"
                width="100%"
                baseClass='layer'
                zIndex={1000 + actionState.size + (zIndex || 0)}
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
                        if (!e.currentTarget.firstChild?.contains(e.target)) {
                            if (onClickOutside && contentRef) {
                                onClickOutside()
                            }
                            if (closeOutsideClick && id) {
                                Layer.close(id)
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
        actionState.set(id, () => setOpen(!open))
        return () => {
            actionState.delete(id)
        }
    }, [])

    if (closed) return <></>

    return (
        <Layer
            {...props}
            id={id}
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
    if (id && !actionState.has(id)) {
        const container = document.createElement("div")
        document.body.append(container)
        const root = createRoot(container)
        root.render(<LayerWithAction
            {...props}
            open={true}
            id={id}
            onClosed={() => {
                actionState.delete(id)
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
    const dispatch = actionState.get(id)
    dispatch && dispatch()
    actionState.delete(id)
}

// Layer.closeAll = () => actionState.forEach((_v, id) => Layer.close(id))
Layer.isOpen = (id: string) => actionState.has(id)

export default Layer