'use client'
import React, { forwardRef } from 'react'
import { Tag, TagProps, TagComponenntType, useInterface, useColorTemplate, useColorTemplateType, useColorTemplateColors } from 'naxui-manager'

export type ListProps<T extends TagComponenntType = "ul"> = Omit<TagProps<T>, 'color'> & {
    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    hoverColor?: useColorTemplateColors;
    hoverVariant?: useColorTemplateType;
}

const _List = <T extends TagComponenntType = "ul">({ children, ...rest }: ListProps<T>, ref: React.Ref<any>) => {
    let { sx, color, variant, hoverColor, hoverVariant, ...props } = useInterface("List", {
        color: "brand",
        variant: "fill"
    }, rest)
    hoverColor = hoverColor || "default"
    hoverVariant = hoverVariant || "alpha"
    const template = { ...useColorTemplate(color, variant) }
    const hoverTemplate = { ...useColorTemplate(hoverColor, hoverVariant) }
    delete template.hover
    delete hoverTemplate.hover

    let sxOutline: any = {}
    if (hoverVariant == 'outline' || variant === 'outline') {
        sxOutline = {
            "& .$prefix-list-item": {
                border: 1,
                borderColor: "transparent"
            }
        }
    }

    return (
        <Tag
            component='ul'
            m={0}
            p={0}
            listStyle="none"
            {...props}
            baseClass='list'
            sx={{
                ...sxOutline,

                "& .listItemIcon": {
                    color: "text.secondary"
                },
                "& .listItemText": {
                    color: "text.primary"
                },
                "& .listItemSubtitle": {
                    color: "text.secondary"
                },
                "& .$prefix-listItem:not(.listItemSelected):hover": {
                    ...hoverTemplate,
                    "& .listItemIcon": {
                        color: hoverTemplate.color
                    },
                    "& .listItemText": {
                        color: hoverTemplate.color
                    },
                    "& .listItemSubtitle": {
                        color: hoverColor === 'default' ? "text.secondary" : hoverTemplate.color
                    },
                },
                "& .$prefix-listItem.listItemSelected": {
                    ...template,
                    "& .listItemIcon": {
                        color: template.color
                    },
                    "& .listItemText": {
                        color: template.color
                    },
                    "& .listItemSubtitle": {
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