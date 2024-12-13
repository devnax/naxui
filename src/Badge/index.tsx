'use client'
import React, { ReactElement } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplateColors, useColorTemplate, useBreakpointPropsType, useBreakpointProps } from 'naxui-manager';
import Transition, { TransitionProps } from '../Transition';


export type BadgeProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "baseClass" | "content"> & {
    content?: useBreakpointPropsType<number | ReactElement>;
    color?: useBreakpointPropsType<useColorTemplateColors>;
    placement?: useBreakpointPropsType<"left-top" | "left-bottom" | "right-top" | "right-bottom">;
    visible?: useBreakpointPropsType<boolean>;
    disableTransition?: useBreakpointPropsType<boolean>;
    slotProps?: {
        transition?: Omit<TransitionProps, "open">
    }
}

const _Badge = <T extends TagComponentType = "div">({ children, content, ...rest }: BadgeProps<T>, ref: React.Ref<any>) => {
    let [{ color, placement, visible, disableTransition, slotProps, ...props }] = useInterface<any>("Badge", rest, {})
    color ??= "danger"
    visible ??= true
    placement ??= "right-top"

    const _p: any = {}

    if (content) _p.content = content
    if (color) _p.color = color
    if (placement) _p.placement = placement
    if (visible) _p.visible = visible
    if (disableTransition) _p.disableTransition = disableTransition

    const p: any = useBreakpointProps(_p)

    content = p.content
    color = p.color
    placement = p.placement
    visible = p.visible
    disableTransition = p.disableTransition

    const template = useColorTemplate(color, "fill")
    delete template.hover
    let _css: any = {}
    let pos = -3;
    if (typeof content === "number") {
        if (content.toString().length === 2) {
            pos = -5
        } else if (content.toString().length > 2) {
            pos = -8
        }
    }

    switch (placement) {
        case "left-top":
            _css = { top: content ? pos : 0, left: content ? pos : 0 }
            break;
        case "left-bottom":
            _css = { bottom: content ? pos : 0, left: content ? pos : 0 }
            break;
        case "right-top":
            _css = { top: content ? pos : 0, right: content ? pos : 0 }
            break;
        case "right-bottom":
            _css = { bottom: content ? pos : 0, right: content ? pos : 0 }
            break;
    }
    if (content) {
        _css.minWidth = 16
        _css.height = 16
        _css.height = 16
        _css.p = .8
        _css.px = .4
    } else {
        _css.width = 8
        _css.height = 8
    }

    let badgeContent = <Tag
        component='span'
        baseClass='badge-content'
        sxr={{
            position: "absolute",
            zIndex: 1,
            radius: 2,
            display: 'flex',
            justifyContent: "center",
            alignItems: 'center',
            fontWeight: 500,
            fontSize: 11
        }}
        {...template}
        {..._css}
    >
        {typeof content === 'number' ? (content >= 100 ? "99+" : content) : content}
    </Tag>

    return (
        <Tag
            {...props}
            position="relative"
            display="inline-block"
            baseClass='badge'
            ref={ref}
        >
            {
                disableTransition ? badgeContent : <Transition
                    variant="zoom"
                    easing="easeInOut"
                    duration={200}
                    {...slotProps?.transition}
                    open={visible}
                >
                    {badgeContent}
                </Transition>
            }

            {children}
        </Tag>
    )
}

const Badge = React.forwardRef(_Badge) as typeof _Badge
export default Badge

