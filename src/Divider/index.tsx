'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType, useColorTemplateColors } from 'naxui-manager';

export type DividerProps<T extends TagComponenntType = "div"> = Omit<TagProps<T>, "color"> & {
    direction?: "verticle" | "horizental";
    color?: useColorTemplateColors;
    size?: number;
}

const _Divider = <T extends TagComponenntType = "div">({ children, direction, color, size, ...rest }: DividerProps<T>, ref: React.Ref<any>) => {
    direction = direction ?? "horizental"
    color ??= "default"
    size = size ?? 1
    let isHori = direction === 'horizental'

    return (
        <Tag
            {...rest}
            baseClass='divider'
            sx={{
                width: isHori ? "100%" : size,
                height: isHori ? size : "100%",
                bgcolor: color === 'default' ? `background.secondary` : `${color}.secondary`,
                // my: isHori ? 1 : 0,
                // mx: isHori ? 0 : 1,
                ...((rest as any).sx || {})
            }}
            ref={ref}
        >{children}</Tag>
    )
}

const Divider = React.forwardRef(_Divider) as typeof _Divider
export default Divider

