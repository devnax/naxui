'use client'
import React, { ReactElement, useState } from 'react';
import { Tag, TagProps, TagComponenntType, globalCss } from 'naxui-manager';
import ExpandIcon from "naxui-icons/round/ExpandMore";
import Collaps from '../Collaps';

export type AccordionProps<T extends TagComponenntType = "div"> = TagProps<T> & {
    title: ReactElement | string;
    expand?: boolean;
    onChange?: (expand: boolean) => void;
    headerProps?: Omit<TagProps<"div">, 'children' | 'baseClass'>,
    contentProps?: Omit<TagProps<"div">, 'children' | 'baseClass'>,
    expandIcon?: ReactElement;
    expandIconPlacement?: "left" | "right"
}

const _Accordion = <T extends TagComponenntType = "div">({ children, title, expand, onChange, headerProps, contentProps, expandIcon, expandIconPlacement, ...rest }: AccordionProps<T>, ref: React.Ref<any>) => {
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
            borderBottom: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
        },
    })

    return (
        <Tag
            bgcolor="color.paper"
            borderBottom="1px solid"
            borderColor="color.paper.divider"
            shadow={1}
            {...rest}
            baseClass='accordion'
            classNames={[{ "ui-accordion-expanded": expand, }, ...(rest.classNames || [])]}
            ref={ref}
        >
            <Tag
                flexBox
                direction="row"
                alignItems="center"
                justifyContent='space-between'
                p={1.5}
                cursor="pointer"
                onClick={() => onChange && onChange(!expand)}
                userSelect="none"
                borderBottom="1px solid"
                borderColor={borderColor}
                shadow={4}
                {...headerProps}
                baseClass='accordion-header'
            >
                <Tag flex={1} order={expandIconPlacement === 'left' ? 1 : 0}>
                    <Tag component='span' typography="text">{title}</Tag>
                </Tag>
                <ExpandIcon
                    transition="transform .3s"
                    transform={`rotate(${expand ? 180 : 0}deg)`}
                    mr={expandIconPlacement === 'left' ? 1 : 0}
                    ml={expandIconPlacement === 'left' ? 0 : 1}
                />
            </Tag>
            <Collaps
                in={expand}
                transitionProps={{
                    onStart: () => {
                        if (expand) {
                            setBorderColor("color.paper.divider")
                        }
                    },
                    onFinish: () => {
                        if (!expand) {
                            setBorderColor("transparent")
                        }
                    }
                }}
            >
                <Tag
                    p={2}
                    py={1}
                    bgcolor="color.paper.light"
                    {...contentProps}
                    baseClass='accordio-content'
                >
                    {children}
                </Tag>
            </Collaps>
        </Tag>
    )
}

const Accordion = React.forwardRef(_Accordion) as typeof _Accordion
export default Accordion


