'use client'
import React, { ReactNode } from 'react'
import Layer, { LayerProps } from "../Layer"
import { Tag, TagProps } from 'naxui-manager'


export type ModalProps = Omit<LayerProps, "slotProps"> & {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "fullWidth" | number;
    slotProps?: LayerProps['slotProps'] & {
        modal?: Omit<TagProps<'div'>, "children">
    }
}


const Modal = ({ children, size, slotProps, ...props }: ModalProps) => {
    size ??= "xs"
    let sizes: any = {
        xs: 420,
        sm: 760,
        md: 990,
        lg: 1120,
        xl: 1300,
        fullWidth: "100%"
    }

    let { modal, ..._slotProps }: any = slotProps || {}

    return (
        <Layer
            transition="zoom"
            {...props}
            slotProps={{
                ..._slotProps,
                root: {
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: "center",
                    ..._slotProps?.root,
                }
            }}
        >
            <Tag
                {...modal}
                sx={{
                    maxWidth: sizes[size] || size,
                    width: "100%",
                    radius: 2,
                    bgcolor: "background.primary",
                    shadow: 15,
                    ...modal?.sx
                }}
                baseClass='modal'
            >
                {children}
            </Tag>
        </Layer>
    )
}


Modal.open = (id: string, content: ReactNode, props?: Omit<ModalProps, "open" | "children">) => {
    id = "modal-" + id
    let { size, slotProps } = props || {}
    size ??= "xs"
    let sizes: any = {
        xs: 420,
        sm: 760,
        md: 990,
        lg: 1120,
        xl: 1300,
        fullWidth: "100%"
    }
    let { modal, ..._slotProps }: any = slotProps || {}

    Layer.open(id, <Tag
        {...modal}
        sx={{
            maxWidth: sizes[size] || size,
            width: "100%",
            radius: 2,
            bgcolor: "background.primary",
            shadow: 15,
            ...modal?.sx
        }}
        baseClass='modal'
    >
        {content}
    </Tag>, {
        transition: "zoom",
        ...props,
        slotProps: {
            ..._slotProps,
            root: {
                display: "flex",
                alignItems: 'center',
                justifyContent: "center",
                ..._slotProps?.root,
            }
        }
    })
}

Modal.close = (id: string) => {
    id = "modal-" + id
    Layer.close(id)
}

export default Modal