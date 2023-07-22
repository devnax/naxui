import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type StackProps<T extends TagComponenntType = "div"> = TagProps<T>

const Stack = <T extends TagComponenntType = "div">({ children, ...rest }: StackProps<T>, ref?: React.Ref<any>) => {
    return (
        <Tag display="flex" flexDirection="column" baseClass='stack' {...rest} ref={ref}>{children}</Tag>
    )
}
export default forwardRef(Stack) as typeof Stack
