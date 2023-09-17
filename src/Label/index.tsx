'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type LabelProps<T extends TagComponenntType = "label"> = TagProps<T>

const _Label = <T extends TagComponenntType = "label">({ children, ...rest }: LabelProps<T>, ref: React.Ref<any>) => {
    return <Tag
        baseClass='label'
        component='label'
        display="inline-flex"
        alignItems="center"
        verticalAlign="middle"
        fontSize="fontsize.button"
        gap={4}
        {...rest}
        ref={ref}
    >{children}</Tag>
}

const Label = React.forwardRef(_Label) as typeof _Label

export default Label