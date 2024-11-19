'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useColorTemplateColors, useInterface, useColorTemplate, useColorTemplateType } from 'naxui-manager';
import Scrollbar from '../Scrollbar';

export type TableProps<T extends TagComponentType = "table"> = Omit<TagProps<T>, "color" | "size"> & {
    evenColor?: boolean;
    size?: "small" | "medium" | "large" | number;
    color?: useColorTemplateColors;
    variant?: Omit<useColorTemplateType, "outline">;
    borderType?: "box" | "line" | "none";
}

const _Table = <T extends TagComponentType = "table">({ children, ...props }: TableProps<T>, ref: React.Ref<any>) => {
    let [{ evenColor, size, color, variant, borderType, ...rest }] = useInterface<any>("Table", props, {})
    variant ??= "fill"
    borderType ??= "line"
    color ??= 'default'
    size ??= "medium"
    const main = useColorTemplate(color, variant)
    const alpha = useColorTemplate(color, "alpha")

    let sx: any = {}
    if (evenColor) {
        sx = {
            "& tbody tr:nth-child(even)": {
                bgcolor: alpha.bgcolor
            }
        }
    }
    if (borderType === 'box') {
        sx = {
            ...sx,
            "& tr:last-child td": {
                borderBottom: 0
            },
            "& tr:first-child th": {
                borderTop: 0
            },
            "& tr td:first-child, & tr th:first-child": {
                borderLeft: 0
            },
            "& tr td:last-child, & tr th:last-child": {
                borderRight: 0
            },
        }
    }
    let _size = size
    let sizes: any = {
        small: .5,
        medium: 1,
        large: 2
    }

    if (typeof size === 'string' && sizes[size]) {
        _size = sizes[size]
    }
    let border: any = {
        line: {
            borderBottom: "1px solid",
            borderColor: "divider",
        },
        box: {
            border: "1px solid",
            borderColor: "divider",
        },
        none: {}
    }

    return (
        <Scrollbar
            style={{
                overflowY: "hidden"
            }}
        >
            <Tag
                {...rest}
                baseClass='table'
                sxr={{
                    color: "text.primary",
                    fontSize: size === "small" ? "button" : "text",
                    width: "100%",
                    "& thead, & tfoot": {
                        bgcolor: main.bgcolor,
                        "& th": {
                            color: main.color
                        }
                    },
                    "& td, & th": {
                        p: _size,
                        ...border[borderType],
                    },
                    "& tr:last-child td": {
                        borderBottom: 0
                    },
                    "& tr:first-child th": {
                        borderTop: 0
                    },
                    "& tbody tr:hover": {
                        bgcolor: alpha.bgcolor
                    },
                    ...sx,
                    ...((rest as any).sx || {})
                }}
                component="table"
                ref={ref}
            >{children}</Tag>
        </Scrollbar>
    )
}


const Table = React.forwardRef(_Table) as typeof _Table
export default Table