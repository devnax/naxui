'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponentType, useBreakpointPropsType } from 'naxui-manager';

export type StackProps<T extends TagComponentType = "div"> = TagProps<T>

const _Stack = <T extends TagComponentType = "div">({ children, sx, ...props }: StackProps<T>, ref?: React.Ref<any>) => {
    return (
        <Tag
            {...props}
            sxr={{
                display: "flex",
                flexDirection: "column",
                ...(sx as any || {})
            }}
            baseClass='stack'
            ref={ref}
        >{children}</Tag>
    )
}
const Stack = forwardRef(_Stack) as typeof _Stack
export default Stack
