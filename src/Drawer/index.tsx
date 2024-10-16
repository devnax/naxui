'use client'
import React, { ReactElement, ReactNode } from 'react';
import { Tag, TagProps } from 'naxui-manager';
import Layer, { LayerProps } from '../Layer';
import Transition from '../Transition';
import ClickOutside from '../ClickOutside';

export type DrawerChildrenType = ReactNode | ReactElement | string

export type DrawerProps = {
    children?: DrawerChildrenType;
    placement?: "left" | "right" | "bottom" | "top";
    open?: boolean;
    size?: number;
    onClickOutside?: () => void;
    layerProps?: Omit<LayerProps, 'id' | 'children' | 'open'>;
    rootProps?: TagProps<"div">
}

const MainView = ({ children, placement, open, size, onClickOutside, rootProps, ...rest }: DrawerProps) => {
    placement ||= 'left'
    let isSide = placement === 'left' || placement === 'right'
    let animType: any = "fadeRight"
    size ||= 300
    onClickOutside ||= () => { }

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
            baseClass='drawer-root'
            width="100%"
            height="100%"
            flexBox
            direction={isSide ? "row" : "column"}
            justifyContent={placement === 'left' || placement === 'top' ? "flex-start" : "flex-end"}
            {...rootProps}
        >
            <Transition
                in={open}
                type={animType}
                easing="easeInOut"
            >
                <Tag>
                    <ClickOutside onClickOutside={onClickOutside}>
                        <Tag
                            width={isSide ? size : "100%"}
                            height={isSide ? "100%" : size}
                            {...rest}
                            baseClass='drawer-content'
                            bgcolor="background.primary"
                            shadow={4}
                        >
                            {children}
                        </Tag>
                    </ClickOutside>
                </Tag>
            </Transition>
        </Tag>
    )
}

let drawerId = Math.random().toString()

const Drawer = ({ children, open, layerProps, ...rest }: DrawerProps) => {
    return (
        <Layer
            {...layerProps}
            open={open ?? true}
        >
            {
                ({ open: Open }) => {
                    return <MainView {...rest} open={Open}>{children}</MainView>
                }
            }
        </Layer>
    )
}

Drawer.open = (content: DrawerChildrenType, props?: Omit<DrawerProps, "children" | "open">) => {
    let { layerProps, ...rest } = props || {}
    Layer.open(drawerId, ({ open }) => {
        return (
            <MainView
                onClickOutside={() => Layer.close(drawerId)}
                {...rest}
                open={open}
            >{content}</MainView>
        )
    }, layerProps)
}

Drawer.close = () => {
    Layer.close(drawerId)
}

export default Drawer