'use client'
import React from 'react'
import { Tag, TagProps, TagComponentType } from 'naxui-manager';
import Button from '../Button';

export type TabProps<T extends TagComponentType = "div"> = TagProps<T>

const _Tab = <T extends TagComponentType = "div">({ children, ...props }: TabProps<T>, ref: React.Ref<any>) => {
    return (
        <Button>
            {children}
        </Button>
        // <Tag
        //     {...props}
        //     sxr={{
        //         cursor: "pointer",
        //         color: "text.secondary",
        //         fontWeight: 500,
        //         userSelect: "none",
        //         p: 1.5,
        //         ...((props as any)?.sx || {})
        //     }}
        //     baseClass='tab'
        //     ref={ref}
        // >
        //     {children}
        // </Tag>
    )
}

const Tab = React.forwardRef(_Tab) as typeof _Tab
export default Tab