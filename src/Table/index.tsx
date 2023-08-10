import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type TableProps<T extends TagComponenntType = "table"> = TagProps<T> & {
    evenColor?: boolean;
    dense?: boolean;
}

const Table = <T extends TagComponenntType = "table">({ children, evenColor, dense, ...rest }: TableProps<T>, ref: React.Ref<any>) => {

    let sx = {}
    if (evenColor) {
        sx = {
            "& tbody tr:nth-child(even)": {
                bgcolor: "background.dark"
            }
        }
    }

    return (
        <Tag
            baseClass='table'
            {...rest}
            sx={{
                "& td, th": {
                    p: dense ? 1 : 1.5
                },
                "& tr:not(:last-child) td, th": {
                    borderBottom: "1px solid",
                    borderColor: "divider",
                },
                "& tbody tr:hover": {
                    bgcolor: "background.light"
                },
                ...sx,
                ...((rest as any).sx || {})
            }}
            component="table"
            ref={ref}
        >{children}</Tag>
    )
}

export default React.forwardRef(Table) as typeof Table