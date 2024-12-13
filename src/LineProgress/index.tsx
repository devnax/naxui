"use client"
import React, { ReactElement } from "react"
import { Tag, keyframes, useBreakpointProps, useColorTemplateColors, useInterface, useBreakpointPropsType } from 'naxui-manager';

export type LineProgressProps = {
    children?: ReactElement;
    thumbSize?: useBreakpointPropsType<number>;
    color?: useBreakpointPropsType<useColorTemplateColors>;
    value?: useBreakpointPropsType<number>;
    hideTrack?: useBreakpointPropsType<boolean>;
    speed?: useBreakpointPropsType<number>;
}


const _LineProgress = ({ children, ...props }: LineProgressProps, ref: React.Ref<any>) => {
    let [{ color, value, thumbSize, hideTrack, speed }] = useInterface<any>("LineProgress", props, {})
    const _p: any = {}
    if (thumbSize) _p.thumbSize = thumbSize
    if (color) _p.color = color
    if (value) _p.value = value
    if (hideTrack) _p.hideTrack = hideTrack
    if (speed) _p.speed = speed
    const p: any = useBreakpointProps(_p)

    thumbSize = p.thumbSize ?? 4
    color = p.color ?? "brand"
    value = p.value
    hideTrack = p.hideTrack
    speed = p.speed

    let isVal = typeof value === 'number'
    const anim = isVal ? "none" : keyframes({
        "0%": { left: "-40%" },
        "50%": { left: "20%", width: "80%" },
        "100%": { left: "100%", width: "100%" }
    })

    if (isVal && (value as number) > 100) value = 100

    return (
        <Tag
            baseClass='line-progress'
            sxr={{
                display: "flex",
                alignItems: "center",
                width: '100%',
                height: thumbSize,
                position: "relative",
                overflow: "hidden",
                bgcolor: hideTrack ? "transparent" : (color === 'default' ? `background.secondary` : `${color}.alpha`),
                radius: 2,
            }}
            ref={ref}
        >
            <Tag
                component="span"
                baseClass="line-progress-thumb"
                sxr={{
                    bgcolor: color === 'default' ? `divider` : `${color}`,
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

