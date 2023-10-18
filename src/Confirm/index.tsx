'use client'
import { Tag } from "naxui-manager"
import React, { isValidElement, ReactElement } from "react"
import Button from "../Button"
import Modal from "../Modal"
import Alert, { AlertProps } from "../AlertDialog"

export type ConfirmProps = Omit<AlertProps, "footer" | "header"> & {
    buttonText?: [string, string];
    buttonPlacement?: "left" | "center" | "right" | "half" | "full"
}
export type ConfirmMesssageType = string | ReactElement | ConfirmProps


const makeProps = (msg_or_props: ConfirmMesssageType) => (typeof msg_or_props === 'string' || isValidElement(msg_or_props) ? { message: msg_or_props } : msg_or_props) as ConfirmProps

const ConfirmMain = (msg_or_props: ConfirmMesssageType, onConfirm?: (confirmed: boolean) => void) => {
    let props = makeProps(msg_or_props)

    let buttonText = props.buttonText, buttonPlacement = props.buttonPlacement;
    props.buttonText && delete props.buttonText
    props.buttonPlacement && delete props.buttonPlacement

    let _bcon: any = {
        left: { justifyContent: "flex-start" },
        right: { justifyContent: "flex-end" },
        center: { justifyContent: "center" },
        half: { "& button": { flex: 1 } },
        full: { flexDirection: "column-reverse", "& button": { width: "100%" } }
    }

    let _color = props.color ?? props.type ?? "primary"
    let _buttonText = buttonText ?? [] as any
    let cancelText = _buttonText[0] ?? "cancel"
    let okText = _buttonText[1] ?? "confirm"

    const id = Alert({
        ...props,
        rootProps: {
            ...props.rootProps,
            justifyContent: "space-between"
        },
        modalProps: {
            ...props.modalProps,
            closeButton: false,
        },

        footer: <Tag
            baseClass="confirm-actions"
            flexBox
            flexRow
            justifyContent="flex-end"
            gap={8}
            mt={2}
            sx={{ ..._bcon[buttonPlacement || "right"] }}
        >
            {cancelText && <Button
                color="paper"
                variant={buttonPlacement === "full" || buttonPlacement === 'half' ? "outlined" : "text"}
                onClick={() => {
                    onConfirm && onConfirm(false)
                    Modal.close(id)
                }}
            >{cancelText}</Button>}
            {okText && <Button
                color={_color as any}
                onClick={() => {
                    onConfirm && onConfirm(true)
                    Modal.close(id)
                }}
            >{okText}</Button>}
        </Tag>
    })
}

const Confirm = (msg_or_props: ConfirmMesssageType, onConfirm?: (confirmed: boolean) => void) => {
    if (!onConfirm) {
        return new Promise((resolve) => {
            ConfirmMain(msg_or_props, (val) => {
                resolve(val)
            })
        })
    }
    return ConfirmMain(msg_or_props, onConfirm)
}

Confirm.info = (msg_or_props: ConfirmMesssageType, onConfirm?: (confirmed: boolean) => void) => {
    let p = makeProps(msg_or_props)
    p.type = 'info'
    return Confirm(p, onConfirm)
}

Confirm.warning = (msg_or_props: ConfirmMesssageType, onConfirm?: (confirmed: boolean) => void) => {
    let p = makeProps(msg_or_props)
    p.type = 'warning'
    return Confirm(p, onConfirm)
}

Confirm.success = (msg_or_props: ConfirmMesssageType, onConfirm?: (confirmed: boolean) => void) => {
    let p = makeProps(msg_or_props)
    p.type = 'success'
    return Confirm(p, onConfirm)
}

Confirm.error = (msg_or_props: ConfirmMesssageType, onConfirm?: (confirmed: boolean) => void) => {
    let p = makeProps(msg_or_props)
    p.type = 'error'
    return Confirm(p, onConfirm)
}

export default Confirm