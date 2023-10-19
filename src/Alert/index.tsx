'use client'
import { Tag, TagProps } from "naxui-manager"
import React, { ReactElement } from "react"
import Text from "../Text"
import InfoIcon from 'naxui-icons/round/Info';
import WarningIcon from 'naxui-icons/round/Warning';
import SuccessIcon from 'naxui-icons/round/CheckCircle';
import ErrorIcon from 'naxui-icons/round/Cancel';
import useUIVariant, { UseUIVariantTypes } from "../useUIVariant";
import IconClose from 'naxui-icons/round/Close';
import IconButton from "../IconButton";


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
    onClose?: React.DOMAttributes<"button">['onClick']
}

export type AlertMesssageType = string | ReactElement | AlertProps

export const Alert = ({ children, title, variant, icon, type, color, inline, rootProps, contentainerProps, footer, onClose }: AlertProps) => {
    color = (color || type || "paper") as any

    let { hover, ...uiCss }: any = useUIVariant(variant || "soft", color || type) || {}
    inline = inline ?? true

    const icons: any = {
        "info": <InfoIcon fontSize={22} color={color === 'paper' ? "color.paper.text" : uiCss.color} />,
        "warning": <WarningIcon fontSize={22} color={color === 'paper' ? "color.paper.text" : uiCss.color} />,
        "success": <SuccessIcon fontSize={22} color={color === 'paper' ? "color.paper.text" : uiCss.color} />,
        "error": <ErrorIcon fontSize={22} color={color === 'paper' ? "color.paper.text" : uiCss.color} />
    }

    let _icon = icon || icons[type || "info"]
    return (
        <Tag
            flexBox
            flexColumn
            radius={1}
            p={1}
            px={1.5}
            {...uiCss}
            {...rootProps}
            baseClass="alert-view-root"
            justifyContent="flex-start"
            position="relative"
        >
            {
                onClose && <IconButton
                    color={color}
                    variant={variant === 'filled' ? "filled" : "text"}
                    size={25}
                    position="absolute"
                    top={5}
                    right={5}
                    onClick={onClose}
                >
                    <IconClose fontSize={18} />
                </IconButton>
            }
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
                                color: color === 'paper' ? "color.paper.text" : uiCss.color
                            }
                        }}
                    >
                        {_icon}
                    </Tag>
                }
                <Tag baseClass="alert-view-text" flexBox gap={4} flexColumn flex={1} py={1} fontSize="fontsize.button" lineHeight={1.5}>
                    {title && <Text variant="text" fontSize="fontsize.button" fontWeight="bold" color={uiCss.color}>{title}</Text>}
                    {children}
                </Tag>
            </Tag>
            {footer && <Tag pt={1}>
                {footer}
            </Tag>}
        </Tag>
    )
}

export default Alert