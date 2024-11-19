'use client'
import React, { Children, cloneElement, ReactElement, useState } from 'react'
import Menu, { MenuProps } from '../Menu'
import { useColorTemplate, useColorTemplateColors, useColorTemplateType } from 'naxui-manager'

export type TooltipProps = {
    children: ReactElement;
    title: string;
    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    placement?: MenuProps['placement']
}

const Tooltip = ({ children, title, variant, color, placement }: TooltipProps) => {
    const [target, setTarget] = useState<any>()
    variant ??= "fill"
    color ??= "default"
    placement ??= "bottom"

    const { hover, ...template } = useColorTemplate(color, variant)

    const content = Children.map(children, (child: any) => {
        return cloneElement(child, {
            onMouseEnter: (e) => setTarget(e.target),
            onMouseLeave: () => setTarget(null)
        })
    })

    return (
        <>
            {content}
            <Menu
                target={target}
                placement={placement}
                slotProps={{
                    content: {
                        p: .5,
                        shadow: 1,
                        ...template
                    }
                }}
            >
                {title}
            </Menu>
        </>
    )
}

export default Tooltip