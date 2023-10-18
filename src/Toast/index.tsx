'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Tag, TagProps, UseTransitionsProps } from 'naxui-manager'
import { ReactElement } from "react";
import { createRoot } from 'react-dom/client'
import Transition from '../Transition'
import useUIVariant, { UseUIVariantColorTypes } from '../useUIVariant'
import IconButton from '../IconButton'
import CloseIcon from 'naxui-icons/round/Close'
import InfoIcon from 'naxui-icons/round/Info';
import WarningIcon from 'naxui-icons/round/Warning';
import SuccessIcon from 'naxui-icons/round/CheckCircle';
import ErrorIcon from 'naxui-icons/round/Cancel';

type ContentType = string | ReactElement | ((props: { open: boolean }) => any);
type PlacementType = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
export type ToastProps = Omit<TagProps<'span'>, "children" | "content" | "color"> & {
    id: string;
    content: ContentType;
    closeButton?: boolean;
    autoClose?: boolean;
    autoCloseDuration?: number;
    pauseOnHover?: boolean;
    placement?: PlacementType;
    transition?: "fade" | "fadeDown" | "fadeUp" | "fadeRight" | "fadeLeft" | "zoom" | "zoomOver" | "collapsVerticle" | "collapsHorizental"
    onOpen?: () => void;
    onClose?: () => void;
    transitionProps?: Omit<UseTransitionsProps, "onFinish" | "type" | "transition" | "in">;
    color?: UseUIVariantColorTypes;
    icon?: "info" | "warning" | "success" | "error" | ReactElement | false

    // private
    close?: Function
}


const state = new Map<string, ToastProps>()
let mainDispatch = () => { }

const Item = (item: ToastProps) => {
    const [open, setOpen] = useState(true)
    const [collapsIn, setCollapsIn] = useState(true)
    const [timer, setTimer] = useState<any>()

    let {
        id,
        content: Content,
        transition,
        placement,
        closeButton,
        autoClose,
        autoCloseDuration,
        pauseOnHover,
        onOpen,
        onClose,
        transitionProps,
        color: Color,
        icon,
        close: _close,
        ...rootProps
    } = item

    autoClose = autoClose ?? true
    pauseOnHover = pauseOnHover ?? true
    closeButton = closeButton ?? true

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

    useEffect(() => {
        if (autoClose) {
            setTimer(setTimeout(() => {
                setOpen(false)
            }, autoCloseDuration || 5000))
        }
    }, [])
    Color = Color || "paper"

    let { color, bgcolor }: any = useUIVariant("filled", Color)
    if (Color === 'paper') {
        color = "color.paper.text"
        bgcolor = "color.paper.light"
    }

    const icons = {
        "info": <InfoIcon color={Color === 'paper' ? "color.primary" : color} />,
        "warning": <WarningIcon color={Color === 'paper' ? "color.warning" : color} />,
        "success": <SuccessIcon color={Color === 'paper' ? "color.success" : color} />,
        "error": <ErrorIcon color={Color === 'paper' ? "color.error" : color} />
    }

    if (typeof icon === 'string' && icons[icon]) {
        icon = icons[icon]
    }


    return useMemo(() => {
        return (
            <Transition
                in={collapsIn}
                duration={collapsIn ? 0 : 400}
                type="collapsVerticle"
                onFinish={() => {
                    if (!open) {
                        state.delete(id)
                        mainDispatch()
                    }
                }}
            >
                <Tag {...rootProps} baseClass='toast' >
                    <Transition
                        easing="easeOut"
                        {...transitionProps}
                        in={open}
                        type={transition || transitions[placement || "top-right"] || "grow"}
                        onFinish={() => {
                            if (open) {
                                onOpen && onOpen()
                            } else {
                                setCollapsIn(false)
                                onClose && onClose()
                            }
                        }}
                    >
                        <Tag
                            baseClass="toast-content"
                            onMouseEnter={() => {
                                if (pauseOnHover && typeof timer === 'number') {
                                    clearInterval(timer)
                                    setTimer(undefined)
                                }
                            }}
                            onMouseLeave={() => {
                                if (pauseOnHover && autoClose) {
                                    setTimer(setTimeout(() => {
                                        setOpen(false)
                                    }, autoCloseDuration || 4000))
                                }
                            }}
                            mb={2}
                            p={1}
                            pl={!icon ? 2 : 0}
                            bgcolor={bgcolor}
                            radius={1}
                            minHeight={60}
                            transition="all .4s"
                            flexRow
                            shadow="0 1px 10px 0 rgba(0,0,0,.1), 0 2px 15px 0 rgba(0,0,0,.05)"
                            alignItems="center"
                            flexBox
                        >
                            {
                                icon && <Tag component='span' px={2} bgcolor={bgcolor} fontSize={40}>
                                    {
                                        icon
                                    }
                                </Tag>
                            }

                            <Tag flex={1} height="100%" >
                                {typeof Content === 'function' ? <Content open={open} /> : Content}
                            </Tag>
                            {closeButton && <IconButton
                                alignSelf="flex-start"
                                size={20}
                                onClick={() => {
                                    Toast.close(id)
                                }}
                            >
                                <CloseIcon color={color} fontSize="fontsize.text" />
                            </IconButton>}
                        </Tag>
                    </Transition>
                </Tag>
            </Transition>

        )
    }, [open, collapsIn, timer])
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
                Object.keys(formates).map((placement) => {
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
                        <Tag
                            flexBox
                            flexColumn
                            key={placement}
                            zIndex={1500}
                            position="fixed"
                            p={1}
                            width={350}
                            maxHeight="100%"
                            overflowY="auto"
                            overflowX="hidden"
                            {...placements[placement] || {}}
                            baseClass={`toast-container toast-${placement}`}
                        >
                            {items.map(item => <Item key={item.id} {...item} />)}
                        </Tag>
                    )
                })
            }
        </>
    )
}

const Toast = {
    open: (id: string, content: ContentType, props?: Omit<ToastProps, 'id' | 'container' | 'content'>) => {
        let { placement } = props || {}
        placement = placement || "bottom-right"
        let root_container: any = document.querySelector(`[data-toast-root]`)
        if (!root_container) {
            root_container = document.createElement("div")
            root_container.setAttribute("data-toast-root", "")
            document.body.append(root_container)
            const root = createRoot(root_container)
            root.render(<Main />)
        }
        if (!state.has(id)) {
            state.set(id, { id, content, ...props })
            mainDispatch()
        }
    },
    close: (id: string) => {
        const s = state.get(id)
        if (s && s.close) {
            s.close()
        }
    },
    closeAll: () => {
        state.forEach((_k, id) => {
            Toast.close(id)
        })
    }
}

export default Toast