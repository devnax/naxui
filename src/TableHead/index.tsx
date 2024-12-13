'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useBreakpointPropsType } from 'naxui-manager';

export type TableHeadProps<T extends TagComponentType = "thead"> = TagProps<T>

const _TableHead = <T extends TagComponentType = "thead">({ children, ...rest }: TableHeadProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            baseClass='table-head'
            component="thead"
            ref={ref}
        >{children}</Tag>
    )
}

const TableHead = React.forwardRef(_TableHead) as typeof _TableHead
export default TableHead 