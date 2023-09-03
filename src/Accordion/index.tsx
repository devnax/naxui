'use client'
import React, { ReactElement, useState } from 'react';
import { Tag, TagProps, TagComponenntType, globalCss } from 'naxui-manager';
import Collaps from '../Collaps';
export type AccordionProps<T extends TagComponenntType = "div"> = TagProps<T> & {
    title: ReactElement | string;
    expand?: boolean;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onChange?: (expand: boolean) => void;
}

const Accordion = <T extends TagComponenntType = "div">({ children, title, expand, startIcon, endIcon, onChange, ...rest }: AccordionProps<T>, ref: React.Ref<any>) => {
    const [_expand, setExpand] = useState(false)
    const [borderColor, setBorderColor] = useState("transparent")
    onChange = onChange || setExpand as any
    expand = expand === undefined ? _expand : expand
    globalCss("ui-accordion", {
        '.ui-accordion:first-child': {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
        },
        '.ui-accordion:last-child': {
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
        },
        '.ui-accordion:not(:last-child)': {
            borderBottom: 0
        }
    })
    return (
        <Tag
            baseClass='accordion'
            bgcolor="color.paper"
            {...rest}
            ref={ref}
        >
            <Tag
                baseClass='accordion-header'
                flexBox
                direction="row"
                alignItems="center"
                gap={2}
                p={2}
                cursor="pointer"
                onClick={() => {
                    onChange && onChange(!expand)
                }}
                userSelect="none"
                borderBottom="1px solid"
                borderColor={borderColor}
            >
                {startIcon && <Tag component='span' display="inherit">{startIcon}</Tag>}
                <Tag component='span' flex={1} typography="text">{title}</Tag>
                {endIcon && <Tag component='span' display="inherit">{endIcon}</Tag>}
            </Tag>
            <Collaps
                in={expand}
                transitionProps={{
                    onStart: () => {
                        if (expand) {
                            setBorderColor("color.divider")
                        }
                    },
                    onFinish: () => {
                        if (!expand) {
                            setBorderColor("transparent")
                        }
                    }
                }}
            >
                <Tag p={2} py={1}>
                    {children}
                </Tag>
            </Collaps>
        </Tag>
    )
}

export default React.forwardRef(Accordion) as typeof Accordion


