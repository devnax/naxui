'use client'
import React from 'react'
import { TagComponentType, useInterface } from 'naxui-manager';
import Button, { ButtonProps } from '../Button';

export type TabProps<T extends TagComponentType = "button"> = ButtonProps<T> & {
    value?: string | number
}

const _Tab = <T extends TagComponentType = "div">({ children, ...props }: TabProps<T>, ref: React.Ref<any>) => {
    let [_props] = useInterface<any>("Tab", props, {})
    return (
        <Button
            {..._props}
            classNames={["tab", ...(_props?.classNames || [])]}
            ref={ref}
        >
            {children}
        </Button>
    )
}

const Tab = React.forwardRef(_Tab) as typeof _Tab
export default Tab