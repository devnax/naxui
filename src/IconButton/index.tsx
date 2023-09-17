'use client'
import React, { forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

import useUIVariant, { UseUIVariantTypes, UseUIVariantColorTypes } from '../useUIVariant'
import useCornerVariant, { UseCornerVariantTypes } from '../useCornerVariant'


export type IconButtonProps<T extends TagComponenntType = 'button'> = Omit<TagProps<T>, "color"> & {
    size?: number;
    color?: UseUIVariantColorTypes;
    variant?: UseUIVariantTypes;
    softness?: number;
    corner?: UseCornerVariantTypes;
}

const _IconButton = <T extends TagComponenntType = 'button'>({ children, variant, corner, softness, color, size, ...rest }: IconButtonProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    size = size || 40
    color = color || "primary"
    corner = corner || "circle"

    const cornerCss = useCornerVariant(corner)
    const uiCss = useUIVariant(variant || "text", color, softness)
    if (!variant) {
        softness = 0
    }
    const uiHoverCss = useUIVariant(variant || "filled", color, softness === undefined ? .9 : parseFloat(softness as any) + .1)

    return (
        <Tag
            component='button'
            baseClass='button'
            border={0}
            radius={size}
            height={size}
            width={size}
            cursor="pointer"
            typography="button"
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            transition="background .3s"
            bgcolor="transparent"
            ref={ref}
            {...cornerCss}
            {...uiCss}
            {...rest}
            hover={{
                ...uiHoverCss,
                ...((rest as any).hover || {})
            }}
        >
            {children}
        </Tag>
    )
}
const IconButton = forwardRef(_IconButton) as typeof _IconButton
export default IconButton
