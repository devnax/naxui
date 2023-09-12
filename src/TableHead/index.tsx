'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type TableHeadProps<T extends TagComponenntType = "thead"> = TagProps<T>

const _TableHead = <T extends TagComponenntType = "thead">({ children, ...rest }: TableHeadProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            component="thead"
            ref={ref}
        >{children}</Tag>
    )
}

const TableHead = React.forwardRef(_TableHead) as typeof _TableHead
export default TableHead 