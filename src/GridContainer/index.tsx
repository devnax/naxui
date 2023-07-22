'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type GridContainerProps<T extends TagComponenntType = "div"> = TagProps<T>
const GridContainer = <T extends TagComponenntType = "div">({ children, ...rest }: GridContainerProps<T>, ref?: React.Ref<any>) => {
    return (
        <Tag
            baseClass='grid-container'
            display="flex"
            flexDirection='row'
            flexWrap='wrap'
            width={'100%'}
            {...rest}
            ref={ref}
        >
            {children}
        </Tag>
    )
}
export default React.forwardRef(GridContainer) as typeof GridContainer