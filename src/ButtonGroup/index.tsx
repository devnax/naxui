'use client'
import React, { ReactElement, useMemo, Children, cloneElement } from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';
import { ButtonProps } from '../Button';
import { UseUIVariantTypes, UseUIVariantColorTypes } from '../useUIVariant'

export type ButtonGroupProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, 'children' | "size"> & {
    children?: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
    color?: UseUIVariantColorTypes;
    variant?: UseUIVariantTypes;
    softness?: number;
    size?: ButtonProps['size']
}

const _ButtonGroup = <T extends TagComponentType = "div">({ children, color, variant, softness, size, ...rest }: ButtonGroupProps<T>, ref: React.Ref<any>) => {

    const buttons = useMemo(() => {
        return Children.map(children, (child: any) => {
            return cloneElement(child, {
                flex: 1,
                color,
                variant,
                softness,
                size
            })
        })

    }, [children])

    return (
        <Tag
            baseClass='button-group'
            {...rest}
            ref={ref}
            display="inline-flex"
            sx={{
                '& button:not(:last-of-type)': {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRight: "1px solid",
                },
                '& button:not(:first-of-type)': {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeft: 0
                }
            }}
        >
            {buttons as any}
        </Tag>
    )
}

const ButtonGroup = React.forwardRef(_ButtonGroup) as typeof _ButtonGroup
export default ButtonGroup


