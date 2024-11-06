import React, { ReactNode, useEffect, useId, useState } from 'react'
import { Tag, TagProps, useInterface, UseTransitionProps } from "naxui-manager"
import { placedMenu, PlacementTypes } from "./placedMenu";
import Portal, { PortalProps } from "../Portal";
import Transition from '../Transition';
import { getOrigin } from './getOrigin';
import ClickOutside from '../ClickOutside';

export type MenuProps = {
    children?: ReactNode;
    target?: HTMLElement;
    placement?: PlacementTypes;
    zIndex?: number;
    onClickOutside?: () => void;
    slotProps?: {
        transition?: Omit<UseTransitionProps, "open">;
        portal?: Omit<PortalProps, "children">;
        content?: Omit<TagProps<"div">, "children">;
    }
}

const Menu = ({ children, target, ...props }: MenuProps) => {
    let [{ onClickOutside, placement, zIndex, slotProps }] = useInterface<any>("Menu", props, {})
    const isOpen = Boolean(target)
    const [closed, setClosed] = useState(!isOpen)
    let id = "menu-" + useId().replaceAll(":", "")
    const [placed, setPlaced] = useState<any>(placement)
    placement = placement || "bottom-left"

    useEffect(() => {
        if (closed && isOpen) {
            setClosed(false)
        }
    }, [isOpen])

    useEffect(() => {
        if (!closed) {
            setTimeout(() => {
                const ele = document.getElementById(id)
                if (target && ele) {
                    let p = placedMenu({
                        place: placement as any,
                        menu: ele,
                        target
                    })
                    setPlaced(p)
                }
            }, 1);
        }
    }, [closed])

    if (closed) return <></>

    return (
        <Portal {...slotProps?.portal}>
            <ClickOutside
                baseClass="menu"
                id={id}
                sxr={{
                    position: "fixed",
                    zIndex: 1500 + (zIndex || 0)
                }}
                onClickOutside={() => {
                    onClickOutside && onClickOutside()
                }}
            >
                <Transition
                    duration={200}
                    easing="easeInOut"
                    variant="grow"
                    {...slotProps?.transition}
                    open={isOpen}
                    onClosed={() => {
                        setClosed(true)
                        slotProps?.transition?.onClosed && slotProps?.transition?.onClosed()
                    }}
                >
                    <Tag
                        baseClass='menu-content'
                        {...slotProps?.content}
                        sxr={{
                            overflow: "hidden",
                            bgcolor: "background.primary",
                            shadow: 5,
                            radius: 1,
                            transformOrigin: getOrigin(placed) || "top",
                            ...slotProps?.content?.sx
                        }}
                    >
                        {children}
                    </Tag>
                </Transition>
            </ClickOutside>
        </Portal>
    )
}

export default Menu