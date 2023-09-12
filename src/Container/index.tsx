'use client'
import React from 'react';
import { Tag, TagProps, css_options, TagComponenntType } from 'naxui-manager';

export type ContainerProps<T extends TagComponenntType = "div"> = TagProps<T> & {
    maxWidth?: 'lg' | 'md' | "sm" | 'xs'
}

const _Container = <T extends TagComponenntType = "div">({ children, maxWidth, className, ...rest }: ContainerProps<T>, ref?: React.Ref<any>) => {
    const { breakpoints } = css_options()
    maxWidth = maxWidth || "lg"
    return (
        <Tag
            baseClass="container"
            width="100%"
            maxWidth={{ xs: "100%", [maxWidth as any]: (breakpoints as any)[maxWidth] } as any}
            mx="auto"
            px={2}
            {...rest}
            ref={ref}
        >{children}</Tag>
    )
}
const Container = React.forwardRef(_Container) as typeof _Container
export default Container


