'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type BoxProps<T extends TagComponenntType = "div"> = TagProps<T>

const _Box = <T extends TagComponenntType = "div">({ children, ...props }: BoxProps<T>, ref: React.Ref<any>) => {
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

