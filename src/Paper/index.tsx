'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponentType, useInterface } from 'naxui-manager';

export type PaperProps<T extends TagComponentType = "div"> = TagProps<T>

const _Paper = <T extends TagComponentType = "div">({ children, ...rest }: PaperProps<T>, ref?: React.Ref<any>) => {
    let [props] = useInterface<any>("Paper", rest, {})
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
