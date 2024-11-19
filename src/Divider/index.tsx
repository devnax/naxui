'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useColorTemplateColors } from 'naxui-manager';

export type DividerProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "color"> & {
    direction?: "verticle" | "horizental";
    color?: useColorTemplateColors;
    size?: number;
}

const _Divider = <T extends TagComponentType = "div">({ children, direction, color, size, ...rest }: DividerProps<T>, ref: React.Ref<any>) => {
    direction = direction ?? "horizental"
    color ??= "default"
    size = size ?? 1
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

