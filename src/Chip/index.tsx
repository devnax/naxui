'use client'
import React, { ReactElement, forwardRef } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplate, useColorTemplateColors, useColorTemplateType } from 'naxui-manager';
import useCorner, { UseCornerTypes } from '../useCorner'


export type ChipProps<T extends TagComponentType = 'div'> = Omit<TagProps<T>, "color" | "children" | "size"> & {
    label: string | ReactElement;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    corner?: UseCornerTypes;
    size?: "small" | "medium" | "large";
}


const _Chip = <T extends TagComponentType = 'div'>(props: ChipProps<T>, ref: React.Ref<any>) => {
    let [{ label, variant, startIcon, endIcon, color, corner, size, ...rest }] = useInterface<any>("Chip", props, {})
    rest.sx = (rest as any).sx || {};
    variant ??= "fill"
    color ??= "brand"
    corner ??= "circle"
    size ??= "medium"
    const cornerCss = useCorner(corner)
    const template = useColorTemplate(color, variant)
    delete template?.hover

    const sizes: any = {
        small: {
            height: 24,
            gap: .5,
            fontSize: 12
        },
        medium: {
            height: 34,
            gap: 1,
            fontSize: 14,
        },
        large: {
            height: 38,
            fontSize: 15,
            gap: 1,
        }
    }

    return (
        <Tag
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            transition="background .3s"
            fontFamily="default"
            overflow="hidden"
            px={startIcon || endIcon ? 1 : 1.5}
            {...cornerCss}
            {...template}
            {...(sizes[size as any] || {})}
            {...rest}
            baseClass='chip'
            ref={ref}
        >
            {startIcon}
            <Tag
                sxr={{
                    alignItems: "center",
                    flexBox: true
                }}
            >{label}</Tag>
            {endIcon}
        </Tag>
    )
}
const Chip = forwardRef(_Chip) as typeof _Chip
export default Chip
