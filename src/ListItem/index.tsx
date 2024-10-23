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
            p={1}
            lineHeight={1.4}
            radius={.5}
            cursor="pointer"
            userSelect="none"
            flexBox
            flexRow
            alignItems="center"
            {...props}
            baseClass='list-item'
            classNames={[{ "list-item-selected": selected as boolean }, ...(props.classNames || [])]}
            ref={ref}
        >
            {startIcon && <Tag mr={1} component="span" display="inline-block" className='list-item-icon'>{startIcon}</Tag>}
            <Tag flex={1}>
                {typeof children === "string" ? <Text variant="text" className='list-item-text'>{children}</Text> : children}
                {
                    subtitle && (typeof subtitle === 'string' ? <Text variant="text" fontSize="button" className='list-item-subtitle' >{subtitle}</Text> : subtitle)
                }
            </Tag>
            {endIcon && <Tag ml={1} component="span" display="inline-block" className='list-item-icon'>{endIcon}</Tag>}
        </Tag>
    )
}

const ListItem = forwardRef(_ListItem) as typeof _ListItem
export default ListItem