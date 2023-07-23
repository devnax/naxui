'use client'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Stack, { StackProps } from '../Stack'
import Animate, { AnimationType, AnimateBoxProps } from '../AnimateBox';
import { AnimatePresence } from 'framer-motion'

export type MenuPlacementTypes = "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right" | "right" | "right-top" | "right-bottom" | "left" | "left-top" | "left-bottom"


export type MenuProps = StackProps & {
    target?: HTMLElement;
    placement?: MenuPlacementTypes;
    transition?: AnimationType;
    animateProps?: Omit<AnimateBoxProps, "children">;
    zIndex?: number;
    onOpen?: () => void;
    onClose?: () => void;
}


const placements = [
    "top",
    "top-left",
    "top-right",
    "bottom",
    "bottom-left",
    "bottom-right",
    "right",
    "right-top",
    "right-bottom",
    "left",
    "left-top",
    "left-bottom"
]


type PlacementSetterCallbackProps = {
    menu: HTMLElement;
    boundary: DOMRect
}


const problem_ditector = (menu: HTMLElement): string | void => {
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight

    const { left, top, width, height } = menu.getBoundingClientRect()

    if (left + width > winWidth) {
        return 'right'
    } else if (left < 0) {
        return 'left'
    } else if (top + height > winHeight) {
        return 'bottom'
    } else if (top < 0) {
        return 'top'
    }

}

const placement_setter: { [key in MenuPlacementTypes]: (arg: PlacementSetterCallbackProps) => MenuPlacementTypes } = {
    "top": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        const width = menu.clientWidth
        const height = menu.clientHeight
        menu.style.top = `${boundary.top - height}px`
        menu.style.left = `${(boundary.left + (boundary.width / 2)) - (width / 2)}px`
        switch (problem_ditector(menu)) {
            case 'left':
                return placement_setter["top-left"]({
                    menu,
                    boundary
                })
            case 'right':
                return placement_setter["top-right"]({
                    menu,
                    boundary
                })
            case 'top':
                return placement_setter["bottom"]({
                    menu,
                    boundary
                })
        }
        return "top"
    },
    "top-left": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        const height = menu.clientHeight
        menu.style.top = `${boundary.top - height}px`
        menu.style.left = `${boundary.left}px`
        switch (problem_ditector(menu)) {
            case 'top':
                return placement_setter["bottom"]({
                    menu,
                    boundary
                })
            case 'right':
                return placement_setter["top-right"]({
                    menu,
                    boundary
                })
        }
        return "top-left"
    },
    "top-right": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        const width = menu.clientWidth
        const height = menu.clientHeight
        menu.style.top = `${boundary.top - height}px`
        menu.style.left = `${boundary.right - width}px`
        switch (problem_ditector(menu)) {
            case 'top':
                return placement_setter["bottom"]({
                    menu,
                    boundary
                })
            case 'left':
                return placement_setter["top-left"]({
                    menu,
                    boundary
                })
        }
        return "top-right"
    },
    "bottom": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        const width = menu.clientWidth
        menu.style.top = `${boundary.bottom}px`
        menu.style.left = `${(boundary.left + (boundary.width / 2)) - (width / 2)}px`
        switch (problem_ditector(menu)) {
            case 'bottom':
                return placement_setter["top"]({
                    menu,
                    boundary
                })
            case 'left':
                return placement_setter["bottom-left"]({
                    menu,
                    boundary
                })
            case 'right':
                return placement_setter["bottom-right"]({
                    menu,
                    boundary
                })
        }
        return "bottom"
    },
    "bottom-left": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        menu.style.top = `${boundary.bottom}px`
        menu.style.left = `${boundary.left}px`
        switch (problem_ditector(menu)) {
            case 'bottom':
                return placement_setter["top"]({
                    menu,
                    boundary
                })
            case 'right':
                return placement_setter["bottom-right"]({
                    menu,
                    boundary
                })
        }
        return "bottom-left"
    },
    "bottom-right": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        const width = menu.clientWidth
        menu.style.top = `${boundary.bottom}px`
        menu.style.left = `${boundary.right - width}px`
        switch (problem_ditector(menu)) {
            case 'bottom':
                return placement_setter["top"]({
                    menu,
                    boundary
                })
            case 'left':
                return placement_setter["bottom-left"]({
                    menu,
                    boundary
                })
        }
        return "bottom-right"
    },
    "right": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        const height = menu.clientHeight

        menu.style.left = `${boundary.right}px`
        menu.style.top = `${(boundary.top + (boundary.height / 2)) - (height / 2)}px`


        switch (problem_ditector(menu)) {
            case 'top':
                return placement_setter["right-top"]({
                    menu,
                    boundary
                })
            case 'bottom':
                return placement_setter["right-bottom"]({
                    menu,
                    boundary
                })
            case 'right':
                return placement_setter["bottom-right"]({
                    menu,
                    boundary
                })
        }
        return "right"
    },
    "right-top": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        menu.style.top = `${boundary.top}px`
        menu.style.left = `${boundary.right}px`
        switch (problem_ditector(menu)) {
            case 'bottom':
                return placement_setter["right-bottom"]({
                    menu,
                    boundary
                })
            case 'right':
                return placement_setter["bottom-right"]({
                    menu,
                    boundary
                })
        }
        return "right-top"
    },
    "right-bottom": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        const height = menu.clientHeight
        menu.style.top = `${boundary.bottom - height}px`
        menu.style.left = `${boundary.right}px`
        switch (problem_ditector(menu)) {
            case 'top':
                return placement_setter["right-top"]({
                    menu,
                    boundary
                })
            case 'right':
                return placement_setter["bottom-right"]({
                    menu,
                    boundary
                })
        }
        return "right-bottom"
    },
    "left": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        const width = menu.clientWidth
        const height = menu.clientHeight

        menu.style.left = `${boundary.left - width}px`
        menu.style.top = `${(boundary.top + (boundary.height / 2)) - (height / 2)}px`


        switch (problem_ditector(menu)) {
            case 'top':
                return placement_setter["left-top"]({
                    menu,
                    boundary
                })
            case 'bottom':
                return placement_setter["left-bottom"]({
                    menu,
                    boundary
                })
            case 'left':
                return placement_setter["bottom-left"]({
                    menu,
                    boundary
                })
        }
        return "left"
    },
    "left-top": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        const width = menu.clientWidth
        menu.style.top = `${boundary.top}px`
        menu.style.left = `${boundary.left - width}px`
        switch (problem_ditector(menu)) {
            case 'bottom':
                return placement_setter["left-bottom"]({
                    menu,
                    boundary
                })
            case 'left':
                return placement_setter["bottom-left"]({
                    menu,
                    boundary
                })
        }
        return "left-top"
    },
    "left-bottom": ({ menu, boundary }: PlacementSetterCallbackProps) => {
        const height = menu.clientHeight
        const width = menu.clientWidth
        menu.style.top = `${boundary.bottom - height}px`
        menu.style.left = `${boundary.left - width}px`
        switch (problem_ditector(menu)) {
            case 'top':
                return placement_setter["left-top"]({
                    menu,
                    boundary
                })
            case 'left':
                return placement_setter["bottom-left"]({
                    menu,
                    boundary
                })
        }
        return "left-bottom"
    },
}


const _MenuMainView = ({ children, target, boundary, placement, transition, zIndex, onOpen, onClose, animateProps, ...rest }: MenuProps & { boundary: DOMRect }, ref: any) => {
    const _menuRef = useRef<any>()
    ref = ref || _menuRef
    const [d, dispatch] = useState(0)
    const [placed, setPlaced] = useState(placement || "bottom")
    const _placement: MenuPlacementTypes = (placements.includes(placement as any) ? placement : "bottom") as MenuPlacementTypes

    useEffect(() => {
        dispatch(Math.random())
    }, [target])

    useEffect(() => {
        if (ref.current && ref.current.clientWidth) {
            const _placed = placement_setter[_placement]({
                menu: ref.current,
                boundary
            })
            setPlaced(_placed)

        }

    }, [_placement, boundary, d, ref])

    useEffect(() => {
        (placed && onOpen) && onOpen()
        return () => onClose && onClose()
    }, [onClose, onOpen, placed])

    let _origin: any = "top"
    switch (placed) {
        case "bottom":
            _origin = "top"
            break;
        case "bottom-left":
            _origin = "top left"
            break;
        case "bottom-right":
            _origin = "top right"
            break;
        case "top":
            _origin = "bottom"
            break;
        case "top-left":
            _origin = "bottom left"
            break;
        case "top-right":
            _origin = "bottom right"
            break;
        case "right":
            _origin = "left"
            break;
        case "right-bottom":
            _origin = "bottom left"
            break;
        case "right-top":
            _origin = "top left"
            break;
        case "left":
            _origin = "right"
            break;
        case "left-bottom":
            _origin = "bottom right"
            break;
        case "left-top":
            _origin = "top right"
            break;
    }

    return (
        <Stack
            baseClass='menu'
            position="fixed"
            ref={ref}
            zIndex={zIndex || 1000}
        >
            {placed && <Animate
                {...animateProps}
                type={transition || "zoom"}
                transition={{ ease: 'easeInOut', duration: 0.2 }}
                style={{
                    transformOrigin: _origin,
                    ...(animateProps?.style || {})
                }}
                step={5}
            >
                <Stack
                    baseClass='menu-box'
                    bgcolor="background"
                    overflow="hidden"
                    shadow={4}
                    radius={1}
                    {...rest}
                >
                    {children}
                </Stack>
            </Animate>}
        </Stack>
    )
}

const MenuMainView = forwardRef(_MenuMainView) as typeof _MenuMainView

const Menu = (props: MenuProps, ref?: React.Ref<any>) => {
    const { target } = props

    let boundary: any = null;
    let key = Math.random()
    if (target) {
        boundary = target.getBoundingClientRect()
        key = boundary.x;
        key += boundary.y;
        key += boundary.width;
        key += boundary.height;
    }

    return (
        <AnimatePresence>
            {
                boundary && <MenuMainView ref={ref} {...props} key={key} boundary={boundary} />
            }
        </AnimatePresence >

    )
}

export default React.forwardRef(Menu) as typeof Menu