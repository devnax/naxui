'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type TextProps<T extends TagComponenntType = "p"> = TagProps<T> & {
    variant?: "text" | "subtext" | "button" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const _Text = <T extends TagComponenntType = "p">({ children, variant, ...rest }: TextProps<T>, ref?: React.Ref<any>) => {
    let comp: any = variant === 'text' || variant === 'subtext' ? "p" : variant

    return (
        <Tag
            baseClass='text'
            typography={variant || "text"}
            component={comp || "p"}
            {...rest}
            ref={ref}
        >{children}</Tag>
    )
}
const Text = forwardRef(_Text) as typeof _Text
export default Text
