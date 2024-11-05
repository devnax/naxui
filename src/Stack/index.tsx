'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type StackProps<T extends TagComponentType = "div"> = TagProps<T>

const _Stack = <T extends TagComponentType = "div">({ children, ...props }: StackProps<T>, ref?: React.Ref<any>) => {
    return (
        <Tag
            {...props}
            sx={{
                display: "flex",
                flexDirection: "column",
                ...(props as any).sx
            }}
            baseClass='stack'
            ref={ref}
        >{children}</Tag>
    )
}
const Stack = forwardRef(_Stack) as typeof _Stack
export default Stack
