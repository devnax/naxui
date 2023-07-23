'use client'
import React, { forwardRef } from 'react'
import ListItem, { ListItemProps } from '../ListItem'

export type OptionProps = ListItemProps & {
    value: string | number;
}

const Option = ({ value, children, ...props }: OptionProps, ref: React.Ref<any>) => {
    return (
        <ListItem data-value={value} {...props}>{children}</ListItem>
    )
}

export default forwardRef(Option) as typeof Option