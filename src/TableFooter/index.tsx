'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type TableFooterProps<T extends TagComponentType = "tfoot"> = TagProps<T>

const _TableFooter = <T extends TagComponentType = "tfoot">({ children, ...rest }: TableFooterProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            baseClass='table-footer'
            component="tfoot"
            ref={ref}
        >{children}</Tag>
    )
}

const TableFooter = React.forwardRef(_TableFooter) as typeof _TableFooter
export default TableFooter