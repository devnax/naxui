'use client'
import React, { ReactElement, forwardRef } from 'react';
import { Tag, TagProps, TagComponenntType, useInterface, useColorTemplate, useColorTemplateColors, useColorTemplateType } from 'naxui-manager';
import useCornerVariant, { UseCornerVariantTypes } from '../useCornerVariant'
import CircleProgress from '../CircleProgress'

export type ButtonProps<T extends TagComponenntType = 'button'> = Omit<TagProps<T>, "color" | "size"> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    corner?: UseCornerVariantTypes;
    size?: "small" | "medium" | "large";
    loading?: boolean;
}


const _Button = <T extends TagComponenntType = 'button'>({ children, ...rest }: ButtonProps<T>, ref: React.Ref<any>) => {
    rest.sx = (rest as any).sx || {};
    let { variant, startIcon, endIcon, color, corner, size, loading, ..._props } = useInterface('Button', {
        variant: "fill",
        color: "brand",
        corner: "rounded",
        size: "medium"
    }, rest)

    const template = useColorTemplate(color, variant)
    const cornerCss = useCornerVariant(corner)

    const sizes: any = {
        small: {
            px: 1.2,
            py: .5,
            fontSize: "small"
        },
        medium: {
            px: 2,
            py: 1,
        },
        large: {
            px: 2,
            py: 1,
            fontSize: "text"
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
            fontFamily="theme"
            fontSize="button"
            fontWeight="button"
            display="inline-flex"
            textTransform="uppercase"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            lineHeight={!(startIcon || endIcon) ? 1.75 : "button"}
            position="relative"
            overflow="hidden"
            {...cornerCss}
            {...(sizes[size as any] || {})}
            {..._props}
            {...template}
            hover={{
                ...template.hover,
                ...((_props as any).hover || {})
            }}
            disabled={loading ?? _props.disabled ?? false}
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
                }}
            >
                <CircleProgress
                    color={color === 'default' ? `brand` : "default"}
                    hideTrack
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
