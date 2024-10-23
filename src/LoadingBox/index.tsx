'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useColorTemplateColors, useInterface } from 'naxui-manager';
import CircleProgress, { CircleProgressProps } from '../CircleProgress';

export type LoadingBoxProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "color"> & {
    loading?: boolean;
    color?: useColorTemplateColors;
    slotProps?: {
        CircleProgress?: Omit<CircleProgressProps, "value">
    }

}

const _LoadingBox = <T extends TagComponentType = "div">({ children, ...rest }: LoadingBoxProps<T>, ref: React.Ref<any>) => {
    let [{ loading, color, slotProps }] = useInterface<any>("LoadingBox", rest, {})
    color = color ?? "brand"

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
                baseClass="loading-box-container"
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
                    bgcolor: "background.alpha"
                }}
            >
                <CircleProgress
                    color="brand"
                    hideTrack
                    {...slotProps?.CircleProgress}
                />
            </Tag>}
            {children}
        </Tag>
    )
}

const LoadingBox = React.forwardRef(_LoadingBox) as typeof _LoadingBox
export default LoadingBox

