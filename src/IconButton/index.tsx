'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType, useInterface, useColorTemplateColors, useColorTemplateType, useColorTemplate } from 'naxui-manager';
import useCornerVariant from '../useCornerVariant'

export type IconButtonProps<T extends TagComponenntType = 'button'> = Omit<TagProps<T>, "color"> & {
    size?: number;
    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    corner?: "square" | "rounded" | "circle";
}

const _IconButton = <T extends TagComponenntType = 'button'>({ children, ...rest }: IconButtonProps<T>, ref: React.Ref<any>) => {

    rest.sx = (rest as any).sx || {};

    let { variant, corner, color, size, ..._props } = useInterface("IconButton", {
        variant: "fill",
        corner: "circle",
        color: "brand",
        size: 40
    }, rest)
    let template = useColorTemplate(color, variant)

    const cornerCss = useCornerVariant(corner)

    return (
        <Tag
            component='button'
            baseClass='icon-button'
            border={0}
            radius={size}
            height={size}
            width={size}
            cursor="pointer"
            fontFamily="theme"
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            bgcolor="transparent"
            ref={ref}
            {...cornerCss}
            {..._props}
            {...template}
            sx={{
                ..._props.sx,
                "& svg": {
                    fontSize: (size / 3) * 2
                }
            }}
            hover={{
                ...((template as any).hover || {}),
                ...((_props as any).hover || {})
            }}
        >
            {children}
        </Tag>
    )
}
const IconButton = forwardRef(_IconButton) as typeof _IconButton
export default IconButton
