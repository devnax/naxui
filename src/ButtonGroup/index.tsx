'use client'
import React, { ReactElement, Children, cloneElement } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplateColors, useColorTemplateType, useColorTemplate } from 'naxui-manager';
import { ButtonProps } from '../Button';

export type ButtonGroupProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, 'children' | "size"> & {
    children?: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    size?: "small" | "medium" | "large";
}

const _ButtonGroup = <T extends TagComponentType = "div">({ children, ...rest }: ButtonGroupProps<T>, ref: React.Ref<any>) => {
    let { color, variant, size, ...props } = useInterface("ButtonGroup", {
        size: "medium"
    }, rest)

    const template = useColorTemplate(color, "outline")

    const sizes: any = {
        small: {
            height: 32,
        },
        medium: {
            height: 40,
        },
        large: {
            height: 52,
        }
    }

    return (
        <Tag
            baseClass='button-group'
            {...props}
            ref={ref}
            display="inline-flex"
            overflow="hidden"
            radius={1}
            {...sizes[size]}
            sx={{
                '& button:not(:last-of-type)': {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderRight: 1,
                    borderColor: template.borderColor
                },
                '& button:not(:first-of-type)': {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeft: 0
                }
            }}
        >
            {Children.map(children, (child: any) => {
                return cloneElement(child, {
                    flex: 1,
                    color,
                    variant,
                    size,
                    corner: "squar"
                })
            })}
        </Tag>
    )
}

const ButtonGroup = React.forwardRef(_ButtonGroup) as typeof _ButtonGroup
export default ButtonGroup


