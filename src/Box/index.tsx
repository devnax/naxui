'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useBreakpointPropsType } from 'naxui-manager';

export type BoxProps<T extends TagComponentType = "div"> = TagProps<T>

const _Box = <T extends TagComponentType = "div">({ children, ...props }: BoxProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...props}
            baseClass='box'
            ref={ref}
        >{children}</Tag>
    )
}

const Box = React.forwardRef(_Box) as typeof _Box
export default Box

