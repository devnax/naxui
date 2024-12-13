'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useColorTemplateColors, useInterface, useColorTemplate, useColorTemplateType, useBreakpointProps } from 'naxui-manager';
import Scrollbar from '../Scrollbar';
import { useBreakpoinPropsType } from 'naxui-manager/dist/breakpoint/useBreakpointProps';

export type TableProps<T extends TagComponentType = "table"> = Omit<TagProps<T>, "color" | "size"> & {
    evenColor?: useBreakpoinPropsType<boolean>;
    size?: useBreakpoinPropsType<"small" | "medium" | "large" | number>;
    color?: useBreakpoinPropsType<useColorTemplateColors>;
    variant?: useBreakpoinPropsType<Omit<useColorTemplateType, "outline">>;
    borderType?: useBreakpoinPropsType<"box" | "line" | "none">;
}

const _Table = <T extends TagComponentType = "table">({ children, ...props }: TableProps<T>, ref: React.Ref<any>) => {
    let [{ evenColor, size, color, variant, borderType, ...rest }] = useInterface<any>("Table", props, {})
    const _p: any = {}
    if (evenColor) _p.evenColor = evenColor
    if (size) _p.size = size
    if (color) _p.color = color
    if (variant) _p.variant = variant
    if (borderType) _p.borderType = borderType
    const p: any = useBreakpointProps(_p)
    evenColor = p.evenColor
    size = p.size ?? "medium"
    color = p.color ?? 'default'
    variant = p.variant ?? "fill"
    borderType = p.borderType ?? "line"

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