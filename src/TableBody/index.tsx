import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type TableBodyProps<T extends TagComponenntType = "tbody"> = TagProps<T>

const TableBody = <T extends TagComponenntType = "tbody">({ children, ...rest }: TableBodyProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            component="tbody"
            ref={ref}
        >{children}</Tag>
    )
}

export default React.forwardRef(TableBody) as typeof TableBody