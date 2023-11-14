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
import Modal from "../Modal";


export type AlertProps = Omit<TagProps<"div">, 'children' | "content" | "title"> & {
    children: any;
    title?: string;
    icon?: false | ReactElement;
    variant?: UseUIVariantTypes;
    type?: "info" | "warning" | "success" | "error";
    color?: "paper" | "primary" | "secondary" | "warning" | "success" | "error";
    inline?: boolean;
    contentainerProps?: Omit<TagProps<"div">, 'children' | "content">;
    footer?: ReactElement;
    onClose?: React.DOMAttributes<"button">['onClick']
}

export type AlertMesssageType = string | ReactElement | AlertProps

export type AlertPropsWithContent = Omit<AlertProps, 'children'> & {
    content: ReactElement | string
}

export const Alert = ({ children, title, variant, icon, type, color, inline, contentainerProps, footer, onClose, ...rest }: AlertProps) => {
    color = (color || type || "paper") as any

    let { hover, ...uiCss }: any = useUIVariant(variant || "soft", color || type) || {}
    inline = inline ?? true

    const icons: any = {
        "info": <InfoIcon fontSize={inline ? 22 : 40} color={color === 'paper' ? "color.paper.text" : uiCss.color} />,
        "warning": <WarningIcon fontSize={inline ? 22 : 40} color={color === 'paper' ? "color.paper.text" : uiCss.color} />,
        "success": <SuccessIcon fontSize={inline ? 22 : 40} color={color === 'paper' ? "color.paper.text" : uiCss.color} />,
        "error": <ErrorIcon fontSize={inline ? 22 : 40} color={color === 'paper' ? "color.paper.text" : uiCss.color} />
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
            {...rest}
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
                        py={inline ? 1 : 0}
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
                <Tag baseClass="alert-view-text" textAlign={inline ? "left" : "center"} flexBox gap={4} flexColumn flex={1} color={color === 'paper' ? "color.paper.subtext" : uiCss.color} py={1} fontSize="fontsize.button" lineHeight={1.5}>
                    {title && <Text variant="text" fontSize="fontsize.button" fontWeight="bold" color={color === 'paper' ? "color.paper.text" : uiCss.color}>{title}</Text>}
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
        bgcolor="color.paper.light"
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