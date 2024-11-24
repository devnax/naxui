'use client'
import React, { ReactElement, ReactNode } from 'react';
import { Tag, TagProps } from 'naxui-manager';
import Layer, { LayerProps } from '../Layer';
import Transition from '../Transition';
import ClickOutside from '../ClickOutside';

export type DrawerChildrenType = ReactNode | ReactElement | string

export type DrawerProps = Omit<TagProps, "children" | "size"> & {
    children?: DrawerChildrenType;
    placement?: "left" | "right" | "bottom" | "top";
    open?: boolean;
    size?: number | "small" | "medium" | "large";
    onClickOutside?: () => void;
    slotProps?: {
        root?: TagProps<"div">;
        layer?: Omit<LayerProps, 'id' | 'children' | 'open' | 'transition'>;
    }
}

const MainView = ({ children, placement, open, size, slotProps, onClickOutside, ...rest }: DrawerProps) => {
    placement ??= 'left'
    let isSide = placement === 'left' || placement === 'right'
    let animType: any = "fadeRight"
    size ??= "medium"

    let sizes: any = {
        small: 200,
        medium: 300,
        large: 400
    }

    let _size = sizes[size] || size

    switch (placement) {
        case "right":
            animType = 'fadeLeft'
            break;
        case "top":
            animType = 'fadeDown'
            break;
        case "bottom":
            animType = 'fadeUp'
            break;
    }

    return (
        <Tag
            {...slotProps?.root}
            sxr={{
                baseClass: 'drawer',
                width: "100%",
                height: "100%",
                display: "flex",
                direction: isSide ? "row" : "column",
                justifyContent: placement === 'left' || placement === 'top' ? "flex-start" : "flex-end"
            }}
        >
            <Transition
                open={open || false}
                variant={animType}
            >
                <ClickOutside onClickOutside={onClickOutside || (() => { })}>
                    <Tag
                        {...rest}
                        sxr={{
                            width: isSide ? _size : "100%",
                            height: isSide ? "100%" : _size,
                            bgcolor: "background.primary",
                            shadow: 10
                        }}
                        baseClass='drawer-content'
                    >
                        {children}
                    </Tag>
                </ClickOutside>
            </Transition>
        </Tag>
    )
}

let drawerId = "_" + Math.random().toString(32).substring(2)

const Drawer = ({ children, open, ...rest }: DrawerProps) => {
    return (
        <Layer
            {...rest?.slotProps?.layer}
            open={open ?? true}
            transition="fade"
        >
            <MainView {...rest} open={true}>{children}</MainView>
        </Layer>
    )
}

Drawer.open = (content: DrawerChildrenType, props?: Omit<DrawerProps, "children" | "open">) => {
    let { placement, slotProps } = props || {}
    placement ??= 'left'
    let animType: any = "fadeRight"

    switch (placement) {
        case "right":
            animType = 'fadeLeft'
            break;
        case "top":
            animType = 'fadeDown'
            break;
        case "bottom":
            animType = 'fadeUp'
            break;
    }

    Layer.open(drawerId, <MainView
        onClickOutside={() => Layer.close(drawerId)}
        {...props}
        open={true}
    >{content}</MainView>, {
        ...slotProps?.layer,
        transition: animType
    })
}

Drawer.close = () => {
    Layer.close(drawerId)
}

export default Drawer