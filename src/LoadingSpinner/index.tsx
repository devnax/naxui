"use client"
import React from "react"
import { Tag, TagProps, TagComponenntType, keyframes } from 'naxui-manager';

export type LoadingSpinnerProps<T extends TagComponenntType = "div"> = TagProps<T> & {

}

const _LoadingSpinner = <T extends TagComponenntType = "div">({ children, ...rest }: LoadingSpinnerProps<T>, ref: React.Ref<any>) => {
    const animrotate = keyframes({ "100%": { transform: "rotate(360deg)" } })
    const animdash = keyframes({
        "0%": { strokeDasharray: "1, 150", strokeDashoffset: 0 },
        "50%": { strokeDasharray: "90, 150", strokeDashoffset: -35 },
        "100%": { strokeDasharray: "90, 150", strokeDashoffset: -124 }
    })

    return (
        <Tag
            baseClass='LoadingSpinner'
            display="inline-block"
            position="relative"

            {...rest}
            sx={{
                width: "30px",
                height: "30px",
                ...(rest?.sx as any || {}),
                "& svg": {
                    animation: `${animrotate} 1.5s linear infinite`,
                    zIndex: 2,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    margin: "-25px 0 0 -25px",
                    width: "100%",
                    height: "100%",
                    "& circle": {
                        stroke: "color.paper.dark",
                        strokeLinecap: "round",
                        animation: `${animdash} 1.3s ease-in-out infinite`
                    }
                }
            }}
            ref={ref}
        >
            <svg viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
            </svg>
        </Tag >
    )
}

const LoadingSpinner = React.forwardRef(_LoadingSpinner) as typeof _LoadingSpinner
export default LoadingSpinner

