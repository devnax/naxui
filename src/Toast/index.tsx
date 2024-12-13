'use client'
import React from 'react'
import { Tag, useColorTemplateColors, useColorTemplateType, useBreakpointPropsType } from 'naxui-manager'
import { ReactElement } from "react";
import Transition from '../Transition'
import Renderar from '../ThemeProvider/RenderRoot';
import Alert, { AlertProps } from '../Alert';
import Scrollbar from '../Scrollbar';


type PlacementType = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

export type ToastProps = {
    title?: useBreakpointPropsType<string | ReactElement>;
    content?: AlertProps['children'];
    variant?: useBreakpointPropsType<useColorTemplateType>;
    color?: useBreakpointPropsType<useColorTemplateColors>;
    icon?: useBreakpointPropsType<"info" | "warning" | "success" | "error" | false | ReactElement>;
    placement?: PlacementType;
    closeable?: useBreakpointPropsType<boolean>;
}

type StateValue = { open: boolean, id: string, timer?: NodeJS.Timeout, props: ToastProps }
const State = new Map<PlacementType, StateValue[]>()


let updateState = (placement: PlacementType, id: string, callback: (item: StateValue) => StateValue) => {
    const items = State.get(placement)
    if (items) {
        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            if (item.id === id) {
                items[i] = callback(item)
                State.set(placement, items)
                Renderar.dispatch()
                break;
            }
        }
    }
}

const ToastContainer = ({ placement }: { placement: PlacementType }) => {
    const items = State.get(placement)
    if (!items || !items?.length) return <></>

    let sxr: any = {}
    let transition: any = ""
    switch (placement) {
        case "top-left":
            sxr = {
                top: 0,
                left: 0
            }
            transition = "fadeRight"
            break;
        case "top-right":
            sxr = {
                top: 0,
                right: 0
            }
            transition = "fadeLeft"
            break;
        case "top-center":
            sxr = {
                top: 0,
                left: "50%",
                transform: "translateX(-50%)"
            }
            transition = "fadeDown"
            break;
        case "bottom-right":
            sxr = {
                bottom: 0,
                right: 0
            }
            transition = "fadeLeft"
            break;
        case "bottom-left":
            sxr = {
                bottom: 0,
                left: 0
            }
            transition = "fadeRight"
            break;
        case "bottom-center":
            sxr = {
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)"
            }
            transition = "fadeUp"
            break;
    }
    return (
        <Tag
            sxr={{
                position: "fixed",
                zIndex: 99999999,
                display: "flex",
                gap: 2,
                flexDirection: "column",
                maxHeight: "100%",
                width: 320,
                ...sxr
            }}
        >
            <Scrollbar
                style={{
                    padding: 8
                }}
            >
                {
                    items.map(({ open, id, props }) => {
                        let { content, closeable, ...rest } = props
                        closeable ??= true
                        return (
                            <Transition
                                key={id}
                                open={open}
                                variant={transition}
                                onClosed={() => {
                                    const items = State.get(placement)
                                    if (items) {
                                        for (let i = 0; i < items.length; i++) {
                                            let item = items[i]
                                            if (item.id === id) {
                                                items.splice(i, 1)
                                                State.set(placement, items)
                                                Renderar.dispatch()
                                                break;
                                            }
                                        }
                                    }
                                }}
                                onOpened={() => {
                                    let timer = setTimeout(() => {
                                        updateState(placement, id, (_item) => {
                                            _item.open = false
                                            return _item
                                        })
                                    }, 6000)
                                    updateState(placement, id, (_item) => {
                                        _item.timer = timer
                                        return _item
                                    })
                                }}
                            >
                                <Alert
                                    shadow={2}
                                    variant="fill"
                                    color="brand"
                                    {...rest as any}
                                    mode="item"
                                    mb={1.5}
                                    onMouseEnter={() => {
                                        updateState(placement, id, (_item) => {
                                            clearTimeout(_item.timer)
                                            return _item
                                        })
                                    }}
                                    onMouseLeave={() => {
                                        let timer = setTimeout(() => {
                                            updateState(placement, id, (_item) => {
                                                _item.open = false
                                                return _item
                                            })
                                        }, 6000)
                                        updateState(placement, id, (_item) => {
                                            _item.timer = timer
                                            return _item
                                        })
                                    }}
                                    onClose={closeable ? () => {
                                        updateState(placement, id, (_item) => {
                                            _item.open = false
                                            clearTimeout(_item.timer)
                                            return _item
                                        })
                                    } : undefined}
                                >{content}</Alert>
                            </Transition>
                        )
                    })
                }
            </Scrollbar>
        </Tag>
    )
}
const uid = (p: string) => {
    const id = Math.random().toString(32).substring(2, 5)
    return `TOAST_CONTAINER_${p}_${id}`.toUpperCase()
}
Renderar.create(uid("TOP_LEFT"), () => <ToastContainer placement='top-left' />)
Renderar.create(uid("TOP_RIGHT"), () => <ToastContainer placement='top-right' />)
Renderar.create(uid("TOP_CENTER"), () => <ToastContainer placement='top-center' />)
Renderar.create(uid("BOTTOM_LEFT"), () => <ToastContainer placement='bottom-left' />)
Renderar.create(uid("BOTTOM_RIGHT"), () => <ToastContainer placement='bottom-right' />)
Renderar.create(uid("BOTTOM_CENTER"), () => <ToastContainer placement='bottom-center' />)

const Toast = {
    open: (props: ToastProps) => {
        let { placement } = props || {}
        placement ??= "bottom-right"
        let prev = State.get(placement) || []
        prev.push({
            open: true,
            id: Math.random().toString(),
            props
        })
        State.set(placement, prev)
        Renderar.dispatch()
    }
}

export default Toast