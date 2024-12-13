'use client'
import React, { forwardRef, ReactElement } from 'react'
import { Tag, TagProps, TagComponentType, useInterface, useBreakpointProps } from 'naxui-manager'
import Text from '../Text';
import { useBreakpoinPropsType } from 'naxui-manager/dist/breakpoint/useBreakpointProps';

export type ListItemProps<T extends TagComponentType = "li"> = TagProps<T> & {
    selected?: boolean;
    subtitle?: useBreakpoinPropsType<string | ReactElement>;
    startIcon?: useBreakpoinPropsType<ReactElement>;
    endIcon?: useBreakpoinPropsType<ReactElement>;
}

const _ListItem = <T extends TagComponentType = "li">({ children, startIcon, endIcon, subtitle, ...rest }: ListItemProps<T>, ref: React.Ref<any>) => {
    let [{ selected, ...props }] = useInterface<any>("ListItem", rest, {})
    const _p: any = {}
    if (subtitle) _p.subtitle = subtitle
    if (startIcon) _p.startIcon = startIcon
    if (endIcon) _p.endIcon = endIcon
    const p: any = useBreakpointProps(_p)

    subtitle = p.subtitle
    startIcon = p.startIcon
    endIcon = p.endIcon

    return (
        <Tag
            component='li'
            {...props}
            sxr={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                userSelect: "none",
                cursor: "pointer",
                lineHeight: 1.4,
                p: 1,
                whiteSpace: "nowrap",
                flexShrink: "0",
            }}
            baseClass='list-item'
            classNames={[{ "list-item-selected": selected as boolean }, ...(props.classNames || [])]}
            ref={ref}
        >
            {startIcon && <Tag mr={1} component="span" display="inline-block" className='list-item-icon'>{startIcon as any}</Tag>}
            <Tag flex={1}>
                <Text
                    variant="text"
                    className='list-item-text'
                    component={typeof children === "string" || typeof children === "number" ? "p" : "div"}
                >
                    {children}
                </Text>
                {
                    subtitle && <Text
                        variant="text"
                        fontSize="button"
                        className='list-item-subtitle'
                        component={typeof subtitle === "string" || typeof subtitle === "number" ? "p" : "div"}
                    >{subtitle as any}</Text>
                }
            </Tag>
            {endIcon && <Tag ml={1} component="span" display="inline-block" className='list-item-icon'>{endIcon as any}</Tag>}
        </Tag>
    )
}

const ListItem = forwardRef(_ListItem) as typeof _ListItem
export default ListItem