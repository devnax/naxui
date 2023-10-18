'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type PaperProps<T extends TagComponenntType = "div"> = TagProps<T>

const _Paper = <T extends TagComponenntType = "div">({ children, ...rest }: PaperProps<T>, ref?: React.Ref<any>) => {
    return (
        <Tag
            display="flex"
            flexDirection="column"
            baseClass='paper'
            radius={1}
            p={1.5}
            bgcolor="color.paper"
            color="color.paper.text"
            {...rest}
            ref={ref}
        >{children}</Tag>
    )
}

const Paper = forwardRef(_Paper) as typeof _Paper
export default Paper
