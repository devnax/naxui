'use client'
import React, { ReactElement } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplateColors, useColorTemplate } from 'naxui-manager';
import Transition, { TransitionProps } from '../Transition';


export type BadgeProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "baseClass" | "content"> & {
    content?: number | ReactElement;
    color?: useColorTemplateColors;
    placement?: "left-top" | "left-bottom" | "right-top" | "right-bottom";
    visible?: boolean;
    slotProps?: {
        transition?: Omit<TransitionProps, "open">
    }
}

const _Badge = <T extends TagComponentType = "div">({ children, content, ...rest }: BadgeProps<T>, ref: React.Ref<any>) => {
    let [{ color, placement, visible, slotProps, ...props }] = useInterface<any>("Badge", rest, {})
    color ??= "danger"
    visible ??= true
    placement = placement || "right-top"
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

    return (
        <Tag
            {...props}
            position="relative"
            display="inline-block"
            baseClass='badge'
            ref={ref}
        >
            <Transition
                variant="zoom"
                easing="easeInOut"
                duration={150}
                {...slotProps?.transition}
                open={visible}
            >
                <Tag
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
            </Transition>
            {children}
        </Tag>
    )
}

const Badge = React.forwardRef(_Badge) as typeof _Badge
export default Badge

