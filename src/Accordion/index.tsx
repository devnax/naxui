'use client'
import React, { ReactElement, useState } from 'react';
import { Tag, TagProps, TagComponenntType, useInterface, useColorTemplateColors, useColorTemplateType } from 'naxui-manager';
import ExpandIcon from "naxui-icons/round/ExpandMore";
import Collaps, { CollapsProps } from '../Collaps';
import List from '../List';
import ListItem from '../ListItem';

export type AccordionProps<T extends TagComponenntType = "div"> = Omit<TagProps<T>, 'color'> & {
    title: ReactElement | string;
    subtitle?: ReactElement | string;

    expand?: boolean;
    onChange?: (expand: boolean) => void;

    startIcon?: ReactElement;
    endIcon?: ReactElement;
    expandIcon?: ReactElement;
    expandIconPlacement?: "start" | "end";
    expandAction?: "header" | "icon";

    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    hoverColor?: useColorTemplateColors;
    hoverVariant?: useColorTemplateType;

    collapsProps?: Omit<CollapsProps, "children" | "in">
}

const _Accordion = <T extends TagComponenntType = "div">({ children, title, subtitle, ...rest }: AccordionProps<T>, ref: React.Ref<any>) => {
    const [_expand, setExpand] = useState(false)
    let {
        contentProps,
        expand,
        onChange,
        color,
        variant,
        hoverColor,
        hoverVariant,
        expandIcon,
        expandIconPlacement,
        startIcon,
        endIcon,
        collapsProps,
        classNames,
        expandAction,
        ...props
    } = useInterface("Accordion", {
        onChange: setExpand as any,
        color: "brand",
        variant: "alpha"
    }, rest)

    expand = expand === undefined ? _expand : expand
    expandIcon = expandIcon || <Tag
        transform={`rotate(${expand ? 0 : -180}deg)`}
        transition="transform .4s"
        onClick={expandAction === 'icon' ? () => onChange(!expand) : () => { }}
        cursor="pointer"
    >
        <ExpandIcon />
    </Tag>

    let itemSx: any = {}

    if (expandIconPlacement === 'start') {
        itemSx = {
            startIcon: <Tag flexBox flexRow gap={1}>
                {expandIcon}
                {startIcon}
            </Tag>,
            endIcon
        }

    } else {
        itemSx = {
            endIcon: <Tag flexBox flexRow gap={1}>
                {endIcon}
                {expandIcon}
            </Tag>,
            startIcon
        }
    }

    if (expandAction === 'icon') {
        itemSx.onClick = () => { }
        itemSx.cursor = "initial!important"
    }


    return (
        <Tag
            fontFamily="theme"
            bgcolor="background.primary"
            {...props}
            baseClass='accordion'
            classNames={[{ "accordionExpanded": expand }, ...(classNames || [])]}
            ref={ref}
        >
            <List
                component='div'
                color={color}
                variant={variant}
                hoverColor={hoverColor}
                hoverVariant={hoverVariant}
                className='accoutdionHeaderContainer'
            >
                <ListItem
                    minHeight={55}
                    subtitle={subtitle}
                    component='div'
                    selected={expand}
                    radius={0}
                    onClick={() => onChange && onChange(!expand)}
                    {...itemSx}
                    className="accordionHeader"
                    classNames={[{ accordionHeaderExpand: expand }]}
                >{title}</ListItem>
                <Collaps
                    {...collapsProps}
                    in={expand}
                    className="accordionContent"
                    classNames={[{ accordionContentExpand: expand }]}
                >
                    <Tag
                        color="text.primary"
                        p={2}
                        py={1}
                        bgcolor="background.primary"
                        {...contentProps}
                        baseClass='accordio-content'
                    >
                        {children}
                    </Tag>
                </Collaps>
            </List>
        </Tag>
    )
}

const Accordion = React.forwardRef(_Accordion) as typeof _Accordion
export default Accordion


