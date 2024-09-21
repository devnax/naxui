'use client'
import { Tag, TagProps, useColorTemplateColors, useColorTemplateType, useInterface } from "naxui-manager"
import React, { ReactElement } from "react"
import Text from "../Text"
import InfoIcon from 'naxui-icons/round/Info';
import WarningIcon from 'naxui-icons/round/Warning';
import SuccessIcon from 'naxui-icons/round/CheckCircle';
import ErrorIcon from 'naxui-icons/round/Cancel';
import useUIVariant from "../useUIVariant";
import IconClose from 'naxui-icons/round/Close';
import IconButton from "../IconButton";
import Modal from "../Modal";


export type AlertProps = Omit<TagProps<"div">, 'children' | "content" | "title"> & {
    children: any;
    title?: string;
    icon?: false | ReactElement;
    variant?: useColorTemplateType;
    type?: "info" | "warning" | "success" | "error";
    color?: useColorTemplateColors;
    inline?: boolean;
    contentainerProps?: Omit<TagProps<"div">, 'children' | "content">;
    footer?: ReactElement;
    onClose?: React.DOMAttributes<"button">['onClick']
}

export type AlertMesssageType = string | ReactElement | AlertProps

export type AlertPropsWithContent = Omit<AlertProps, 'children'> & {
    content: ReactElement | string
}

export const Alert = ({ children, ...rest }: AlertProps) => {
    let { title, variant, icon, type, color, inline, contentainerProps, footer, onClose, ..._props } = useInterface("Alert", {}, rest)
    color = (color || type || "default") as any

    let { hover, ...uiCss }: any = useUIVariant(variant || "soft", color || type) || {}
    inline = inline ?? true

    const icons: any = {
        "info": <InfoIcon fontSize={inline ? 22 : 40} color={color === 'default' ? "text.primary" : uiCss.color} />,
        "warning": <WarningIcon fontSize={inline ? 22 : 40} color={color === 'default' ? "text.primary" : uiCss.color} />,
        "success": <SuccessIcon fontSize={inline ? 22 : 40} color={color === 'default' ? "text.primary" : uiCss.color} />,
        "danger": <ErrorIcon fontSize={inline ? 22 : 40} color={color === 'default' ? "text.primary" : uiCss.color} />
    }

    let _icon = icon || icons[type || "info"]
    return (
        <Tag
            fontFamily="theme"
            flexBox
            flexColumn
            radius={1}
            p={1}
            px={1.5}
            {...uiCss}
            {..._props}
            baseClass="alert-view-root"
            justifyContent="flex-start"
            position="relative"
        >
            {
                onClose && <IconButton
                    color={color}
                    variant={variant === 'fill' ? "fill" : "text"}
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
                gap={1}
                direction={inline ? "row" : "column"}
                {...contentainerProps}
                baseClass="alert-view-contentainer"
            >
                {
                    _icon && <Tag
                        py={inline ? 1 : 0}
                        baseClass="alert-view-icon"
                        flexBox
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            "& svg": {
                                color: color === 'default' ? "text" : uiCss.color
                            }
                        }}
                    >
                        {_icon}
                    </Tag>
                }
                <Tag baseClass="alert-view-text" textAlign={inline ? "left" : "center"} flexBox gap={.4} flexColumn flex={1} color={color === 'paper' ? "text.secondary" : uiCss.color} py={1} fontSize="fontsize.button" lineHeight={1.5}>
                    {title && <Text variant="text" fontSize="fontsize.button" fontWeight="bold" color={color === 'paper' ? "text" : uiCss.color}>{title}</Text>}
                    {children}
                </Tag>
            </Tag>
            {footer && <Tag pt={1}>
                {footer}
            </Tag>}
        </Tag>
    )
}

Alert.open = (props: AlertPropsWithContent) => {
    const id = "_" + Math.random().toString(16)
    const { content, ...rest } = props
    return Modal.open(id, <Alert
        inline={false}
        bgcolor="background.primary"
        {...rest}
    >
        {content}
    </Alert>, {
        rootProps: {
            width: 350
        }
    })
}

export default Alert