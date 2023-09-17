'use client'
import React, { ReactElement, forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import useUIVariant, { UseUIVariantTypes, UseUIVariantColorTypes } from '../useUIVariant'
import useCornerVariant, { UseCornerVariantTypes } from '../useCornerVariant'


export type ButtonProps<T extends TagComponenntType = 'button'> = Omit<TagProps<T>, "color" | "size"> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    color?: UseUIVariantColorTypes;
    variant?: UseUIVariantTypes;
    softness?: number;
    corner?: UseCornerVariantTypes;
    size?: "small" | "medium" | "large"
}


const _Button = <T extends TagComponenntType = 'button'>({ children, variant, startIcon, endIcon, color, softness, corner, size, ...rest }: ButtonProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    variant = variant || "filled"
    color = color || "primary"
    corner = corner || "rounded"
    const cornerCss = useCornerVariant(corner)
    const uiCss = useUIVariant(variant, color, softness)
    const uiHoverCss = useUIVariant(variant, color, softness === undefined ? .9 : parseFloat(softness as any) + .1)

    const sizes = {
        small: {
            px: 1.2,
            py: .5,
            fontSize: "fontsize.block"
        },
        medium: {
            px: 1.6,
            py: 1.2,
        },
        large: {
            px: 2,
            py: 1,
            fontSize: "fontsize.text"
        }
    }

    return (
        <Tag
            component='button'
            baseClass='button'
            border={0}
            cursor="pointer"
            typography="button"
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            transition="background .3s"
            {...cornerCss}
            {...uiCss}
            {...(sizes[size || "medium"] || {})}
            {...rest}
            hover={{
                ...uiHoverCss,
                ...((rest as any).hover || {})
            }}
            ref={ref}
        >
            {startIcon && <Tag component='span' mr={1}>{startIcon}</Tag>}
            {children}
            {endIcon && <Tag component='span' ml={1}>{endIcon}</Tag>}
        </Tag>
    )
}
const Button = forwardRef(_Button) as typeof _Button
export default Button
