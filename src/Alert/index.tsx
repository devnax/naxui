'use client'
import { Tag, TagProps } from "naxui-manager"
import React, { isValidElement, ReactElement } from "react"
import Modal, { ModalPropsType } from "../Modal"
import Text from "../Text"
import InfoIcon from 'naxui-icons/round/Info';
import WarningIcon from 'naxui-icons/round/Warning';
import SuccessIcon from 'naxui-icons/round/CheckCircle';
import ErrorIcon from 'naxui-icons/round/Cancel';
import { TransitionProps } from "../Transition"

export type AlertProps = {
    message: string | ReactElement;
    title?: string;
    icon?: false | ReactElement;
    type?: "info" | "warning" | "success" | "error";
    color?: "default" | "primary" | "secondary" | "warning" | "success" | "error";
    inlineText?: boolean;
    rootProps?: Omit<TagProps<"div">, 'children' | "content">
    contentProps?: Omit<TagProps<"div">, 'children' | "content">

    // Modal Props
    modalProps?: ModalPropsType;
    transition?: TransitionProps['type'];
    transitionProps?: Omit<TransitionProps, 'type' | 'in'>
}
export type AlertMesssageType = string | ReactElement | AlertProps

const Alert = (msg_or_props: AlertMesssageType) => {
    const id = "_" + Math.random().toString(16)
    let isProps = !isValidElement(msg_or_props) && typeof msg_or_props === "object"
    let msg = isProps ? (msg_or_props as any).message : msg_or_props

    let {
        title,
        icon,
        type,
        color,
        inlineText,
        rootProps,
        contentProps,


        modalProps,
        transition,
        transitionProps
    } = (msg_or_props as AlertProps) || {}

    let _color = color ?? type ?? "primary"

    const icons: any = {
        "info": <InfoIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />,
        "warning": <WarningIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />,
        "success": <SuccessIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />,
        "error": <ErrorIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />
    }

    let _icon = icon || icons[type || "info"]

    let content = (
        <Tag minHeight={inlineText ? "initial" : 150} flexBox alignItems="center" justifyContent="center" {...rootProps} baseClass="alert-root">
            <Tag
                flexBox
                gap={8}
                alignItems="center"
                justifyContent="center"
                {...contentProps}
                baseClass="alert-content"
                direction={inlineText ? "row" : "column"}
                textAlign={inlineText ? "left" : "center"}
            >
                <Tag
                    width={50}
                    height={50}
                    flexBox
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        "& svg": {
                            fontSize: 40,
                            color: color === 'default' ? "color.text" : `color.${_color}`
                        }
                    }}
                >
                    {_icon}
                </Tag>
                <Tag flex={1}>
                    {title && <Text mb={1} variant="text" fontWeight="bold" color={`color.${_color}`}>{title}</Text>}
                    {typeof msg === 'string' ? <Text variant="subtext" lineHeight={1.4}>{msg}</Text> : msg}
                </Tag>
            </Tag>
        </Tag>
    )

    Modal.open(id, content, {
        closeOnClickOutside: false,
        closeButton: true,
        transition,
        transitionProps,
        ...modalProps,
        rootProps: {
            width: inlineText ? 400 : 320,
            p: inlineText ? 2 : 3,
            ...modalProps?.rootProps
        },
    })
}


export default Alert