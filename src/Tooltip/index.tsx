'use client'
import React, { useState } from 'react'
import Menu from '../Menu'
import Box, { BoxProps } from '../Box'

export type TooltipProps = BoxProps & {
    title: string;
}

const Tooltip = ({ children, title }: BoxProps) => {
    const [target, setTarget] = useState<any>()

    return (
        <>
            <Box
                onMouseEnter={(e) => {
                    setTarget(e.target)
                }}
                onMouseLeave={(e) => {
                    setTarget(null)
                }}
            >
                {children}
            </Box>
            <Menu
                target={target}
                placement='right'
                duration={150}
                p={1}
                radius={1}
            >
                {title}
            </Menu>
        </>
    )
}

export default Tooltip