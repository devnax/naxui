'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type StackProps<T extends TagComponenntType = "div"> = TagProps<T>

const _Stack = <T extends TagComponenntType = "div">({ children, ...rest }: StackProps<T>, ref?: React.Ref<any>) => {
    return (
        <Tag display="flex" flexDirection="column" baseClass='stack' {...rest} ref={ref}>{children}</Tag>
    )
}
const Stack = forwardRef(_Stack) as typeof _Stack
export default Stack
