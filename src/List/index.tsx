'use client'
import React, { forwardRef } from 'react'
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplate, useColorTemplateType, useColorTemplateColors } from 'naxui-manager'

export type ListProps<T extends TagComponentType = "ul"> = Omit<TagProps<T>, 'color'> & {
    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    hoverColor?: useColorTemplateColors;
    hoverVariant?: useColorTemplateType;
}

const _List = <T extends TagComponentType = "ul">({ children, ...rest }: ListProps<T>, ref: React.Ref<any>) => {
    let [{ sx, color, variant, hoverColor, hoverVariant, ...props }] = useInterface<any>("List", rest, {
        color: "brand",
        variant: "fill"
    })
    hoverColor = hoverColor || "default"
    hoverVariant = hoverVariant || "alpha"
    const template = { ...useColorTemplate(color, variant) }
    const hoverTemplate = { ...useColorTemplate(hoverColor, hoverVariant) }
    delete template.hover
    delete hoverTemplate.hover

    let sxOutline: any = {}
    if (hoverVariant == 'outline' || variant === 'outline') {
        sxOutline = {
            "& .list-item": {
                border: 1,
                borderColor: "transparent"
            }
        }
    }

    return (
        <Tag
            component='ul'
            {...props}
            baseClass='list'
            sxr={{
                listStyle: "none",
                p: 0,
                m: 0,
                ...sxOutline,
                "& .list-item-icon": {
                    color: "text.secondary"
                },
                "& .list-item-text": {
                    color: "text.primary"
                },
                "& .list-item-subtitle": {
                    color: "text.secondary"
                },
                "& .nui-list-item:not(.list-item-selected):hover": {
                    ...hoverTemplate,
                    "& .list-item-icon": {
                        color: hoverTemplate.color
                    },
                    "& .list-item-text": {
                        color: hoverTemplate.color
                    },
                    "& .list-item-subtitle": {
                        color: hoverColor === 'default' ? "text.secondary" : hoverTemplate.color
                    },
                },
                "& .nui-list-item.list-item-selected": {
                    ...template,
                    "& .list-item-icon": {
                        color: template.color
                    },
                    "& .list-item-text": {
                        color: template.color
                    },
                    "& .list-item-subtitle": {
                        color: template.color
                    },
                },
                ...(sx || {} as any)
            }}
            ref={ref}
        >
            {children}
        </Tag>
    )
}

const List = forwardRef(_List) as typeof _List
export default List