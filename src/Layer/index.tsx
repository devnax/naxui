'use client'
import React, { useEffect, useState } from 'react'
import Box from '../Box'
import useBlurCss from '../useBlurCss'
import { UseTransitionsProps } from 'naxui-manager'
import { ReactElement } from "react";
import { createRoot } from 'react-dom/client'
import Transition from '../Transition'

export type LayerProps = Omit<UseTransitionsProps, "onFinished"> & {
    id: string;
    content: (props: { open: boolean }) => ReactElement;
    blur?: number;
    bgImage?: string;
    index?: number;
    animation?: "fade" | "fadeDown" | "fadeUp" | "fadeRight" | "fadeLeft" | "zoom" | "zoomOver" | "collapsVerticle" | "collapsHorizental"
    onOpen?: () => void;
    onClose?: () => void;
    container: HTMLDivElement
}


const state = new Map<string, Function>()


const View = ({ id, content: Content, index, blur, bgImage, animation, onOpen, onClose, container, ...rest }: LayerProps) => {
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
            onFinish={() => {
                if (open) {
                    onOpen && onOpen()
                } else {
                    onClose && onClose()
                    container.remove()
                    state.delete(id)
                }
            }}
            {...rest}
        >
            <Box
                position="fixed"
                top={0}
                left={0}
                height="100%"
                width="100%"
                zIndex={1000 + state.size + (index || 0)}
                {...bgcss}
                {...(!bgImage ? blurCss : {})}
            >
                <Box
                    {...(bgImage ? blurCss : {})}
                    height="100%"
                    width="100%"
                >
                    <Content open={open} />
                </Box>
            </Box>
        </Transition>
    )
}


const Layer = {
    open: (id: string, content: (props: { open: boolean }) => ReactElement, props: Omit<LayerProps, 'id' | 'container' | 'content'>) => {
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
    }
}

export default Layer