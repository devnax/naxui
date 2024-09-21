'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType, useInterface } from 'naxui-manager';

export type PaperProps<T extends TagComponenntType = "div"> = TagProps<T>

const _Paper = <T extends TagComponenntType = "div">({ children, ...rest }: PaperProps<T>, ref?: React.Ref<any>) => {
    const props = useInterface("Paper", {}, rest)
    return (
        <Tag
            flexBox
            flexColumn
            radius={1}
            p={1.5}
            bgcolor="background.secondary"
            color="text.primary"
            {...props}
            baseClass='paper'
            ref={ref}
        >{children}</Tag>
    )
}

const Paper = forwardRef(_Paper) as typeof _Paper
export default Paper
