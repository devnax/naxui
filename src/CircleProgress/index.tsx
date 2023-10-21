"use client"
import React from "react"
import { Tag, TagProps, TagComponenntType, keyframes } from 'naxui-manager';
import { UseUIVariantColorTypes } from "../useUIVariant";

export type CircleProgressProps<T extends TagComponenntType = "div"> = Omit<TagProps<T>, "color"> & {
    size?: number;
    thumbSize?: number;
    color?: UseUIVariantColorTypes;
    value?: number;
    track?: boolean;
    trackSize?: number;
    showPercentage?: boolean;
}

const _CircleProgress = <T extends TagComponenntType = "div">({ children, color, size, value, thumbSize, track, trackSize, showPercentage, ...rest }: CircleProgressProps<T>, ref: React.Ref<any>) => {

    color = color ?? "primary"
    size = size ?? 30
    thumbSize = thumbSize ?? 4
    track = track ?? true
    trackSize = trackSize ?? thumbSize
    let isVal = value != undefined

    const animrotate = !isVal && keyframes({ "100%": { transform: "rotate(360deg)" } })
    const animdash = !isVal && keyframes({
        "0%": { strokeDasharray: "1, 150", strokeDashoffset: 0 },
        "50%": { strokeDasharray: "90, 150", strokeDashoffset: -35 },
        "100%": { strokeDasharray: "90, 150", strokeDashoffset: -124 }
    })

    let radius = 20;
    if (value != undefined && value > 100) value = 100
    const circumference = radius * 2 * Math.PI
    const percent = circumference - ((value || 0) / 100) * circumference

    return (
        <Tag
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            {...rest}
            baseClass='circle-progress'
            sx={{
                "& svg.progress-svg-root": {
                    zIndex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transform: isVal ? "rotate(-90deg)" : "none",
                    transformOrigin: isVal ? "center" : "initial",
                    animation: isVal ? "none" : `${animrotate} 1.5s linear infinite`,

                    "& circle.progress-root": {
                        strokeDasharray: circumference,
                        strokeDashoffset: percent,
                        stroke: color === 'paper' ? `color.paper.dark` : `color.${color}`,
                        fill: "none",
                        strokeWidth: thumbSize,
                        strokeLinecap: "round",
                        animation: isVal ? "none" : `${animdash} 1.3s ease-in-out infinite`
                    },
                    "& circle.track-root": {
                        fill: "none",
                        stroke: color === 'paper' ? `color.paper` : `color.${color}.soft`,
                        strokeWidth: trackSize,
                    }
                },
                ...(rest?.sx as any || {}),
                width: size,
                height: size,
                position: "relative"
            }}
            ref={ref}
        >
            <svg viewBox="0 0 50 50" className="progress-svg-root">
                {track && <circle className="track-root track-bar" cx="25" cy="25" r={radius} />}
                <circle className="progress-root progress-bar" cx="25" cy="25" r={radius} />
            </svg>
            {!!children && <Tag
                zIndex={2}
                width={size - thumbSize}
                height={size - thumbSize}
            >
                {children}
            </Tag>}
            {
                !!(!children && showPercentage) && <Tag
                    flexBox
                    justifyContent="center"
                    alignItems="center"
                    color={color === 'paper' ? "color.paper.text" : `color.${color}`}
                    fontSize={size / 4}
                    zIndex={2}
                    width={size - thumbSize}
                    height={size - thumbSize}
                >{value}%</Tag>
            }
        </Tag >
    )
}

const CircleProgress = React.forwardRef(_CircleProgress) as typeof _CircleProgress
export default CircleProgress

