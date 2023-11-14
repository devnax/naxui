'use client'
import React, { ReactElement } from 'react'
import Scrollbar, { ScrollbarProps } from '../Scrollbar'

import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type ViewBoxProps<T extends TagComponenntType = "div"> = TagProps<T> & {
    header?: ReactElement;
    footer?: ReactElement;
    scrollbarProps?: Omit<ScrollbarProps, 'children'>;
    horizental?: boolean;
}


const _ViewBox = ({ header, footer, children, scrollbarProps, horizental, ...rest }: ViewBoxProps, ref?: any) => {
    return (
        <Tag
            flexBox
            justifyContent="space-between"
            {...rest}
            baseClass='viewbox'
            flexDirection={horizental ? "row" : "column"}
            ref={ref}
        >
            {header && <Tag baseClass='viewbox-header' flexBox flexDirection={horizental ? "row" : "column"}>{header}</Tag>}
            <Scrollbar
                {...scrollbarProps}
                className='ui-viewbox-content'
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: horizental ? "row" : "column",
                    ...(scrollbarProps?.style || {})
                }}
            >
                {children}
            </Scrollbar>
            {footer && <Tag baseClass='viewbox-footer' flexBox flexDirection={horizental ? "row" : "column"}>{footer}</Tag>}
        </Tag>
    )
}


const ViewBox = React.forwardRef(_ViewBox) as typeof _ViewBox
export default ViewBox
