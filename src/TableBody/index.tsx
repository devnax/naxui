'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type TableBodyProps<T extends TagComponentType = "tbody"> = TagProps<T>

const _TableBody = <T extends TagComponentType = "tbody">({ children, ...rest }: TableBodyProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            baseClass='table-body'
            component="tbody"
            ref={ref}
        >{children}</Tag>
    )
}

const TableBody = React.forwardRef(_TableBody) as typeof _TableBody
export default TableBody