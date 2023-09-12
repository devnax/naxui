'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type TableFooterProps<T extends TagComponenntType = "tfoot"> = TagProps<T>

const _TableFooter = <T extends TagComponenntType = "tfoot">({ children, ...rest }: TableFooterProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            component="tfoot"
            ref={ref}
        >{children}</Tag>
    )
}

const TableFooter = React.forwardRef(_TableFooter) as typeof _TableFooter
export default TableFooter