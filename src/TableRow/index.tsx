import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type TableRowProps<T extends TagComponenntType = "tr"> = TagProps<T>

const TableRow = <T extends TagComponenntType = "tr">({ children, ...rest }: TableRowProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            baseClass='table-row'
            verticalAlign="middle"
            {...rest}
            component="tr"
            ref={ref}>{children}</Tag>
    )
}

export default React.forwardRef(TableRow) as typeof TableRow