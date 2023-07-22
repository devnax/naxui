import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type TableColumnProps<T extends TagComponenntType = "td"> = TagProps<T> & {
    th?: boolean
}

const TableColumn = <T extends TagComponenntType = "td">({ children, th, ...rest }: TableColumnProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag baseClass='td' verticalAlign="inherit" {...rest} component={th ? "th" : "td"} ref={ref}>{children}</Tag>
    )
}

export default React.forwardRef(TableColumn) as typeof TableColumn