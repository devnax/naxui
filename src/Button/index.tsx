'use client'
import React, { ReactElement, forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType, useVariant } from 'naxui-manager';

export type ButtonProps<T extends TagComponenntType = 'button'> = Omit<TagProps<T>, "color"> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    color?: "primary" | "secondary" | "success" | "error" | "warning";
    variant?: "outline" | "text" | "contained";
}


const Button = <T extends TagComponenntType = 'button'>({ children, variant, startIcon, endIcon, color, ...rest }: ButtonProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    let css = useVariant(variant, color)

    return (
        <Tag
            component='button'
            baseClass='button'
            border={0}
            radius={1.5}
            height={44}
            cursor="pointer"
            typography="button"
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            transition="background .3s"
            px={2}
            {...css}
            {...rest}
            ref={ref}
        >
            {startIcon && <Tag component='span' mr={1}>{startIcon}</Tag>}
            {children}
            {endIcon && <Tag component='span' ml={1}>{endIcon}</Tag>}
        </Tag>
    )
}
export default forwardRef(Button) as typeof Button
