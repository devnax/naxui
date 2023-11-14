'use client'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useTransitions, UseTransitionsProps, UseTransitionsVariantsTypes, useWindowResize } from 'naxui-manager';
import { getOrigin } from './getOrigin';
import { placedMenu, PlacementTypes } from './placedMenu'
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import Portal from '../Portal'
import { createRoot } from 'react-dom/client';


export type MenuProps<T extends TagComponenntType = "div"> = Omit<TagProps<T>, "target"> & {
    target?: HTMLElement;
    placement?: PlacementTypes;
    transition?: UseTransitionsVariantsTypes;
    transitionProps?: UseTransitionsProps;
    zIndex?: number;
    onOpen?: () => void;
    onClose?: () => void;
    onClickOutside?: () => void;
    menuRef?: any;
}


const MenuMainView = <T extends TagComponenntType = "div">(props: MenuProps<T>) => {
    let {
        children,
        target,
        placement,
        transition,
        zIndex,
        onOpen,
        onClose,
        onClickOutside,
        transitionProps,
        menuRef,
        ...rest
    } = props
    let {
        duration,
        delay,
        ease,
        onStart,
        onFinish
    } = transitionProps || {}


    placement = placement || "left"
    const [placed, setPlaced] = useState<any>(placement)

    let ref: any = useRef()
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
        props.menuRef && (props.menuRef.current = ref?.current)
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
            position="absolute"
        >
            <Tag
                overflow="hidden"
                baseClass='menu'
                bgcolor="color.paper.light"
                shadow={5}
                radius={1}
                ref={animRef}
                transformOrigin={getOrigin(placed) || "top"}
                {...rest}
                classNames={[cls, rest?.className]}
            >
                {children}
            </Tag>
        </Tag >
    )
}



const Menu = <T extends TagComponenntType = "div">(props: MenuProps<T>) => {
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
        >
            {Content}
        </Menu>
    )
}

Menu.open = (target: MenuProps['target'], content: ReactElement, props?: Omit<MenuProps, "target"> & { closeClickOutside?: boolean }) => {
    if (target) {
        const container = document.createElement("div")
        document.body.append(container)
        const root = createRoot(container)

        root.render(<MenuWithAction
            {...props}
            onClickOutside={() => {
                if (props?.closeClickOutside !== false || typeof props?.onClickOutside !== 'function') {
                    Menu.close()
                } else if (typeof props?.onClickOutside === 'function') {
                    (props as any).onClickOutside()
                }
            }}
            target={target}
        >
            {content}
        </MenuWithAction>)
    }
}

Menu.close = () => state.forEach(m => m())

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
        transitionProps: {
            duration: 150,
            ...props?.transitionProps
        }
    })
}
export default Menu