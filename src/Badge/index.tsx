'use client'
import React, { ReactElement } from 'react';
import { Tag, TagProps, TagComponentType, useTransitions } from 'naxui-manager';
import useUIVariant, { UseUIVariantColorTypes } from '../useUIVariant'


export type BadgeProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "baseClass" | "content"> & {
    content?: number | ReactElement;
    color?: UseUIVariantColorTypes;
    placement?: "left-top" | "left-bottom" | "right-top" | "right-bottom";
    visible?: boolean
}

const _Badge = <T extends TagComponentType = "div">({ children, content, color, placement, visible, ...rest }: BadgeProps<T>, ref: React.Ref<any>) => {
    visible = visible ?? true
    placement = placement || "right-top"
    const colorCss = useUIVariant("filled", color || "error")
    const [_tranRef, _tranCls] = useTransitions("zoom", visible)

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
            {...rest}
            position="relative"
            display="inline-block"
            baseClass='badge-root'
            ref={ref}
        >
            <Tag
                ref={_tranRef}
                className={_tranCls}
                component='span'
                baseClass='badge-content'
                position="absolute"
                zIndex={1}
                {...colorCss}
                radius={2}
                flexBox
                justifyContent="center"
                alignItems="center"
                fontWeight={500}
                fontSize={11}
                {..._css}
            >
                {typeof content === 'number' ? (content >= 100 ? "99+" : content) : content}
            </Tag>
            {children}
        </Tag>
    )
}

const Badge = React.forwardRef(_Badge) as typeof _Badge
export default Badge

