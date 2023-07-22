import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import { ThemeTypographyOptions } from 'naxui-manager';

export type TextProps<T extends TagComponenntType = "p"> = TagProps<T> & {
    variant?: keyof ThemeTypographyOptions
}

const Text = <T extends TagComponenntType = "p">({ children, variant, ...rest }: TextProps<T>, ref?: React.Ref<any>) => {
    let comp: any = variant === 'text' || variant === 'subtext' ? "p" : variant

    return (
        <Tag
            baseClass='text'
            typography={variant || "text"}
            component={comp}
            {...rest}
            ref={ref}
        >{children}</Tag>
    )
}
export default forwardRef(Text) as typeof Text
