'use client'
import React, { ReactElement, forwardRef } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplate, useColorTemplateColors, useColorTemplateType } from 'naxui-manager';
import useCorner, { UseCornerTypes } from '../useCorner'
import CircleProgress, { CircleProgressProps } from '../CircleProgress'

export type ButtonProps<T extends TagComponentType = 'button'> = Omit<TagProps<T>, "color" | "size" | "direction"> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    corner?: UseCornerTypes;
    size?: "small" | "medium" | "large";
    loading?: boolean;
    direction?: "row" | "column";
    slotProps?: {
        loading?: Omit<CircleProgressProps, "color" | "hideTrack" | "size">
    }
}


const _Button = <T extends TagComponentType = 'button'>({ children, ...rest }: ButtonProps<T>, ref: React.Ref<any>) => {
    let [{ variant, startIcon, endIcon, color, corner, size, loading, direction, slotProps, ..._props }] = useInterface<any>('Button', rest, {
        variant: "fill",
        color: "brand",
        corner: "rounded",
        size: "medium"
    })

    direction ??= "row"

    const { hover: templateHover, ...templatecss } = useColorTemplate(color, variant)
    const cornerCss = useCorner(corner)

    const sizes: any = {
        small: {
            height: 32,
            px: 2,
            gap: .5,
            fontSize: 12
        },
        medium: {
            height: 40,
            px: 2,
            gap: 1,
            fontSize: 14
        },
        large: {
            height: 52,
            px: 3,
            gap: 1,
            fontSize: 16
        }
    }

    const progressSizes: any = {
        small: 20,
        medium: 25,
        large: 30
    }

    let _size = (sizes[size as any] || {})
    if (direction === 'column') {
        delete _size.height
        _size.gap = .5
        _size.py = 1
    }

    return (
        <Tag
            component='button'
            baseClass='button'
            {..._props}
            sxr={{
                flexShrink: "0",
                whiteSpace: "nowrap",
                border: 0,
                cursor: "pointer",
                font: "button",
                display: "flex",
                textTransform: "uppercase",
                flexDirection: direction,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                userSelect: "none",
                ..._size,
                ...cornerCss,
                ...templatecss,
            }}
            hover={{
                ...templateHover,
                ...((_props as any)?.hover || {})
            }}
            disabled={loading ?? _props.disabled ?? false}
            ref={ref}
        >
            {loading && <Tag
                baseClass='button-loading-container'
                sxr={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircleProgress
                    {...slotProps?.loading}
                    color={color === 'default' ? `brand` : "default"}
                    hideTrack
                    size={progressSizes[size]}
                    className='button-loading-progress'
                />
            </Tag>}
            {startIcon && <Tag
                baseClass='button-start-icon'
                component='span'
                display="inline-block"
            >{startIcon}</Tag>}
            {children}
            {endIcon && <Tag
                baseClass='button-end-icon'
                component='span'
                display="inline-block"
            >{endIcon}</Tag>}
        </Tag>
    )
}
const Button = forwardRef(_Button) as typeof _Button
export default Button
