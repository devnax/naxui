'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useColorTemplateColors, useBreakpointProps } from 'naxui-manager';
import { useBreakpoinPropsType } from 'naxui-manager/dist/breakpoint/useBreakpointProps';

export type DividerProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "color"> & {
    direction?: useBreakpoinPropsType<"verticle" | "horizental">;
    color?: useBreakpoinPropsType<useColorTemplateColors>;
    size?: useBreakpoinPropsType<number>;
}

const _Divider = <T extends TagComponentType = "div">({ children, direction, color, size, ...rest }: DividerProps<T>, ref: React.Ref<any>) => {
    const _p: any = {}
    if (direction) _p.direction = direction
    if (color) _p.color = color
    if (size) _p.size = size
    const p: any = useBreakpointProps(_p)
    direction = p.direction ?? "horizental"
    color = p.color ?? "default"
    size = p.size ?? 1

    let isHori = direction === 'horizental'

    return (
        <Tag
            {...rest}
            baseClass='divider'
            sxr={{
                width: isHori ? "100%" : size,
                height: isHori ? size : "100%",
                bgcolor: color === 'default' ? `background.secondary` : `${color}.secondary`,
            }}
            ref={ref}
        >{children}</Tag>
    )
}

const Divider = React.forwardRef(_Divider) as typeof _Divider
export default Divider

