'use client'
import React, { ReactElement, useState } from 'react';
import { Tag, TagProps, useInterface, useColorTemplateColors, useColorTemplateType, TagComponentType } from 'naxui-manager';
import ExpandIcon from "naxui-icons/round/ExpandMore";
import Collaps, { CollapsProps } from '../Collaps';
import List, { ListProps } from '../List';
import ListItem, { ListItemProps } from '../ListItem';

export type AccordionProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "color"> & {
    title: ReactElement | string;
    subtitle?: ReactElement | string;
    expand?: boolean;
    onClick?: () => void;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    expandIcon?: ReactElement;
    expandIconPlacement?: "start" | "end";
    expandAction?: "header" | "icon";
    color?: useColorTemplateColors;
    variant?: useColorTemplateType;
    hoverColor?: useColorTemplateColors;
    hoverVariant?: useColorTemplateType;
    slotProps?: {
        header?: Omit<ListProps, "children" | "color" | "variant" | "hoverColor" | "hoverVariant" | "className">;
        headerContent?: Omit<ListItemProps, "children" | "subtitle" | "selected" | "startIcon" | "endIcon" | "onClick" | "className">
        collaps?: Omit<CollapsProps, "children" | "in">;
        content?: Omit<TagProps, "children">;
        expandIconContainer?: Omit<TagProps<"div">, 'children' | 'className'>;
    }
}

const _Accordion = <T extends TagComponentType = "div">({ children, title, subtitle, ...rest }: AccordionProps<T>, ref: React.Ref<any>) => {
    const [_expand, setExpand] = useState(false)
    let [{
        expand,
        onClick,
        color,
        variant,
        hoverColor,
        hoverVariant,
        expandIcon,
        expandIconPlacement,
        startIcon,
        endIcon,
        classNames,
        expandAction,
        slotProps,
        ...rootProps
    }] = useInterface<any>("Accordion", rest, {
        onClick: () => setExpand(!_expand) as any,
        color: "brand",
        variant: "alpha"
    })

    expand = expand === undefined ? _expand : expand
    expandIcon = expandIcon ? <Tag
        cursor="pointer"
        {...slotProps?.expandIconContainer}
        onClick={expandAction === 'icon' && onClick ? () => onClick() : () => { }}
        className='expand-icon-container'
    >
        {expandIcon}
    </Tag> : <Tag
        transform={`rotate(${expand ? 0 : -180}deg)`}
        transition="transform .4s"
        cursor="pointer"
        {...slotProps?.expandIconContainer}
        onClick={expandAction === 'icon' && onClick ? () => onClick() : () => { }}
        className='expand-icon-container'
    >
        <ExpandIcon />
    </Tag>

    let itemsx: any = {}

    if (expandIconPlacement === 'start') {
        itemsx = {
            startIcon: <Tag
                className='start-icon-container'
                sxr={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1
                }}
            >
                {expandIcon}
                {startIcon}
            </Tag>,
            endIcon
        }

    } else {
        itemsx = {
            endIcon: <Tag
                className='end-icon-container'
                sxr={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1
                }}
            >
                {endIcon}
                {expandIcon}
            </Tag>,
            startIcon
        }
    }

    if (expandAction === 'icon') {
        itemsx.onClick = () => { }
        itemsx.cursor = "initial!important"
    }

    return (
        <Tag
            {...rootProps}
            sxr={{
                fontFamily: "default",
                bgcolor: "background.primary"
            }}
            baseClass='accordion'
            classNames={[{ "accordion-expanded": expand }, ...(classNames || [])]}
            ref={ref}
        >
            <List
                component='div'
                {...slotProps?.header}
                color={color}
                variant={variant}
                hoverColor={hoverColor}
                hoverVariant={hoverVariant}
                className='accoutdion-header'
            >
                <ListItem
                    minHeight={55}
                    radius={0}
                    component='div'
                    {...slotProps?.headerContent}
                    {...itemsx}
                    subtitle={subtitle}
                    selected={expand}
                    onClick={() => onClick && onClick()}
                    className="accordion-header-content"
                >{title}</ListItem>
                <Collaps
                    {...slotProps?.collaps}
                    open={expand}
                    className="accordion-collaps"
                >
                    <Tag
                        {...slotProps?.content}
                        sxr={{
                            color: "text.primary",
                            p: 2,
                            py: 1,
                            bgcolor: "background.primary"
                        }}
                        baseClass='accordion-content'
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


