'use client'
import React, { ReactElement, forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import useUIVariant, { UseUIVariantTypes, UseUIVariantColorTypes } from '../useUIVariant'
import useCornerVariant, { UseCornerVariantTypes } from '../useCornerVariant'
import CircleProgress from '../CircleProgress'

export type ButtonProps<T extends TagComponenntType = 'button'> = Omit<TagProps<T>, "color" | "size"> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    color?: UseUIVariantColorTypes;
    variant?: UseUIVariantTypes;
    corner?: UseCornerVariantTypes;
    size?: "small" | "medium" | "large";
    loading?: boolean;
}


const _Button = <T extends TagComponenntType = 'button'>({ children, variant, startIcon, endIcon, color, corner, size, loading, ...rest }: ButtonProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    variant = variant || "filled"
    color = color || "primary"
    corner = corner || "rounded"
    size = size ?? "medium"
    const cornerCss = useCornerVariant(corner)
    const uiCss: any = useUIVariant(variant, color)

    const sizes = {
        small: {
            px: 1.2,
            py: .5,
            fontSize: "fontsize.block"
        },
        medium: {
            px: 2,
            py: 1,
        },
        large: {
            px: 2,
            py: 1,
            fontSize: "fontsize.text"
        }
    }

    const progressSizes: any = {
        small: 20,
        medium: 25,
        large: 30
    }

    return (
        <Tag
            component='button'
            baseClass='button'
            border={0}
            cursor="pointer"
            typography="button"
            display="inline-flex"
            textTransform="uppercase"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            lineHeight={!(startIcon || endIcon) ? 1.75 : "inherit"}
            position="relative"
            overflow="hidden"
            {...cornerCss}
            {...uiCss}
            {...(sizes[size] || {})}
            {...rest}
            hover={{
                ...uiCss.hover,
                ...((rest as any).hover || {})
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
                    bgcolor: `color.${color}`
                }}
            >
                <CircleProgress
                    color="paper"
                    hideTrack
                    thumbColor={color === 'paper' ? `color.paper.dark` : `color.${color}.text`}
                    size={progressSizes[size]}
                />
            </Tag>}

            {startIcon && <Tag component='span' mr={1} ml={-.5} display="inline-block">{startIcon}</Tag>}
            {children}
            {endIcon && <Tag component='span' ml={1} mr={-.5} display="inline-block">{endIcon}</Tag>}
        </Tag>
    )
}
const Button = forwardRef(_Button) as typeof _Button
export default Button
