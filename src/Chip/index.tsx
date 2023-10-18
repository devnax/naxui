'use client'
import React, { ReactElement, forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import useUIVariant, { UseUIVariantTypes, UseUIVariantColorTypes } from '../useUIVariant'
import useCornerVariant, { UseCornerVariantTypes } from '../useCornerVariant'


export type ChipProps<T extends TagComponenntType = 'div'> = Omit<TagProps<T>, "color" | "children"> & {
    label: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    color?: UseUIVariantColorTypes;
    variant?: UseUIVariantTypes;
    corner?: UseCornerVariantTypes;
}


const _Chip = <T extends TagComponenntType = 'div'>({ label, variant, startIcon, endIcon, color, corner, ...rest }: ChipProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    variant = variant || "filled"
    color = color || "primary"
    corner = corner || "circle"
    const cornerCss = useCornerVariant(corner)
    const uiCss = useUIVariant(variant, color)

    return (
        <Tag
            baseClass='chip'
            border={0}
            cursor="pointer"
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            transition="background .3s"
            fontSize="fontsize.block"
            p={.5}
            px={1}
            {...cornerCss}
            {...uiCss}
            {...rest}
            ref={ref}
        >
            {startIcon && <Tag component='span' display="inherit" mr={.5} sx={{ "& svg": { fontSize: "inherit" } }}>{startIcon}</Tag>}
            <Tag flex={1} component='span' display="inherit">{label}</Tag>
            {endIcon && <Tag component='span' display="inherit" ml={.5} sx={{ "& svg": { fontSize: "inherit" } }}>{endIcon}</Tag>}
        </Tag>
    )
}
const Chip = forwardRef(_Chip) as typeof _Chip
export default Chip
