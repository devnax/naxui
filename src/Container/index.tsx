'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useTheme } from 'naxui-manager';

export type ContainerProps<T extends TagComponentType = "div"> = TagProps<T> & {
    maxWidth?: 'lg' | 'md' | "sm" | 'xs'
}

const _Container = <T extends TagComponentType = "div">({ children, maxWidth, ...rest }: ContainerProps<T>, ref?: React.Ref<any>) => {
    const { breakpoints } = useTheme()
    maxWidth = maxWidth || "lg"
    return (
        <Tag
            {...rest}
            sxr={{
                width: "100%",
                maxWidth: {
                    xs: "100%",
                    [maxWidth as any]: (breakpoints as any)[maxWidth]
                },
                mx: "auto",
                px: 2,
            }}
            baseClass="container"
            ref={ref}
        >{children}</Tag>
    )
}
const Container = React.forwardRef(_Container) as typeof _Container
export default Container


