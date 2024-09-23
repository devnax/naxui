'use client'
import React, { forwardRef } from 'react'
import ListItem, { ListItemProps } from '../ListItem'

export type OptionProps = ListItemProps & {
    value: string | number;
}

const _Option = ({ value, children, ...props }: OptionProps, ref: React.Ref<any>) => {
    return (
        <ListItem {...props} ref={ref}>{children}</ListItem>
    )
}

const Option = forwardRef(_Option) as typeof _Option
export default Option