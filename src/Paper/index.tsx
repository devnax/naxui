'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type PaperProps<T extends TagComponenntType = "div"> = TagProps<T>

const Paper = <T extends TagComponenntType = "div">({ children, ...rest }: PaperProps<T>, ref?: React.Ref<any>) => {
    return (
        <Tag
            display="flex"
            flexDirection="column"
            baseClass='paper'
            radius={1}
            p={1.5}
            shadow={2}
            bgcolor="background.default"
            color="text.primary"
            {...rest}
            ref={ref}
        >{children}</Tag>
    )
}
export default forwardRef(Paper) as typeof Paper
