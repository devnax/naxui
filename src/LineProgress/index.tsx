"use client"
import React from "react"
import { Tag, TagProps, TagComponentType, keyframes, useTheme } from 'naxui-manager';
import { UseUIVariantColorTypes } from "../useUIVariant";

export type LineProgressProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "color"> & {
    thumbSize?: number;
    color?: UseUIVariantColorTypes;
    value?: number;
    hideTrack?: boolean;
    speed?: number;
}


const _LineProgress = <T extends TagComponentType = "div">({ children, color, value, thumbSize, hideTrack, speed, ...rest }: LineProgressProps<T>, ref: React.Ref<any>) => {

    color = color ?? "primary"
    thumbSize = thumbSize ?? 4
    let isVal = typeof value === 'number'
    const theme = useTheme()
    const anim = isVal ? "none" : keyframes({
        "0%": { left: "-40%" },
        "50%": { left: "20%", width: "80%" },
        "100%": { left: "100%", width: "100%" }
    }, theme)

    if (isVal && (value as number) > 100) value = 100

    return (
        <Tag
            {...rest}
            baseClass='line-progress'
            sx={{
                display: "flex",
                alignItems: "center",
                width: '100%',
                height: thumbSize,
                position: "relative",
                overflow: "hidden",
                bgcolor: hideTrack ? "transparent" : (color === 'paper' ? `paper` : `${color}.soft`),
                radius: 2,
                ...((rest as any)?.sx || {})
            }}
            ref={ref}
        >
            <Tag
                component="span"
                baseClass="line-progress-thumb"
                sx={{
                    bgcolor: color === 'paper' ? `background.secondary` : `${color}`,
                    width: isVal ? `${value}%` : "50%",
                    height: thumbSize,
                    position: "absolute",
                    left: 0,
                    animation: isVal ? "none" : `${anim} ${speed ?? 1}s linear infinite`
                }}
            />
        </Tag >
    )
}

const LineProgress = React.forwardRef(_LineProgress) as typeof _LineProgress
export default LineProgress

