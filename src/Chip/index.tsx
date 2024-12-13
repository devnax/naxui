'use client'
import React, { ReactElement, forwardRef } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplate, useColorTemplateColors, useColorTemplateType, useBreakpointProps, useBreakpointPropsType } from 'naxui-manager';
import useCorner, { UseCornerTypes } from '../useCorner'



export type ChipProps<T extends TagComponentType = 'div'> = Omit<TagProps<T>, "color" | "children" | "size"> & {
    label: useBreakpointPropsType<string | ReactElement>;
    startIcon?: useBreakpointPropsType<ReactElement>;
    endIcon?: useBreakpointPropsType<ReactElement>;
    color?: useBreakpointPropsType<useColorTemplateColors>;
    variant?: useBreakpointPropsType<useColorTemplateType>;
    corner?: useBreakpointPropsType<UseCornerTypes>;
    size?: useBreakpointPropsType<"small" | "medium" | "large">;
}


const _Chip = <T extends TagComponentType = 'div'>(props: ChipProps<T>, ref: React.Ref<any>) => {
    let [{ label, variant, startIcon, endIcon, color, corner, size, ...rest }] = useInterface<any>("Chip", props, {})
    const _p: any = {}
    if (label) _p.label = label
    if (startIcon) _p.startIcon = startIcon
    if (endIcon) _p.endIcon = endIcon
    if (color) _p.color = color
    if (variant) _p.variant = variant
    if (corner) _p.corner = corner
    if (size) _p.size = size
    const p: any = useBreakpointProps(_p)

    label = p.label
    startIcon = p.startIcon
    endIcon = p.endIcon
    color = p.color || "brand"
    variant = p.variant || "fill"
    corner = p.corner || "circle"
    size = p.size || "medium"
    rest.sx = (rest as any).sx || {};

    const cornerCss = useCorner(corner)
    const template = useColorTemplate(color, variant)
    delete template?.hover

    const sizes: any = {
        small: {
            height: 24,
            gap: .5,
            fontSize: 12
        },
        medium: {
            height: 34,
            gap: 1,
            fontSize: 14,
        },
        large: {
            height: 38,
            fontSize: 15,
            gap: 1,
        }
    }

    return (
        <Tag
            {...cornerCss}
            {...template}
            {...(sizes[size as any] || {})}
            {...rest}
            sxr={{
                display: "inline-flex",
                flexDirection: "row",
                alignItems: "center",
                transition: "background .3s",
                fontFamily: "default",
                overflow: "hidden",
                px: startIcon || endIcon ? 1 : 1.5,
            }}
            baseClass='chip'
            ref={ref}
        >
            {startIcon}
            <Tag
                sxr={{
                    alignItems: "center",
                    flexBox: true
                }}
            >{label}</Tag>
            {endIcon}
        </Tag>
    )
}
const Chip = forwardRef(_Chip) as typeof _Chip
export default Chip
