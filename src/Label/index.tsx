'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type LabelProps<T extends TagComponentType = "label"> = TagProps<T>

const _Label = <T extends TagComponentType = "label">({ children, ...rest }: LabelProps<T>, ref: React.Ref<any>) => {
    return <Tag
        component='label'
        {...rest}
        sxr={{
            display: "inline-flex",
            alignItems: "center",
            verticalAlign: "middle",
            fontSize: "button",
            gap: .4,
        }}
        baseClass='label'
        ref={ref}
    >{children}</Tag>
}

const Label = React.forwardRef(_Label) as typeof _Label

export default Label