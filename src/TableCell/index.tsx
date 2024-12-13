'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useBreakpointPropsType } from 'naxui-manager';

export type TableColumnProps<T extends TagComponentType = "td"> = TagProps<T> & {
    th?: boolean
}

const _TableCell = <T extends TagComponentType = "td">({ children, th, ...rest }: TableColumnProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            sxr={{
                verticalAlign: "inherit",
                textAlign: "left",
                fontSize: "inherit",
                color: "text.primary",
                ...((rest as any)?.sx || {})
            }}
            baseClass='table-cell'
            component={th ? "th" : "td"} ref={ref}
        >
            {children}
        </Tag>
    )
}

const TableCell = React.forwardRef(_TableCell) as typeof _TableCell
export default TableCell