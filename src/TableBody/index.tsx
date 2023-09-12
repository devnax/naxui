'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type TableBodyProps<T extends TagComponenntType = "tbody"> = TagProps<T>

const _TableBody = <T extends TagComponenntType = "tbody">({ children, ...rest }: TableBodyProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            component="tbody"
            ref={ref}
        >{children}</Tag>
    )
}

const TableBody = React.forwardRef(_TableBody) as typeof _TableBody
export default TableBody