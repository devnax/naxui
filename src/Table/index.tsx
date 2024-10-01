'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type TableProps<T extends TagComponentType = "table"> = TagProps<T> & {
    evenColor?: boolean;
    dense?: boolean;
}

const _Table = <T extends TagComponentType = "table">({ children, evenColor, dense, ...rest }: TableProps<T>, ref: React.Ref<any>) => {

    let sx = {}
    if (evenColor) {
        sx = {
            "& tbody tr:nth-child(even)": {
                bgcolor: "paper"
            }
        }
    }

    return (
        <Tag
            {...rest}
            baseClass='table'
            sx={{
                "& td,& th": {
                    p: dense ? 1 : 1.5
                },
                "& tr:not(:last-child) td, & tr:not(:last-child) th": {
                    borderBottom: "1px solid",
                    borderColor: "background.secondary",
                },
                "& tbody tr:hover": {
                    bgcolor: "paper"
                },
                ...sx,
                ...((rest as any).sx || {})
            }}
            component="table"
            ref={ref}
        >{children}</Tag>
    )
}


const Table = React.forwardRef(_Table) as typeof _Table
export default Table