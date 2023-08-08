'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import useVariant from '../Button/variants'

export type IconButtonProps<T extends TagComponenntType = 'button'> = Omit<TagProps<T>, "color"> & {
    color?: "primary" | "secondary" | "success" | "error" | "warning";
    variant?: "outline" | "text" | "contained";
    size?: number;
}

const IconButton = <T extends TagComponenntType = 'button'>({ children, variant, color, size, ...rest }: IconButtonProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    size = size || 40
    let css = useVariant(variant || "text", color)

    return (
        <Tag
            component='button'
            baseClass='button'
            border={0}
            radius={size}
            height={size}
            width={size}
            cursor="pointer"
            typography="button"
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            transition="background .3s"
            ref={ref}
            {...css}
            {...rest}
        >
            {children}
        </Tag>
    )
}
export default forwardRef(IconButton) as typeof IconButton
