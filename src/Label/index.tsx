'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type LabelProps<T extends TagComponenntType = "label"> = TagProps<T>

const Label = <T extends TagComponenntType = "label">({ children, ...rest }: LabelProps<T>, ref: React.Ref<any>) => {
    return <Tag
        baseClass='label'
        component='label'
        display="inline-flex"
        alignItems="center"
        verticalAlign="middle"
        gap={4}
        {...rest}
        ref={ref}
    >{children}</Tag>
}

export default React.forwardRef(Label) as typeof Label