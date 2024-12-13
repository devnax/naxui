'use client'
import React, { Children, cloneElement, ReactElement, useState } from 'react'
import Menu, { MenuProps } from '../Menu'
import { useBreakpointProps, useColorTemplate, useColorTemplateColors, useColorTemplateType } from 'naxui-manager'
import { useBreakpoinPropsType } from 'naxui-manager/dist/breakpoint/useBreakpointProps'

export type TooltipProps = {
    children: ReactElement;
    title: useBreakpoinPropsType<string>;
    color?: useBreakpoinPropsType<useColorTemplateColors>;
    variant?: useBreakpoinPropsType<useColorTemplateType>;
    placement?: MenuProps['placement']
}

const Tooltip = ({ children, title, variant, color, placement }: TooltipProps) => {
    const [target, setTarget] = useState<any>()
    const _p: any = {}
    if (title) _p.title = title
    if (color) _p.color = color
    if (variant) _p.variant = variant
    const p: any = useBreakpointProps(_p)
    title = p.title
    color = p.color ?? "default"
    variant = p.variant ?? "fill"
    placement ??= "bottom"

    const { hover, ...template } = useColorTemplate(color as any, variant as any)

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
                {title as any}
            </Menu>
        </>
    )
}

export default Tooltip