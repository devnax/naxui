'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type GridContainerProps<T extends TagComponenntType = "div"> = TagProps<T>
const _GridContainer = <T extends TagComponenntType = "div">({ children, ...rest }: GridContainerProps<T>, ref?: React.Ref<any>) => {
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
const GridContainer = React.forwardRef(_GridContainer) as typeof _GridContainer
export default GridContainer