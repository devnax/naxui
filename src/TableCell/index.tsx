'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type TableColumnProps<T extends TagComponentType = "td"> = TagProps<T> & {
    th?: boolean
}

const _TableColumn = <T extends TagComponentType = "td">({ children, th, ...rest }: TableColumnProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            baseClass='td'
            verticalAlign="inherit"
            textAlign="left"
            fontSize="button"
            {...rest}
            component={th ? "th" : "td"} ref={ref}
        >
            {children}
        </Tag>
    )
}

const TableColumn = React.forwardRef(_TableColumn) as typeof _TableColumn
export default TableColumn