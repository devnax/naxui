'use client'
import { Tag, TagProps, useBreakpointProps, useColorTemplate, useColorTemplateColors, useColorTemplateType, useInterface, UseTransitionVariantTypes } from "naxui-manager"
import React, { isValidElement, ReactElement, ReactNode } from "react"
import Text from "../Text"
import InfoIcon from 'naxui-icons/round/Info';
import WarningIcon from 'naxui-icons/round/Warning';
import SuccessIcon from 'naxui-icons/round/CheckCircle';
import ErrorIcon from 'naxui-icons/round/Cancel';
import IconClose from 'naxui-icons/round/Close';
import IconButton from "../IconButton";
import Modal, { ModalProps } from "../Modal";
import Button, { ButtonProps } from "../Button";
import { useBreakpoinPropsType } from "naxui-manager/dist/breakpoint/useBreakpointProps";


export type AlertProps = Omit<TagProps<"div">, "content" | "title" | "direction"> & {
    title?: useBreakpoinPropsType<string | ReactElement>;
    direction?: useBreakpoinPropsType<"row" | "column">;
    variant?: useBreakpoinPropsType<useColorTemplateType>;
    color?: useBreakpoinPropsType<useColorTemplateColors>;
    icon?: useBreakpoinPropsType<"info" | "warning" | "success" | "error" | false | ReactElement>;
    onClose?: React.DOMAttributes<"button">['onClick'];
}

export type AlertMesssageType = string | ReactElement | AlertProps

export const Alert = ({ children, ...rest }: AlertProps) => {
    let [{
        title,
        variant,
        icon,
        color,
        direction,
        slotProps,
        onClose,
        ..._props
    }] = useInterface<any>("Alert", rest, {
        variant: "fill"
    })
    color ??= "default"
    direction ??= "row"

    const _p: any = {}
    if (title) _p.title = title
    if (variant) _p.variant = variant
    if (icon) _p.icon = icon
    if (color) _p.color = color
    if (direction) _p.direction = direction

    const p: any = useBreakpointProps(_p)

    title = p.title
    variant = p.variant
    icon = p.icon
    color = p.color
    direction = p.direction

    let isRow = direction === 'row'


    const template = useColorTemplate(color, variant)
    delete template.hover

    let iconsx = {
        fontSize: isRow ? 22 : 40,
        color: color === 'default' ? "text.primary" : template.color
    }

    const icons: any = {
        "info": <InfoIcon sx={iconsx} />,
        "warning": <WarningIcon sx={iconsx} />,
        "success": <SuccessIcon sx={iconsx} />,
        "danger": <ErrorIcon sx={iconsx} />
    }

    let _icon = icons[icon] || icons[color]

    return (
        <Tag
            {..._props}
            baseClass="alert"
            sxr={{
                justifyContent: "flex-start",
                position: "relative",
                radius: 1,
                px: isRow ? (_icon ? .5 : 2) : 3,
                py: isRow ? .5 : 3,
                flexDirection: "column",
                display: 'flex',
                fontFamily: "default",
                ..._props?.sx
            }}
            {...template}
        >
            {
                onClose && <IconButton
                    color={color}
                    variant={variant === 'fill' ? "fill" : "text"}
                    size={25}
                    sx={{
                        position: "absolute",
                        top: 5,
                        right: 5
                    }}
                    onClick={onClose}
                    className="alert-close-button"
                >
                    <IconClose fontSize={18} />
                </IconButton>
            }
            <Tag
                sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: direction,
                    alignItems: isRow ? "flex-start" : "center"
                }}
                baseClass="alert-container"
            >
                {
                    _icon && <Tag
                        baseClass="alert-icon"
                        sxr={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: isRow ? 1 : 0,
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
                    sxr={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        color: template.color,
                        py: 1,
                        textAlign: isRow ? "left" : "center",
                        gap: isRow ? 0 : 1
                    }}
                >
                    {title && <>
                        {
                            isValidElement(title) ? <Tag className="alert-title">{title}</Tag> : <Text
                                className="alert-title"
                                variant="text"
                                sx={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: template.color
                                }}
                            >{title}</Text>
                        }
                    </>}
                    <Tag
                        sxr={{
                            fontSize: 14,
                            fontFamily: "default",
                        }}
                    >
                        {children}
                    </Tag>
                </Tag>
            </Tag>
        </Tag>
    )
}

export type AlertConfirmProps = Omit<AlertProps, 'children' | 'onClose' | 'variant' | "size"> & {
    content?: ReactNode;
    size?: "small" | "medium" | "large" | number;
    closeButton?: boolean;
    clickOutsideToClose?: boolean;
    okButtonText?: string;
    closeButtonText?: string;
    hideOkButton?: boolean;
    hideCloseButton?: boolean;
    buttonPlacement?: "start" | "end" | "between" | "full";
    variant?: "text" | "fill"
    onConfirm?: (ok: boolean) => void;
    transition?: UseTransitionVariantTypes;
    blurMode?: ModalProps['blurMode'];
    slotProps?: {
        modal?: Omit<ModalProps, "childred" | "transition" | "blurMode">;
        okButton?: Omit<ButtonProps, "children">;
        closeButton?: Omit<ButtonProps, "children">;
    }
}

Alert.confirm = (props: AlertConfirmProps) => {
    const id = "_" + Math.random().toString(16)
    let {
        content,
        size,
        color,
        direction,
        variant,
        closeButton,
        clickOutsideToClose,
        okButtonText,
        closeButtonText,
        hideOkButton,
        hideCloseButton,
        buttonPlacement,
        onConfirm,
        transition,
        blurMode,
        slotProps,
        ...rest
    } = props

    hideOkButton ??= false
    hideCloseButton ??= false

    size ??= "small"
    color ??= 'default'
    variant ??= "text"
    direction ??= "row"
    buttonPlacement ??= "end"
    let sx: any = {};

    switch (buttonPlacement) {
        case "start":
            sx.justifyContent = 'flex-start'
            break;
        case "end":
            sx.justifyContent = 'flex-end'
            break;
        case "between":
            sx.justifyContent = 'space-between'
            break;
        case "full":
            sx = {
                "& button": {
                    flex: 1
                }
            }
            break;
    }

    let sizes: any = {
        small: 320,
        medium: 400,
        large: 600
    }

    const close = () => Modal.close(id)
    let okcolor = color
    let closecolor = color
    if (color === 'default') {
        okcolor = 'brand'
        closecolor = 'default'
        variant = 'text'
    } else {
        if (variant === 'fill') {
            okcolor = 'default'
            closecolor = 'default'
        } else {
            okcolor = color
            closecolor = 'default'
        }
    }

    return Modal.open(id, <Alert
        direction={direction}
        sx={{
            px: 2,
            py: 1,
            pt: direction === 'row' ? 1 : 2
        }}
        color={color}
        variant={variant}
        onClose={closeButton ? close : undefined}
        {...rest}
    >
        {content}
        <Tag
            sxr={{
                display: "flex",
                gap: 1,
                pt: 4,
                flexDirection: "row",
                ...sx,
            }}
        >
            {!hideCloseButton && <Button
                color={closecolor}
                variant="fill"
                {...slotProps?.closeButton}
                onClick={() => {
                    close()
                    onConfirm && onConfirm(false)
                }}
            >{closeButtonText || "Close"}</Button>}
            {!hideOkButton && <Button
                color={okcolor}
                variant="fill"
                {...slotProps?.okButton}

                onClick={() => {
                    Modal.close(id)
                    onConfirm && onConfirm(true)
                }}
            >{okButtonText || "OK"}</Button>}
        </Tag>
    </Alert>, {
        ...slotProps?.modal,
        size: sizes[size] || size,
        blur: 40,
        blurMode: blurMode || "transparent",
        transition: transition || "zoom",
        onClickOutside: () => {
            clickOutsideToClose && close()
        }
    })
}

export default Alert