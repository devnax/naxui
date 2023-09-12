'use client'
import React, { forwardRef, ReactElement } from 'react'
import { Tag, TagProps, TagComponenntType } from 'naxui-manager'
import Text from '../Text';

export type ListItemProps<T extends TagComponenntType = "li"> = TagProps<T> & {
    selected?: boolean;
    subtitle?: string | ReactElement;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
}


const _ListItem = <T extends TagComponenntType = "li">({ children, selected, startIcon, endIcon, subtitle, ...rest }: ListItemProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            component='li'
            typography='text'
            p={1}
            radius={.5}
            cursor="pointer"
            transition="all .3s"
            userSelect="none"
            display="flex"
            flexDirection="row"
            alignItems="center"
            {...rest}
            baseClass='list-item'
            classNames={[{ "list-item-selected": selected as boolean }, ...(rest.classNames || [])]}
            ref={ref}
        >
            {startIcon && <Tag mr={1} component="span" display="inline-block" className='list-item-icon'>{startIcon}</Tag>}
            <Tag flex={1}>
                {typeof children === "string" ? <Text variant="text" color={selected ? "color.primary.text" : "color.text"}>{children}</Text> : children}
                {
                    subtitle && (typeof subtitle === 'string' ? <Text variant="subtext" className='list-item-subtitle' fontSize={12.5}>{subtitle}</Text> : subtitle)
                }
            </Tag>
            {endIcon && <Tag ml={1} component="span" display="inline-block" className='list-item-icon'>{endIcon}</Tag>}
        </Tag>
    )
}

const ListItem = forwardRef(_ListItem) as typeof _ListItem
export default ListItem