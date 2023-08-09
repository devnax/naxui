'use client'
import React, { forwardRef, useEffect, useState } from 'react'
import { useTransitions, UseTransitionsProps } from 'naxui-manager';
import { getOrigin } from './getorigin';
import { placedMenu, PlacementTypes } from './placedMenu'

import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type MenuProps<T extends TagComponenntType = "div"> = TagProps<T> & UseTransitionsProps & {
    target?: HTMLElement;
    placement?: PlacementTypes;
    transition?: "fade" | "fadeDown" | "fadeUp" | "fadeRight" | "fadeLeft" | "zoom" | "zoomOver" | "collapsVerticle" | "collapsHorizental";
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
    let [animRef, cls] = useTransitions(transition || "zoom", !!target, {
        ease: ease || "ease",
        duration: duration || 300,
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

    const [menuSize, setMenuSize] = useState({
        height: 0,
        width: 0
    });

    useEffect(() => {
        if (animRef && animRef.current) {
            let h = (animRef as any).current.scrollHeight;
            let w = (animRef as any).current.scrollWidth
            if (!(h === menuSize.height && w === menuSize.width)) {
                setMenuSize({
                    height: h,
                    width: w,
                })
            }
        }
    }, [menuSize.height, menuSize.width])

    useEffect(() => {
        if (target && animRef?.current.clientWidth !== undefined) {
            let p = placedMenu({
                place: placement as any,
                menu: animRef.current,
                menuSize,
                targetBoundary: target.getBoundingClientRect()
            })
            // console.log(p);

            setPlaced(p)
        }
    }, [placement, target, menuSize.height, menuSize.width])

    useEffect(() => {
        ref && (ref.current = animRef.current)
        const detect = (e: MouseEvent) => {
            if (onClickOutside && !animRef?.current.contains(e.target)) {
                onClickOutside()
            }
        }
        onClickOutside && document.addEventListener("click", detect)
        return () => document.removeEventListener("click", detect)
    }, [])


    return (
        <Tag
            ref={animRef}
            baseClass='menu'
            zIndex={1500 + (zIndex || 0)}
            overflow="hidden"
            transformOrigin={getOrigin(placed) || "top"}
            bgcolor="background"
            minWidth={100}
            shadow={5}
            radius={1}
            {...rest}
            position="absolute"
            classNames={[cls, rest.className]}
        >
            {children}
        </Tag>
    )
}

const MenuMainView = forwardRef(_MenuMainView) as typeof _MenuMainView

const Menu = <T extends TagComponenntType = "div">(props: MenuProps<T>, ref?: React.Ref<any>) => {
    const { target, children, onClose, ...rest } = props
    const [destroy, setDestroy] = useState(!target)

    useEffect(() => {
        target && setDestroy(false)
    }, [target])

    if (destroy) return <></>

    return (
        <MenuMainView
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
    )

}

export default React.forwardRef(Menu) as typeof Menu