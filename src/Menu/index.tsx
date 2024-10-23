'use client'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useTransition, UseTransitionProps, useWindowResize } from 'naxui-manager';
import { getOrigin } from './getOrigin';
import { placedMenu, PlacementTypes } from './placedMenu'
import { Tag, TagProps, TagComponentType } from 'naxui-manager';
import Portal, { PortalProps } from '../Portal'
import { createRoot } from 'react-dom/client';


export type MenuProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "target"> & {
    target?: HTMLElement;
    placement?: PlacementTypes;
    zIndex?: number;
    onOpen?: () => void;
    onClose?: () => void;
    onClickOutside?: () => void;
    menuRef?: any;
    slotProps?: {
        transition?: UseTransitionProps;
        portal?: Omit<PortalProps, "children">;
    }
}

const MenuView = <T extends TagComponentType = "div">(props: MenuProps<T>) => {
    let {
        children,
        target,
        placement,
        transition,
        zIndex,
        onOpen,
        onClose,
        onClickOutside,
        slotProps,
        menuRef,
        ...rest
    } = props
    let {
        duration,
        delay,
        ease,
        onStart,
        onFinish
    } = slotProps?.transition || {} as any

    placement = placement || "left"
    const [placed, setPlaced] = useState<any>(placement)

    let ref: any = useRef()
    let { classname } = useTransition(!!target, {
        variant: "grow",
        ease: ease || "ease",
        duration: duration || 200,
        delay,
        onStart,
        onFinish,
        onClosed: () => {
            onClose && onClose()
        },
        onOpen
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
        props.menuRef && (props.menuRef.current = ref?.current)
        const detect = (e: any) => {
            let isClickOutside = !(ref?.current.contains(e.target) || target?.contains(e.target))
            if (onClickOutside && isClickOutside) {
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
            position="fixed"
        >
            <Tag
                overflow="hidden"
                baseClass='menu-content'
                bgcolor="background.primary"
                shadow={5}
                radius={1}
                transformOrigin={getOrigin(placed) || "top"}
                {...rest}
                classNames={[classname]}
            >
                {children}
            </Tag>
        </Tag >
    )
}

const Menu = <T extends TagComponentType = "div">(props: MenuProps<T>) => {
    const { target, children, onClose, slotProps, ...rest } = props
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
        <Portal {...slotProps?.portal}>
            <MenuView
                key={key}
                {...rest}
                target={target}
                onClose={() => {
                    setDestroy(true)
                    onClose && onClose()
                }}
            >
                {children}
            </MenuView>
        </Portal>
    )

}


const state = new Map<any, Function>()

const MenuWithAction = ({ children: Content, id, target, ...props }: MenuProps) => {
    const [open, setOpen] = useState(true)
    useEffect(() => {
        state.set(target, () => setOpen(!open))
        return () => {
            state.delete(target)
        }
    }, [])

    return (
        <Menu
            placement='bottom'
            {...props}
            target={open ? target : undefined}
            onClose={() => {
                state.delete(target)
                props.onClose && props.onClose()
            }}
        >
            {Content}
        </Menu>
    )
}

Menu.open = (target: MenuProps['target'], content: ReactElement, props?: Omit<MenuProps, "target"> & { closeClickOutside?: boolean }) => {
    if (target) {
        if (state.has(target)) return
        const container = document.createElement("div")
        document.body.append(container)
        const root = createRoot(container)
        const { closeClickOutside, ...rest } = props || {}

        root.render(<MenuWithAction
            {...rest}
            onClickOutside={() => {
                if (closeClickOutside !== false || typeof rest?.onClickOutside !== 'function') {
                    Menu.close()
                } else if (typeof rest?.onClickOutside === 'function') {
                    (rest as any).onClickOutside()
                }
            }}
            onClose={() => {
                props?.onClose && props.onClose()
                container.remove()
            }}
            target={target}
        >
            {content}
        </MenuWithAction>)
    }
}

Menu.close = () => state.forEach(m => m())
Menu.isOpen = (target?: MenuProps['target']) => (target ? state.has(target) : state.size)

Menu.openContextMenu = (event: React.MouseEvent<any, MouseEvent>, content: ReactElement, props?: Omit<MenuProps, "target">) => {
    Menu.close()
    const id = "ctx-menu"
    let target = document.getElementById(id);
    if (!target) {
        target = document.createElement('div')
        target.id = id
        target.style.position = "fixed"
        target.style.zIndex = "9999999999999"
        document.body.append(target)
    }
    target.style.left = `${event.pageX}px`;
    target.style.top = `${event.pageY}px`;

    Menu.open(target, content, {
        ...props,
        closeClickOutside: true,
        placement: "bottom-left",
        // transitionProps: {
        //     duration: 150,
        //     ...props?.transitionProps
        // }
    })
}
export default Menu