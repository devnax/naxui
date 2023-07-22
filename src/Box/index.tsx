'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type BoxProps<T extends TagComponenntType = "div"> = TagProps<T>

const Box = <T extends TagComponenntType = "div">({ children, ...rest }: BoxProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag baseClass='box' {...rest} ref={ref}>{children}</Tag>
    )
}

export default React.forwardRef(Box) as typeof Box


