'use client'
import React, { ReactElement } from 'react'
import Scrollbar, { ScrollbarProps } from '../Scrollbar'

import { Tag, TagProps, TagComponenntType, useInterface } from 'naxui-manager';

export type ViewBoxProps<T extends TagComponenntType = "div"> = TagProps<T> & {
    startContent?: ReactElement;
    endContent?: ReactElement;
    horizental?: boolean;
    slotProps?: {
        scrollbar?: Omit<ScrollbarProps, 'children'>;
    }
}


const _ViewBox = ({ children, ...rest }: ViewBoxProps, ref?: any) => {
    const { startContent, endContent, slotProps, horizental, ...props } = useInterface("ViewBox", {}, rest)

    return (
        <Tag
            flexBox
            justifyContent="space-between"
            {...props}
            baseClass='viewbox'
            flexDirection={horizental ? "row" : "column"}
            ref={ref}
        >
            {startContent && <Tag baseClass='viewboxStartContent' flexBox flexDirection={horizental ? "row" : "column"}>{startContent}</Tag>}
            <Scrollbar
                {...slotProps?.scrollbar}
                className='viewboxContent'
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: horizental ? "row" : "column",
                    ...(slotProps?.scrollbar?.style || {})
                }}
            >
                {children}
            </Scrollbar>
            {endContent && <Tag baseClass='viewboxEndContent' flexBox flexDirection={horizental ? "row" : "column"}>{endContent}</Tag>}
        </Tag>
    )
}


const ViewBox = React.forwardRef(_ViewBox) as typeof _ViewBox
export default ViewBox
