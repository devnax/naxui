'use client'
import { alpha, Tag } from "naxui-manager"
import React, { isValidElement, ReactElement } from "react"
import Button from "../Button"
import Modal from "../Modal"
import Text from "../Text"

import CloseIcon from 'naxui-icons/round/Close'
import InfoIcon from 'naxui-icons/round/Info';
import WarningIcon from 'naxui-icons/round/Warning';
import SuccessIcon from 'naxui-icons/round/CheckCircle';
import ErrorIcon from 'naxui-icons/round/Error';


export type ConfirmProps = {
    message: string | ReactElement;
    title?: string;
    buttonText?: [string, string];
    icon?: false | ReactElement;
    type?: "info" | "warning" | "success" | "error";
    color?: "default" | "primary" | "secondary" | "warning" | "success" | "error";
    inlineText?: boolean;
    buttonPlacement?: "left" | "center" | "right" | "half" | "full"
}
export type ConfirmMesssageType = string | ReactElement | ConfirmProps

const Confirm = (msg_or_props: ConfirmMesssageType, callback?: () => void) => {
    const id = "confirm" + Math.random().toString(16)
    let isProps = !isValidElement(msg_or_props) && typeof msg_or_props === "object"
    let msg = isProps ? (msg_or_props as any).message : msg_or_props

    let {
        title,
        buttonText,
        buttonPlacement,
        icon,
        type,
        color,
        inlineText
    } = (msg_or_props as ConfirmProps) || {}
    buttonPlacement = buttonPlacement ?? "right"

    let btnContainerCss: any = {}
    switch (buttonPlacement) {
        case "left":
            btnContainerCss = { justifyContent: "flex-start" }
            break;
        case "right":
            btnContainerCss = { justifyContent: "flex-end" }
            break;
        case "center":
            btnContainerCss = { justifyContent: "center" }
            break;
        case "half":
            btnContainerCss = { "& button": { flex: 1 } }
            break;
        case "full":
            btnContainerCss = { flexDirection: "column-reverse", "& button": { width: "100%" } }
            break;
    }

    let _color = color ?? type ?? "primary"

    const icons: any = {
        "info": <InfoIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />,
        "warning": <WarningIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />,
        "success": <SuccessIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />,
        "error": <ErrorIcon fontSize={40} color={color === 'default' ? "color.text" : `color.${_color}`} />
    }

    let _icon = icon || icons[type || "info"]
    let _buttonText = buttonText ?? [] as any
    let cancelText = typeof _buttonText[0] === 'undefined' ? "cancel" : _buttonText[0]
    let okText = typeof _buttonText[1] === 'undefined' ? "confirm" : _buttonText[1]

    let content = (
        <Tag
            baseClass="confirm-root"
        >
            <Tag
                baseClass="confirm-content"
                flexBox
                direction={inlineText ? "row" : "column"}
                gap={8}
                alignItems="center"
                justifyContent="center"
                textAlign={inlineText ? "left" : "center"}
            >
                <Tag width={50} height={50} flexBox alignItems="center" justifyContent="center">
                    {_icon}
                </Tag>
                <Tag flex={1}>
                    {title && <Text mb={1} variant="text" fontWeight="bold" color={`color.${_color}`}>{title}</Text>}
                    {typeof msg === 'string' ? <Text variant="subtext" lineHeight={1.4}>{msg}</Text> : msg}
                </Tag>
            </Tag>
            <Tag
                baseClass="confirm-actions"
                flexBox
                flexRow
                justifyContent="flex-end"
                gap={16}
                mt={2}

                sx={{
                    ...btnContainerCss
                }}
            >
                {cancelText && <Button
                    color="default"
                    variant={buttonPlacement === "full" || buttonPlacement === 'half' ? "outlined" : "text"}
                    onClick={() => Modal.close(id)}
                >{cancelText}</Button>}
                {okText && <Button
                    color={_color as any}
                    onClick={() => {
                        Modal.close(id)
                    }}
                >{okText}</Button>}
            </Tag>
        </Tag>
    )

    Modal.open(id, content, {
        closeOnClickOutside: false,
        closeButton: !cancelText && !okText,
        rootProps: {
            width: inlineText ? 400 : 350,
        }
    })

    // return new Promise()
}

export default Confirm