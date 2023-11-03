'use client'
import React from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import { UseUIVariantColorTypes } from '../useUIVariant'

import CircleProgress, { CircleProgressProps } from '../CircleProgress';

export type LoadingBoxProps<T extends TagComponenntType = "div"> = Omit<TagProps<T>, "color"> & {
    loading?: boolean;
    color?: UseUIVariantColorTypes;
    progressProps?: Omit<CircleProgressProps, "value">

}

const _LoadingBox = <T extends TagComponenntType = "div">({ children, loading, color, progressProps, ...rest }: LoadingBoxProps<T>, ref: React.Ref<any>) => {
    color = color ?? "paper"

    return (
        <Tag
            baseClass='loading-box'
            {...rest}
            sx={{
                position: "relative",
                display: "inline-block",
                ...((rest as any).sx || {})
            }}
            disabled={loading ?? rest.disabled ?? false}
            ref={ref}
        >
            {loading && <Tag
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: `color.paper`
                }}
            >
                <CircleProgress
                    color="paper"
                    hideTrack
                    thumbColor={color === 'paper' ? `color.paper.dark` : `color.${color}.text`}
                    {...progressProps}
                />
            </Tag>}
            {children}
        </Tag>
    )
}

const LoadingBox = React.forwardRef(_LoadingBox) as typeof _LoadingBox
export default LoadingBox

