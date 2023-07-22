import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type TableHeadProps<T extends TagComponenntType = "thead"> = TagProps<T>

const TableHead = <T extends TagComponenntType = "thead">({ children, ...rest }: TableHeadProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            component="thead"
            ref={ref}
        >{children}</Tag>
    )
}

export default React.forwardRef(TableHead) as typeof TableHead