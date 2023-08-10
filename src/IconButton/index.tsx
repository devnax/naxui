'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType, alpha } from 'naxui-manager';
import useVariants from '../Button/variants'

export type IconButtonProps<T extends TagComponenntType = 'button'> = Omit<TagProps<T>, "color"> & {
    color?: "primary" | "secondary" | "success" | "error" | "warning";
    variant?: "outline" | "text" | "contained";
    size?: number;
}

const IconButton = <T extends TagComponenntType = 'button'>({ children, variant, color, size, ...rest }: IconButtonProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    size = size || 40
    color = color || "primary"
    let css = useVariants(variant || "text", color)

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
            bgcolor="transparent"
            ref={ref}
            {...css}
            {...rest}
            hover={{
                bgcolor: alpha(color, .9),
                ...((rest as any)?.hover || {})
            }}
        >
            {children}
        </Tag>
    )
}
export default forwardRef(IconButton) as typeof IconButton
