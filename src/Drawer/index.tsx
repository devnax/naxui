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
    onClickOutside?: () => void;
    layerProps?: Omit<LayerProps, 'id' | 'children' | 'open'>;
    rootProps?: TagProps<"div">
}

const MainView = ({ children, placement, open, onClickOutside, rootProps, ...rest }: DrawerProps) => {
    placement ||= 'left'
    let isSide = placement === 'left' || placement === 'right'
    let animType: any = "fadeRight"
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
            {...rootProps}
            baseClass='drawer-root'
            width="100%"
            height="100%"
            flexBox
            direction={isSide ? "row" : "column"}
            justifyContent={placement === 'left' || placement === 'top' ? "flex-start" : "flex-end"}
        >
            <Transition
                in={open}
                type={animType}
                easing="easeInOut"
            >
                <Tag>
                    <ClickOutside onClickOutside={onClickOutside}>
                        <Tag
                            width={isSide ? 300 : "100%"}
                            height={isSide ? "100%" : 300}
                            {...rest}
                            baseClass='drawer-content'
                            bgcolor="color.paper.light"
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

let drawerId = "layer_drawer_id_kdfjnd8jdmfjf"

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
                onClickOutside={() => {
                    Layer.close(drawerId)
                }}
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