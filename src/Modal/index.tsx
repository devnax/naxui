'use client'
import React from 'react';
import { Tag, alpha, getTheme, TagProps } from 'naxui-manager';
import Layer, { LayerContentType, LayerProps } from '../Layer';
import Transition from '../Transition';
import { IconButtonProps } from '../IconButton';

export type ModalContentType = LayerContentType
export type ModalPropsType = Omit<TagProps<"div">, 'children'> & {
    closeButton?: boolean;
    closeButtonProps?: IconButtonProps;
    transitionProps?: LayerProps['transitionProps'];
    bgImage?: string;
    blur?: number;
    index?: number;
    maxWidth?: number | "xs" | "sm" | "md" | "lg" | "xl" | "full"
    onOpen?: () => void;
    onClose?: () => void;
}

const Modal = {
    open: (id: string, content: ModalContentType, props?: ModalPropsType) => {
        let Content = content
        Layer.open(id, ({ open }) => {
            const theme = getTheme()
            return (
                <Tag
                    baseClass='modal'
                    width="100%"
                    height="100%"
                    flexBox
                    justifyContent="center"
                    alignItems="center"
                >
                    <Transition
                        in={open}
                        // easing="easeOut"
                        type="fadeDown"
                    >
                        <Tag
                            baseClass='modal-content'
                            p={2}
                            radius={2}
                            shadow={5}
                            maxWidth={theme.breakpoints.sm}
                            width="100%"
                            bgcolor="color.common"
                            onClick={() => Layer.close(id)}
                        >
                            {typeof Content === "function" ? <Content open={open} /> : Content}
                        </Tag>
                    </Transition>
                </Tag>
            )
        }, {
            bgcolor: alpha("#000000", .3),
        })
    },
    close: (id: string) => Layer.close(id),
    isOpen: (id: string) => Layer.isOpen(id)
}

export default Modal

