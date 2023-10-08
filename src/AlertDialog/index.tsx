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

export type AlertViewProps = {
    message: string | ReactElement;
    title?: string;
    icon?: false | ReactElement;
    type?: "info" | "warning" | "success" | "error";
    color?: "default" | "primary" | "secondary" | "warning" | "success" | "error";
    inlineText?: boolean;
    rootProps?: Omit<TagProps<"div">, 'children' | "content">
    contentainerProps?: Omit<TagProps<"div">, 'children' | "content">;
    header?: ReactElement;
    footer?: ReactElement;
}

export type AlertProps = AlertViewProps & {
    modalProps?: ModalPropsType;
    transition?: TransitionProps['type'];
    transitionProps?: Omit<TransitionProps, 'type' | 'in'>;
}

export type AlertMesssageType = string | ReactElement | AlertProps

export const AlertView = ({ message, title, icon, type, color, inlineText, rootProps, contentainerProps, header, footer }: AlertViewProps) => {

    let _color = color ?? type ?? "primary"

    const icons: any = {
        "info": <InfoIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />,
        "warning": <WarningIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />,
        "success": <SuccessIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />,
        "error": <ErrorIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />
    }

    let _icon = icon || icons[type || "info"]

    return (
        <Tag minHeight={inlineText ? "initial" : 150} height="100%" flexBox flexColumn justifyContent="center" {...rootProps} baseClass="alert-view-root">
            {header}
            <Tag
                flexBox
                gap={8}
                alignItems="center"
                justifyContent="center"
                {...contentainerProps}
                baseClass="alert-view-contentainer"
                direction={inlineText ? "row" : "column"}
                textAlign={inlineText ? "left" : "center"}
            >
                <Tag
                    baseClass="alert-view-icon"
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
                <Tag baseClass="alert-view-text" flex={1}>
                    {title && <Text mb={1} variant="text" fontWeight="bold" color={`color.${_color}`}>{title}</Text>}
                    {typeof message === 'string' ? <Text variant="subtext" lineHeight={1.4}>{message}</Text> : message}
                </Tag>
            </Tag>
            {footer}
        </Tag>
    )
}

const makeProps = (msg_or_props: AlertMesssageType) => (typeof msg_or_props === 'string' || isValidElement(msg_or_props) ? { message: msg_or_props } : msg_or_props) as AlertProps

const Alert = (msg_or_props: AlertMesssageType) => {
    const id = "_" + Math.random().toString(16)
    let props = makeProps(msg_or_props)
    let {
        message,
        title,
        icon,
        type,
        color,
        inlineText,
        rootProps,
        contentainerProps,
        header,
        footer,

        modalProps,
        transition,
        transitionProps,
    } = props

    const content = <AlertView
        message={message}
        title={title}
        icon={icon}
        type={type}
        color={color}
        inlineText={inlineText}
        rootProps={rootProps}
        contentainerProps={contentainerProps}
        header={header}
        footer={footer}
    />

    return Modal.open(id, content, {
        closeOnClickOutside: false,
        closeButton: true,
        transition,
        transitionProps,
        ...modalProps,
        rootProps: {
            width: { xs: "100%", sm: inlineText ? 400 : 350 },
            maxWidth: 400,
            height: "auto",
            radius: 2,
            p: inlineText ? 2 : 3,
            ...modalProps?.rootProps
        },
    })
}

Alert.info = (msg_or_props: AlertMesssageType) => {
    let p = makeProps(msg_or_props)
    p.type = 'info'
    return Alert(p)
}

Alert.warning = (msg_or_props: AlertMesssageType) => {
    let p = makeProps(msg_or_props)
    p.type = 'warning'
    return Alert(p)
}

Alert.error = (msg_or_props: AlertMesssageType) => {
    let p = makeProps(msg_or_props)
    p.type = 'error'
    return Alert(p)
}

Alert.success = (msg_or_props: AlertMesssageType) => {
    let p = makeProps(msg_or_props)
    p.type = 'success'
    return Alert(p)
}


export default Alert