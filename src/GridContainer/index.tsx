'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';

export type GridContainerProps<T extends TagComponentType = "div"> = TagProps<T>
const _GridContainer = <T extends TagComponentType = "div">({ children, ...rest }: GridContainerProps<T>, ref?: React.Ref<any>) => {
    return (
        <Tag
            {...rest}
            sxr={{
                display: "flex",
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
            }}
            baseClass='grid-container'
            ref={ref}
        >
            {children}
        </Tag>
    )
}
const GridContainer = React.forwardRef(_GridContainer) as typeof _GridContainer
export default GridContainer