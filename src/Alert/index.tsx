'use client'
import { Tag, TagProps, useColorTemplate, useColorTemplateColors, useColorTemplateType, useInterface } from "naxui-manager"
import React, { isValidElement, ReactElement } from "react"
import Text from "../Text"
import InfoIcon from 'naxui-icons/round/Info';
import WarningIcon from 'naxui-icons/round/Warning';
import SuccessIcon from 'naxui-icons/round/CheckCircle';
import ErrorIcon from 'naxui-icons/round/Cancel';
import IconClose from 'naxui-icons/round/Close';
import IconButton from "../IconButton";
import Modal from "../Modal";


export type AlertProps = Omit<TagProps<"div">, "content" | "title"> & {
    title?: string | ReactElement;
    mode?: "item" | "box";
    variant?: useColorTemplateType;
    color?: useColorTemplateColors;
    type?: "info" | "warning" | "success" | "error";
    icon?: false | ReactElement;
    onClose?: React.DOMAttributes<"button">['onClick'];
}

export type AlertMesssageType = string | ReactElement | AlertProps

export type AlertPropsWithContent = Omit<AlertProps, 'children'> & {
    content: ReactElement | string
}

export const Alert = ({ children, ...rest }: AlertProps) => {
    let [{
        title,
        variant,
        icon,
        type,
        color,
        mode,
        slotProps,
        footer,
        onClose,
        ..._props
    }] = useInterface<any>("Alert", rest, {
        variant: "fill"
    })

    mode ??= "item"
    let inline = mode === 'item'
    type ??= "info"
    color = color || type

    const template = useColorTemplate(color, variant)
    delete template.hover

    const icons: any = {
        "info": <InfoIcon fontSize={inline ? 22 : 40} color={color === 'default' ? "text.primary" : template.color} />,
        "warning": <WarningIcon fontSize={inline ? 22 : 40} color={color === 'default' ? "text.primary" : template.color} />,
        "success": <SuccessIcon fontSize={inline ? 22 : 40} color={color === 'default' ? "text.primary" : template.color} />,
        "danger": <ErrorIcon fontSize={inline ? 22 : 40} color={color === 'default' ? "text.primary" : template.color} />
    }

    let _icon = icon || icons[type]

    return (
        <Tag
            fontFamily="default"
            flexBox
            flexColumn
            radius={1}
            p={inline ? 1 : 3}
            px={1.5}
            {..._props}
            baseClass="alert"
            justifyContent="flex-start"
            position="relative"
            {...template}
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
                    className="alert-close-button"
                >
                    <IconClose fontSize={18} />
                </IconButton>
            }
            <Tag
                flexBox
                gap={1}
                direction={inline ? "row" : "column"}
                alignItems={inline ? "flex-start" : "center"}
                baseClass="alert-container"
            >
                {
                    _icon && <Tag
                        py={inline ? 1 : 0}
                        baseClass="alert-icon"
                        flexBox
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            "& svg": {
                                color: template.color
                            }
                        }}
                    >
                        {_icon}
                    </Tag>
                }
                <Tag
                    baseClass="alert-content"
                    textAlign={inline ? "left" : "center"}
                    flexBox
                    flexColumn
                    flex={1}
                    color={template.color}
                    py={1}
                >
                    {title && <>
                        {
                            isValidElement(title) ? <Tag className="alert-title">{title}</Tag> : <Text
                                className="alert-title"
                                variant="text"
                                fontSize={14}
                                fontWeight="bold"
                                color={template.color}
                            >{title}</Text>
                        }
                    </>}
                    <Tag
                        fontSize={14}
                        fontFamily="default"
                    >
                        {children}
                    </Tag>
                </Tag>
            </Tag>
        </Tag>
    )
}

Alert.open = (props: AlertPropsWithContent) => {
    const id = "_" + Math.random().toString(16)
    const { content, ...rest } = props
    return Modal.open(id, <Alert
        mode="box"
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