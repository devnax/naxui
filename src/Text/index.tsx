'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type TextProps<T extends TagComponenntType = "p"> = TagProps<T> & {
    variant?: "text" | "button" | "small" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const _Text = <T extends TagComponenntType = "p">({ children, variant, ...props }: TextProps<T>, ref?: React.Ref<any>) => {
    let comp: any = variant === 'text' || variant === 'small' ? "p" : variant
    return (
        <Tag
            component={comp || "p"}
            fontSize={variant}
            lineHeight={variant}
            fontWeight={variant}
            fontFamily="theme"
            {...props}
            baseClass='text'
            ref={ref}
        >{children}</Tag>
    )
}
const Text = forwardRef(_Text) as typeof _Text
export default Text
