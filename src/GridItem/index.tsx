'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type GridItemProps<T extends TagComponenntType = "div"> = TagProps<T> & {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

const _GridItem = <T extends TagComponenntType = "div">({ children, xs, sm, md, lg, xl, ...rest }: GridItemProps<T>, ref?: React.Ref<any>) => {

    let w: any = {}

    xs && (w.xs = (100 / 12 * xs) + "%")
    sm && (w.sm = (100 / 12 * sm) + "%")
    md && (w.md = (100 / 12 * md) + "%")
    lg && (w.lg = (100 / 12 * lg) + "%")
    xl && (w.xl = (100 / 12 * xl) + "%")

    return (
        <Tag
            ref={ref}
            baseClass="grid-item"
            {...rest}
            maxWidth={w}
            flexBasis={w}
            flexGrow={0}
        >
            {children}
        </Tag>
    )
}
const GridItem = React.forwardRef(_GridItem) as typeof _GridItem
export default GridItem