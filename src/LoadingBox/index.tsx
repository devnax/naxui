'use client'
import React from 'react';
import { Tag, TagProps, TagComponentType, useColorTemplateColors, useInterface, useBreakpointProps } from 'naxui-manager';
import CircleProgress, { CircleProgressProps } from '../CircleProgress';
import { useBreakpoinPropsType } from 'naxui-manager/dist/breakpoint/useBreakpointProps';

export type LoadingBoxProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "color"> & {
    loading?: boolean;
    color?: useBreakpoinPropsType<useColorTemplateColors>;
    slotProps?: {
        CircleProgress?: Omit<CircleProgressProps, "value">
    }

}

const _LoadingBox = <T extends TagComponentType = "div">({ children, ...props }: LoadingBoxProps<T>, ref: React.Ref<any>) => {
    let [{ loading, color, slotProps, ...rest }] = useInterface<any>("LoadingBox", props, {})
    const _p: any = {}
    if (color) _p.color = color
    const p: any = useBreakpointProps(_p)
    color = p.color ?? "brand"

    return (
        <Tag
            baseClass='loading-box'
            {...rest}
            sxr={{
                position: "relative",
                display: "inline-block",
                ...((rest as any).sx || {})
            }}
            disabled={loading ?? rest.disabled ?? false}
            ref={ref}
        >
            {loading && <Tag
                baseClass="loading-box-container"
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

