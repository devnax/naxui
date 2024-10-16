'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type TextProps<T extends TagComponentType = "p"> = TagProps<T> & {
    variant?: "text" | "button" | "small" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const _Text = <T extends TagComponentType = "p">({ children, variant, ...props }: TextProps<T>, ref?: React.Ref<any>) => {
    return (
        <Tag
            component={variant === 'text' || variant === 'small' ? "p" : variant}
            fontSize={variant}
            lineHeight={variant}
            fontWeight={variant}
            fontFamily="default"
            color="text.primary"
            {...props}
            baseClass='text'
            ref={ref}
        >{children}</Tag>
    )
}
const Text = forwardRef(_Text) as typeof _Text
export default Text
