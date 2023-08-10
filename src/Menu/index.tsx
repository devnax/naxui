'use client'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useTransitions, UseTransitionsProps, UseTransitionsVariantsTypes, useWindowResize } from 'naxui-manager';
import { getOrigin } from './getorigin';
import { placedMenu, PlacementTypes } from './placedMenu'
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import Portal from '../Portal'


export type MenuProps<T extends TagComponenntType = "div"> = TagProps<T> & UseTransitionsProps & {
    target?: HTMLElement;
    placement?: PlacementTypes;
    transition?: UseTransitionsVariantsTypes;
    zIndex?: number;
    onOpen?: () => void;
    onClose?: () => void;
    onClickOutside?: () => void;
}


const _MenuMainView = <T extends TagComponenntType = "div">(props: MenuProps<T>, ref: any) => {
    let {
        children,
        target,
        placement,
        transition,
        zIndex,
        onOpen,
        onClose,
        onClickOutside,

        duration,
        delay,
        ease,
        onStart,
        onFinish,
        ...rest
    } = props
    placement = placement || "left"
    const [placed, setPlaced] = useState<any>(placement)
    ref = ref || useRef()
    let [animRef, cls] = useTransitions(transition || "grow", !!target, {
        ease: ease || "ease",
        duration: duration || 200,
        delay,
        onStart,
        onFinish: () => {
            if (!target) {
                onClose && onClose()
            } else {
                onOpen && onOpen()
            }
            onFinish && onFinish()
        }
    })

    useEffect(() => {
        if (target && ref?.current.clientWidth !== undefined) {
            let p = placedMenu({
                place: placement as any,
                menu: ref.current,
                target
            })
            setPlaced(p)
        }
    }, [placement, target])

    useEffect(() => {
        ref && (ref.current = ref.current)
        const detect = (e: MouseEvent) => {
            if (onClickOutside && !ref?.current.contains(e.target)) {
                onClickOutside()
            }
        }
        onClickOutside && document.addEventListener("click", detect)
        return () => document.removeEventListener("click", detect)
    }, [])

    return (
        <Tag
            ref={ref}
            baseClass='menu-root'
            zIndex={1500 + (zIndex || 0)}
            minWidth={100}
            position="absolute"
        >
            <Tag
                overflow="hidden"
                baseClass='menu'
                bgcolor="background"
                shadow={5}
                radius={1}
                ref={animRef}
                transformOrigin={getOrigin(placed) || "top"}
                {...rest}
                classNames={[cls, rest?.className]}
            >
                {children}
            </Tag>
        </Tag>
    )
}

const MenuMainView = forwardRef(_MenuMainView) as typeof _MenuMainView


const Menu = <T extends TagComponenntType = "div">(props: MenuProps<T>, ref?: React.Ref<any>) => {
    const { target, children, onClose, ...rest } = props
    const [destroy, setDestroy] = useState(!target)
    const [key, setKey] = useState(0)

    useWindowResize(() => {
        setKey(Math.random())
    })

    useEffect(() => {
        target && setDestroy(false)
    }, [target])

    if (destroy) return <></>

    return (
        <Portal>
            <MenuMainView
                key={key}
                {...rest}
                target={target}
                ref={ref}
                onClose={() => {
                    setDestroy(true)
                    onClose && onClose()
                }}
            >
                {children}
            </MenuMainView>
        </Portal>
    )

}

export default React.forwardRef(Menu) as typeof Menu