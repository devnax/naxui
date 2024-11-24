'use client'
import React, { forwardRef, ReactElement } from 'react'
import { Tag, TagProps, TagComponentType, useInterface } from 'naxui-manager'
import Text from '../Text';

export type ListItemProps<T extends TagComponentType = "li"> = TagProps<T> & {
    selected?: boolean;
    subtitle?: string | ReactElement;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
}

const _ListItem = <T extends TagComponentType = "li">({ children, startIcon, endIcon, subtitle, ...rest }: ListItemProps<T>, ref: React.Ref<any>) => {
    let [{ selected, ...props }] = useInterface<any>("ListItem", rest, {})
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
            {startIcon && <Tag mr={1} component="span" display="inline-block" className='list-item-icon'>{startIcon}</Tag>}
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
                    >{subtitle}</Text>
                }
            </Tag>
            {endIcon && <Tag ml={1} component="span" display="inline-block" className='list-item-icon'>{endIcon}</Tag>}
        </Tag>
    )
}

const ListItem = forwardRef(_ListItem) as typeof _ListItem
export default ListItem