'use client'
import React, { ReactElement } from 'react'
import Scrollbar, { ScrollbarProps } from '../Scrollbar'

import { Tag, TagProps, TagComponentType, useInterface } from 'naxui-manager';

export type ViewBoxProps<T extends TagComponentType = "div"> = TagProps<T> & {
    startContent?: ReactElement;
    endContent?: ReactElement;
    horizental?: boolean;
    slotProps?: {
        scrollbar?: Omit<ScrollbarProps, 'children'>;
    }
}


const _ViewBox = ({ children, ...rest }: ViewBoxProps, ref?: any) => {
    let [{ startContent, endContent, slotProps, horizental, ...props }] = useInterface<any>("ViewBox", rest, {})

    return (
        <Tag
            {...props}
            sxr={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: horizental ? "row" : "column"
            }}
            baseClass='viewbox'
            ref={ref}
        >
            {startContent && <Tag baseClass='viewbox-start-content' flexBox flexDirection={horizental ? "row" : "column"}>{startContent}</Tag>}
            <Scrollbar
                {...slotProps?.scrollbar}
                className='viewbox-content'
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: horizental ? "row" : "column",
                    ...(slotProps?.scrollbar?.style || {})
                }}
            >
                {children}
            </Scrollbar>
            {endContent && <Tag baseClass='viewbox-end-content' flexBox flexDirection={horizental ? "row" : "column"}>{endContent}</Tag>}
        </Tag>
    )
}


const ViewBox = React.forwardRef(_ViewBox) as typeof _ViewBox
export default ViewBox
