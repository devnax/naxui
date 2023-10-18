'use client'
import { Tag, TagProps } from "naxui-manager"
import React, { ReactElement } from "react"
import Text from "../Text"
import InfoIcon from 'naxui-icons/round/Info';
import WarningIcon from 'naxui-icons/round/Warning';
import SuccessIcon from 'naxui-icons/round/CheckCircle';
import ErrorIcon from 'naxui-icons/round/Cancel';
import useUIVariant, { UseUIVariantTypes } from "../useUIVariant";

export type AlertProps = {
    children: any;
    title?: string;
    icon?: false | ReactElement;
    variant?: UseUIVariantTypes;
    type?: "info" | "warning" | "success" | "error";
    color?: "paper" | "primary" | "secondary" | "warning" | "success" | "error";
    inline?: boolean;
    rootProps?: Omit<TagProps<"div">, 'children' | "content">
    contentainerProps?: Omit<TagProps<"div">, 'children' | "content">;
    footer?: ReactElement;
}

export type AlertMesssageType = string | ReactElement | AlertProps



export const Alert = ({ children, title, variant, icon, type, color, inline, rootProps, contentainerProps, footer }: AlertProps) => {

    const v: any = useUIVariant(variant || "soft", color || type) || {}

    inline = inline ?? true

    const icons: any = {
        "info": <InfoIcon fontSize={22} color={color === 'paper' ? "color.paper.text" : v.color} />,
        "warning": <WarningIcon fontSize={22} color={color === 'paper' ? "color.paper.text" : v.color} />,
        "success": <SuccessIcon fontSize={22} color={color === 'paper' ? "color.paper.text" : v.color} />,
        "error": <ErrorIcon fontSize={22} color={color === 'paper' ? "color.paper.text" : v.color} />
    }

    let _icon = icon || icons[type || "info"]
    return (
        <Tag
            flexBox
            flexColumn
            radius={1}
            p={1}
            px={1.5}
            bgcolor={v.bgcolor}
            {...v}
            {...rootProps}
            baseClass="alert-view-root"
            justifyContent="flex-start"
            width={500}
        >
            <Tag
                flexBox
                gap={8}
                direction={inline ? "row" : "column"}
                {...contentainerProps}
                baseClass="alert-view-contentainer"
            >
                {
                    _icon && <Tag
                        py={1}
                        baseClass="alert-view-icon"
                        flexBox
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            "& svg": {
                                color: color === 'paper' ? "color.paper.text" : v.color
                            }
                        }}
                    >
                        {_icon}
                    </Tag>
                }
                <Tag baseClass="alert-view-text" flex={1} py={1}>
                    {title && <Text variant="text" fontSize="fontsize.button" fontWeight="bold" color={v.color}>{title}</Text>}
                    {typeof children === 'string' ? <Text fontWeight={500} variant="subtext" fontSize="fontsize.block" color={v.color} lineHeight={1.4}>{children}</Text> : children}
                </Tag>
            </Tag>
            {footer && <Tag pt={1}>
                {footer}
            </Tag>}
        </Tag>
    )
}

export default Alert