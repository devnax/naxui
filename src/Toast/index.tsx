'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { UseTransitionsProps } from 'naxui-manager'
import { ReactElement } from "react";
import { createRoot } from 'react-dom/client'
import Transition from '../Transition'
import Stack from '../Stack'
import IconButton from '../IconButton'
import CloseIcon from 'naxui-icons/round/Close'


type PlacementType = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
export type ToastProps = Omit<UseTransitionsProps, "onFinish" | "type"> & {
    id: string;
    content: (props: { open: boolean }) => any;
    closeButton?: boolean;
    autoClose?: boolean;
    autoCloseDuration?: boolean;
    placement?: PlacementType;
    transition?: "fade" | "fadeDown" | "fadeUp" | "fadeRight" | "fadeLeft" | "zoom" | "zoomOver" | "collapsVerticle" | "collapsHorizental"
    onOpen?: () => void;
    onClose?: () => void;

    // private
    close?: Function
}


const state = new Map<string, ToastProps>()
let mainDispatch = () => { }

const Item = (item: ToastProps) => {
    const [open, setOpen] = useState(true)
    const { id, content: Content, transition, placement, onOpen, onClose } = item

    useEffect(() => {
        state.set(id, { ...item, close: () => setOpen(false) })
    }, [])

    const transitions: any = {
        "top-left": "fadeRight",
        "top-center": "fadeDown",
        "top-right": "fadeLeft",
        "bottom-left": "fadeRight",
        "bottom-center": "fadeUp",
        "bottom-right": "fadeLeft",
    }

    return (
        <Transition
            in={open}
            type={transition || transitions[placement || "bottom-right"] || "grow"}
            onFinish={() => {
                if (open) {
                    onOpen && onOpen()
                } else {
                    onClose && onClose()
                    state.delete(id)
                    mainDispatch()
                }
            }}
        >
            <Stack
                p={1}
                bgcolor="color.warning"
                radius={1}
                minHeight={60}
                flexRow
            >
                <Stack flex={1}>
                    <Content open={open} />
                </Stack>
                <IconButton size={30}
                    onClick={() => {
                        Toast.close(id)
                    }}
                >
                    <CloseIcon color="#fff" />
                </IconButton>
            </Stack>
        </Transition>
    )
}

const Main = () => {
    const [d, dispatch] = useState(0)

    useEffect(() => {
        mainDispatch = () => dispatch(Math.random())
    }, [])

    const formates: { [placement in PlacementType]: ToastProps } = useMemo(() => {
        let format: any = {}
        state.forEach((item) => {
            if (!format) format = {}
            let placement = item.placement || "bottom-right"
            if (!format[placement]) {
                format[placement] = []
            }
            format[placement].push(item)
        })
        return format
    }, [d])


    return (
        <>
            {
                Object.keys(formates).map((placement, idx: number) => {
                    const items = (formates as any)[placement] as ToastProps[]
                    if (!items || !items.length) return
                    const placements: any = {
                        "top-left": { top: 0, left: 0 },
                        "top-center": { top: 0, left: (window.innerWidth / 2) - 175 },
                        "top-right": { top: 0, right: 0 },
                        "bottom-left": { bottom: 0, left: 0 },
                        "bottom-center": { bottom: 0, left: (window.innerWidth / 2) - 175 },
                        "bottom-right": { bottom: 0, right: 0 },
                    }

                    return (
                        <Stack
                            key={placement + idx}
                            gap={16}
                            zIndex={1500}
                            position="fixed"
                            p={1}
                            width={350}
                            {...placements[placement] || {}}
                        >
                            {items.map(item => <Item key={item.id} {...item} />)}
                        </Stack>
                    )
                })
            }
        </>
    )
}

const Toast = {
    open: (id: string, content: (props: { open: boolean }) => ReactElement, props?: Omit<ToastProps, 'id' | 'container' | 'content'>) => {
        let { placement } = props || {}
        placement = placement || "bottom-right"

        state.set(id, { id, content, ...props })

        let root_container: any = document.querySelector(`[data-toast-root]`)
        if (!root_container) {
            root_container = document.createElement("div")
            root_container.setAttribute("data-toast-root", "")
            document.body.append(root_container)
            const root = createRoot(root_container)
            root.render(<Main />)
        }
        mainDispatch()
    },
    close: (id: string) => {
        const s = state.get(id)
        if (s && s.close) {
            s.close()
        }
    },
}

export default Toast