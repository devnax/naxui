'use client'
import React, { ReactElement, forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import useUIVariant, { UseUIVariantTypes, UseUIVariantColorTypes } from '../useUIVariant'
import useCornerVariant, { UseCornerVariantTypes } from '../useCornerVariant'


export type ButtonProps<T extends TagComponenntType = 'button'> = Omit<TagProps<T>, "color"> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    color?: UseUIVariantColorTypes;
    variant?: UseUIVariantTypes;
    softness?: number;
    corner?: UseCornerVariantTypes;
}


const Button = <T extends TagComponenntType = 'button'>({ children, variant, startIcon, endIcon, color, softness, corner, ...rest }: ButtonProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    variant = variant || "filled"
    color = color || "primary"
    corner = corner || "rounded"
    const cornerCss = useCornerVariant(corner)
    const uiCss = useUIVariant(variant, color, softness)
    const uiHoverCss = useUIVariant(variant, color, softness === undefined ? 1.1 : parseFloat(softness as any) + .1)

    return (
        <Tag
            component='button'
            baseClass='button'
            border={0}
            height={44}
            cursor="pointer"
            typography="button"
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            transition="background .3s"
            px={2}
            {...cornerCss}
            {...uiCss}
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
export default forwardRef(Button) as typeof Button
