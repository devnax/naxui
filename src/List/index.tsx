'use client'
import React, { forwardRef } from 'react'
import { Tag, TagProps, TagComponenntType } from 'naxui-manager'

export type ListProps<T extends TagComponenntType = "ul"> = Omit<TagProps<T>, 'color'> & {
    color?: "primary" | "secondary" | "success" | "warning" | "error"
}

const List = <T extends TagComponenntType = "ul">({ children, sx, color, ...rest }: ListProps<T>, ref: React.Ref<any>) => {
    color = color || "primary"

    return (
        <Tag
            component='ul'
            baseClass='list'
            m={0}
            p={0}
            listStyle="none"
            {...rest}
            sx={{
                '& > *': {
                    mb: .4
                },
                "& .list-item:not(.list-item-selected):hover": {
                    bgcolor: "background.default"
                },
                "& .list-item-selected": {
                    bgcolor: `${color}.color`,
                    color: `${color}.text`,
                },
                "& .list-item-selected .list-item-icon": {
                    color: `${color}.text`
                },
                "& .list-item-selected .list-item-subtitle": {
                    color: `${color}.text`
                },
                "& .list-item-icon": {
                    color: "text.secondary"
                },
                ...(sx || {} as any)
            }}
            ref={ref}
        >
            {children}
        </Tag>
    )
}

export default forwardRef(List) as typeof List