'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type TableRowProps<T extends TagComponentType = "tr"> = TagProps<T>

const _TableRow = <T extends TagComponentType = "tr">({ children, ...rest }: TableRowProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            baseClass='table-row'
            verticalAlign="middle"
            {...rest}
            component="tr"
            ref={ref}>{children}</Tag>
    )
}
const TableRow = React.forwardRef(_TableRow) as typeof _TableRow
export default TableRow