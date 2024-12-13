'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponentType, useBreakpointProps } from 'naxui-manager';
import { useBreakpoinPropsType } from 'naxui-manager/dist/breakpoint/useBreakpointProps';

export type TextProps<T extends TagComponentType = "p"> = TagProps<T> & {
    variant?: useBreakpoinPropsType<"text" | "button" | "small" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6">
}

const _Text = <T extends TagComponentType = "p">({ children, variant, ...props }: TextProps<T>, ref?: React.Ref<any>) => {
    const _p: any = {}
    if (variant) _p.variant = variant
    const p: any = useBreakpointProps(_p)
    variant = p.variant ?? 'text'

    return (
        <Tag
            component={variant === 'text' || variant === 'small' ? "p" : variant}
            {...props}
            sxr={{
                fontSize: variant,
                lineHeight: variant,
                fontWeight: variant,
                color: "text.primary",
                ...(props as any)?.sx
            }}
            baseClass='text'
            ref={ref}
        >{children}</Tag>
    )
}
const Text = forwardRef(_Text) as typeof _Text
export default Text
