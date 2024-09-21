"use client"
import React from "react"
import { Tag, TagProps, TagComponenntType, keyframes, useTheme } from 'naxui-manager';

export type CircleProgressProps<T extends TagComponenntType = "div"> = Omit<TagProps<T>, "color"> & {
    size?: number;
    thumbSize?: number;
    color?: "default" | "brand" | "accent" | "info" | "success" | "error" | "warning";
    value?: number;
    hideTrack?: boolean;
    trackSize?: number;
    showPercentage?: boolean;
    speed?: number;
    trackColor?: string;
    thumbColor?: string;
}

const _CircleProgress = <T extends TagComponenntType = "div">({ children, color, size, value, thumbSize, hideTrack, trackSize, showPercentage, speed, trackColor, thumbColor, ...rest }: CircleProgressProps<T>, ref: React.Ref<any>) => {

    color = color ?? "brand"
    size = size ?? 30
    thumbSize = thumbSize ?? 4
    speed = speed ?? 1.3
    let isVal = typeof value === 'number'
    const theme = useTheme()
    const animrotate = !isVal && keyframes({ "100%": { transform: "rotate(360deg)" } }, theme)
    const animdash = !isVal && keyframes({
        "0%": { strokeDasharray: "1, 150", strokeDashoffset: 0 },
        "50%": { strokeDasharray: "90, 150", strokeDashoffset: -35 },
        "100%": { strokeDasharray: "90, 150", strokeDashoffset: -124 }
    }, theme)

    if (isVal && (value as number) > 100) value = 100
    const circumference = 125.66370614359172 //radius * 2 * Math.PI
    const percent = circumference - ((value || 0) / 100) * circumference

    if (showPercentage && !children) {
        children = <Tag
            sx={{
                color: color === 'default' ? "text.primary" : `${color}`,
                fontSize: size / 4
            }}
        >{value}%</Tag>
    }

    return (
        <Tag
            {...rest}
            baseClass='circle-progress'
            sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                "& svg[class='circle-progress-svg']": {
                    zIndex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: isVal ? "rotate(-90deg)" : "none",
                    transformOrigin: isVal ? "center" : "initial",
                    animation: isVal ? "none" : `${animrotate} ${speed}s linear infinite`,

                    "& circle.circle-progress-thumb": {
                        strokeDasharray: circumference,
                        strokeDashoffset: percent,
                        stroke: thumbColor || (color === 'default' ? `background.secondary` : `${color}.primary`),
                        fill: "none",
                        strokeWidth: thumbSize,
                        strokeLinecap: "round",
                        animation: isVal ? "none" : `${animdash} ${speed}s ease-in-out infinite`
                    },
                    "& circle.circle-progress-track": {
                        fill: "none",
                        stroke: trackColor || (color === 'default' ? `background.secondary` : `${color}.primary`),
                        strokeWidth: trackSize ?? thumbSize,
                    }
                },
                ...(rest?.sx as any || {}),
                width: size,
                height: size,
                position: "relative"
            }}
            ref={ref}
        >
            <svg viewBox="0 0 50 50" className="circle-progress-svg">
                {!hideTrack && <circle className="circle-progress-track" cx="25" cy="25" r={20} />}
                <circle className="circle-progress-thumb" cx="25" cy="25" r={20} />
            </svg>
            {!!children && <Tag
                sx={{
                    zIndex: 2,
                    width: size - thumbSize,
                    height: size - thumbSize,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    '& *': {
                        maxWidth: size - (thumbSize + 8),
                        maxHeight: size - (thumbSize + 8),
                    }
                }}
            >
                {children}
            </Tag>}
        </Tag >
    )
}

const CircleProgress = React.forwardRef(_CircleProgress) as typeof _CircleProgress
export default CircleProgress

