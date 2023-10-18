'use client'
import React from 'react';
import { Tag, alpha, TagProps } from 'naxui-manager';
import Layer, { LayerContentType, LayerProps } from '../Layer';
import Transition from '../Transition';
import IconButton, { IconButtonProps } from '../IconButton';
import IconClose from 'naxui-icons/round/Close';

export type ModalContentType = LayerContentType
export type ModalPropsType = {
    closeButton?: boolean;
    closeButtonProps?: IconButtonProps;
    closeOnClickOutside?: boolean;
    rootProps?: Omit<TagProps<"div">, 'children' | "content">
    transition?: LayerProps['transition'];
    transitionProps?: LayerProps['transitionProps'];

    // Layer Props
    bgImage?: string;
    blur?: number;
    zIndex?: number;
    onOpen?: () => void;
    onClose?: () => void;
    onClickOutside?: () => void;
    layerProps?: LayerProps
}

const Modal = {
    open: (id: string, content: ModalContentType, props?: ModalPropsType) => {
        let Content = content
        let {
            closeButton,
            closeButtonProps,
            transitionProps,
            transition,
            closeOnClickOutside,
            rootProps,

            // layer
            bgImage,
            blur,
            zIndex,
            onOpen,
            onClose,
            onClickOutside,
            layerProps
        } = props || {}

        closeOnClickOutside = closeOnClickOutside ?? true

        const layerCallback = ({ open }: any) => {
            return (
                <Transition
                    in={open}
                    type={transition || "zoom"}
                    {...transitionProps}
                >
                    <Tag
                        p={2}
                        radius={{
                            xs: 0,
                            sm: 2
                        }}
                        shadow={{
                            xs: 0,
                            sm: 5
                        }}
                        width={{
                            xs: "100%",
                            sm: 400
                        }}
                        height={{
                            xs: "100%",
                            sm: "auto"
                        }}
                        bgcolor="color.paper.light"
                        {...rootProps}
                        position="relative"
                        baseClass='modal'
                    >
                        {
                            closeButton && <IconButton
                                position="absolute"
                                top={10}
                                right={10}
                                size={34}
                                color="paper"
                                opacity={.5}
                                hover={{ opacity: 1 }}
                                onClick={() => Layer.close(id)}
                                {...closeButtonProps}
                            >
                                <IconClose />
                            </IconButton>
                        }
                        {typeof Content === "function" ? <Content open={open} /> : Content}
                    </Tag>
                </Transition>
            )
        }

        return Layer.open(id, layerCallback, {
            bgImage,
            blur,
            zIndex,
            onOpen,
            onClose,
            ...layerProps,
            onClickOutside: () => {
                closeOnClickOutside && Layer.close(id)
                onClickOutside && onClickOutside()
            },
            contentProps: {
                bgcolor: blur ? "transparent" : alpha("#000000", .3),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...layerProps?.contentProps
            }
        })
    },
    close: (id: string) => Layer.close(id),
    isOpen: (id: string) => Layer.isOpen(id)
}

export default Modal

