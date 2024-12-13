'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplateColors, useColorTemplateType, useColorTemplate, useBreakpointProps, useBreakpointPropsType } from 'naxui-manager';
import useCorner from '../useCorner'


export type IconButtonProps<T extends TagComponentType = 'button'> = Omit<TagProps<T>, "color" | "size"> & {
    size?: useBreakpointPropsType<number | "small" | "medium" | "large">;
    color?: useBreakpointPropsType<useColorTemplateColors>;
    variant?: useBreakpointPropsType<useColorTemplateType>;
    corner?: useBreakpointPropsType<"square" | "rounded" | "circle">;
}

const _IconButton = <T extends TagComponentType = 'button'>({ children, ...rest }: IconButtonProps<T>, ref: React.Ref<any>) => {

    rest.sx = (rest as any).sx || {};

    let [{ variant, corner, color, size, ..._props }] = useInterface<any>("IconButton", rest, {})

    const _p: any = {}
    if (size) _p.size = size
    if (color) _p.color = color
    if (variant) _p.variant = variant
    if (corner) _p.corner = corner
    const p: any = useBreakpointProps(_p)

    size = p.size ?? "medium"
    color = p.color
    variant = p.variant
    corner = p.corner ?? "circle"

    let template = useColorTemplate(color || "brand", variant || "fill")
    const cornerCss = useCorner(corner)

    if (size === 'small') {
        size = 28
    } else if (size === 'medium') {
        size = 34
    } else if (size === 'large') {
        size = 52
    }


    return (
        <Tag
            component='button'
            ref={ref}
            {...cornerCss}
            {..._props}
            {...template}
            baseClass='icon-button'
            sxr={{
                border: 0,
                radius: size,
                height: size,
                width: size,
                cursor: "pointer",
                fontFamily: "default",
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "transparent",
                fontSize: (size / 5) * 2,
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
