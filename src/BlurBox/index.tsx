'use client'
import React from 'react'
import Box, { BoxProps } from '../Box'
import useBlurCss from './useBlurCss';

export { useBlurCss }
export type BlurBoxProps = BoxProps & {
    blur: number;
    img?: string;
}

const BlurBox = ({ children, blur, img, sx, ...rest }: BlurBoxProps, ref: React.Ref<any>) => {
    blur = blur !== undefined ? blur : 5
    const blurCss = useBlurCss(blur)
    let css: any = {}
    let _dcss = {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
    }
    if (img) {
        css = {
            "&::before": {
                ..._dcss,
                bgImage: img,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }
        }
    }

    if (blur) {
        css = {
            ...css,
            "&::after": {
                ...blurCss,
                ..._dcss
            }
        }
    }

    return (
        <Box
            baseClass='blur'
            position="fixed"
            {...rest}
            sx={{
                position: "relative",
                ...(sx || {} as any),
                ...css
            }}
            ref={ref}
        >
            {children}
        </Box>

    )
}

export default React.forwardRef(BlurBox) as typeof BlurBox