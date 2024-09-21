'use client'
import React, { forwardRef, ReactElement } from 'react'
import { Tag, TagProps, TagComponenntType, useInterface } from 'naxui-manager'
import Text from '../Text';

export type ListItemProps<T extends TagComponenntType = "li"> = TagProps<T> & {
    selected?: boolean;
    subtitle?: string | ReactElement;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
}


const _ListItem = <T extends TagComponenntType = "li">({ children, startIcon, endIcon, subtitle, ...rest }: ListItemProps<T>, ref: React.Ref<any>) => {
    const { selected, ...props } = useInterface("ListItem", {}, rest)
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
            baseClass='listItem'
            classNames={[{ "listItemSelected": selected as boolean }, ...(props.classNames || [])]}
            ref={ref}
        >
            {startIcon && <Tag mr={1} component="span" display="inline-block" className='listItemIcon'>{startIcon}</Tag>}
            <Tag flex={1}>
                {typeof children === "string" ? <Text variant="text" className='listItemText'>{children}</Text> : children}
                {
                    subtitle && (typeof subtitle === 'string' ? <Text variant="text" fontSize="button" className='listItemSubtitle' >{subtitle}</Text> : subtitle)
                }
            </Tag>
            {endIcon && <Tag ml={1} component="span" display="inline-block" className='listItemIcon'>{endIcon}</Tag>}
        </Tag>
    )
}

const ListItem = forwardRef(_ListItem) as typeof _ListItem
export default ListItem