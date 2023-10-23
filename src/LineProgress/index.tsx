"use client"
import React from "react"
import { Tag, TagProps, TagComponenntType, keyframes } from 'naxui-manager';
import { UseUIVariantColorTypes } from "../useUIVariant";

export type LineProgressProps<T extends TagComponenntType = "div"> = Omit<TagProps<T>, "color"> & {
    thumbSize?: number;
    color?: UseUIVariantColorTypes;
    value?: number;
    hideTrack?: boolean;
    showPercentage?: boolean;
    duration?: number;
}


const _LineProgress = <T extends TagComponenntType = "div">({ children, color, value, thumbSize, hideTrack, showPercentage, duration, ...rest }: LineProgressProps<T>, ref: React.Ref<any>) => {

    color = color ?? "primary"
    thumbSize = thumbSize ?? 4
    hideTrack = hideTrack ?? false
    duration = duration ?? 1
    let isVal = value != undefined

    const anim = isVal ? "none" : keyframes({
        "0%": { left: "-40%" },
        "50%": { left: "20%", width: "80%" },
        "100%": { left: "100%", width: "100%" }
    })

    if (value != undefined && value > 100) value = 100

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
                bgcolor: hideTrack ? "transparent" : (color === 'paper' ? `color.paper` : `color.${color}.soft`),
                radius: 2,
                ...((rest as any)?.sx || {})
            }}
            ref={ref}
        >
            <Tag
                component="span"
                baseClass="line-progress-thumb"
                sx={{
                    bgcolor: color === 'paper' ? `color.paper.dark` : `color.${color}`,
                    width: isVal ? `${value}%` : "50%",
                    height: thumbSize,
                    radius: 2,
                    position: "absolute",
                    left: 0,
                    animation: isVal ? "none" : `${anim} ${duration}s linear infinite`
                }}
            />
        </Tag >
    )
}

const LineProgress = React.forwardRef(_LineProgress) as typeof _LineProgress
export default LineProgress

