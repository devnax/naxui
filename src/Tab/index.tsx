'use client'
import React from 'react'
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type TabProps<T extends TagComponentType = "div"> = TagProps<T>

const _Tab = <T extends TagComponentType = "div">({ children, ...props }: TabProps<T>, ref: React.Ref<any>) => {
    return (
        <Tag
            p={1.5}
            cursor="pointer"
            color="subtext"
            fontWeight={500}
            userSelect="none"
            {...props}
            baseClass='tab-root'
            ref={ref}
        >
            {children}
        </Tag>
    )
}

const Tab = React.forwardRef(_Tab) as typeof _Tab
export default Tab