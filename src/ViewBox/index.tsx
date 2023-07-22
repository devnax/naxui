import React, { ReactElement } from 'react'
import Stack, { StackProps } from '../Stack'
import Scrollbar, { ScrollbarProps } from '../Scrollbar'

export type ViewBoxProps = StackProps & {
    header?: ReactElement;
    footer?: ReactElement;
    scrollbarProps?: Omit<ScrollbarProps, 'children'>;
    horizental?: boolean;
}

const ViewBox = ({ header, footer, children, scrollbarProps, horizental, ...rest }: ViewBoxProps) => {
    return (
        <Stack
            justifyContent="space-between"
            {...rest}
            flexDirection={horizental ? "row" : "column"}
        >
            {header && <Stack flexDirection={horizental ? "row" : "column"}>{header}</Stack>}
            <Scrollbar
                {...scrollbarProps}
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: horizental ? "row" : "column",
                    ...(scrollbarProps?.style || {})
                }}
            >
                {children}
            </Scrollbar>
            {footer && <Stack flexDirection={horizental ? "row" : "column"}>{footer}</Stack>}
        </Stack>
    )
}

export default ViewBox