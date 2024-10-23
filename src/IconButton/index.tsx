'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplateColors, useColorTemplateType, useColorTemplate } from 'naxui-manager';
import useCornerVariant from '../useCornerVariant'

export type IconButtonProps<T extends TagComponentType = 'button'> = Omit<TagProps<T>, "color"> & {
    size?: number | "small" | "medium" | "large";
    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    corner?: "square" | "rounded" | "circle";
}

const _IconButton = <T extends TagComponentType = 'button'>({ children, ...rest }: IconButtonProps<T>, ref: React.Ref<any>) => {

    rest.sx = (rest as any).sx || {};

    let { variant, corner, color, size, ..._props } = useInterface("IconButton", {
        corner: "circle"
    }, rest)
    let template = useColorTemplate(color || "brand", variant || "fill")
    const cornerCss = useCornerVariant(corner)
    if (size === 'small') {
        size = 32
    } else if (size === 'medium') {
        size = 40
    } else if (size === 'large') {
        size = 52
    }

    size ??= 32

    return (
        <Tag
            component='button'
            border={0}
            radius={size}
            height={size}
            width={size}
            cursor="pointer"
            fontFamily="default"
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            bgcolor="transparent"
            ref={ref}
            {...cornerCss}
            {..._props}
            {...template}
            baseClass='icon-button'
            fontSize={(size / 5) * 2}
            sx={{
                ..._props.sx,
                "& svg": {
                    fontSize: (size / 3) * 2
                }
            }}
            hover={{
                ...((template as any)?.hover || {}),
                ...((_props as any)?.hover || {})
            }}
        >
            {children}
        </Tag>
    )
}
const IconButton = forwardRef(_IconButton) as typeof _IconButton
export default IconButton
