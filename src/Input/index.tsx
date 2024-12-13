'use client'
import React, { MutableRefObject, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Tag, TagProps, TagComponentType, useInterface, useColorTemplateColors, useBreakpointProps, useBreakpointPropsType } from 'naxui-manager';
import Text from '../Text';


export type InputProps<T extends TagComponentType = "input"> = Omit<TagProps<T>, "size" | "color"> & {
    startIcon?: useBreakpointPropsType<ReactElement>;
    endIcon?: useBreakpointPropsType<ReactElement>;
    iconPlacement?: useBreakpointPropsType<"start" | "center" | "end">;
    focused?: boolean;
    color?: useBreakpointPropsType<Omit<useColorTemplateColors, "default">>;
    containerRef?: MutableRefObject<HTMLDivElement | undefined>;
    variant?: useBreakpointPropsType<"fill" | "outline" | "text">;
    error?: boolean;
    helperText?: useBreakpointPropsType<string>;
    multiline?: boolean;
    size?: useBreakpointPropsType<"small" | "medium" | "large">;
    rows?: useBreakpointPropsType<number>;
    minRows?: useBreakpointPropsType<number>;
    maxRows?: useBreakpointPropsType<number>;
    slotProps?: {
        container?: Omit<TagProps<"div">, "children">
    }
}

const _Input = <T extends TagComponentType = "input">({ value, ...props }: InputProps<T>, ref?: React.Ref<any>) => {
    let [{
        startIcon,
        endIcon,
        iconPlacement,
        onFocus,
        color,
        onBlur,
        focused,
        containerRef,
        disabled,
        variant,
        error,
        helperText,
        multiline,
        size,
        rows,
        minRows,
        maxRows,
        slotProps,
        ...rest
    }] = useInterface<any>("Input", props, {})
    const _p: any = {}
    if (startIcon) _p.startIcon = startIcon
    if (endIcon) _p.endIcon = endIcon
    if (iconPlacement) _p.iconPlacement = iconPlacement
    if (color) _p.color = color
    if (variant) _p.variant = variant
    if (helperText) _p.helperText = helperText
    if (size) _p.size = size
    if (rows) _p.rows = rows
    if (minRows) _p.minRows = minRows
    if (maxRows) _p.maxRows = maxRows
    const p: any = useBreakpointProps(_p)
    startIcon = p.startIcon
    endIcon = p.endIcon
    iconPlacement = p.iconPlacement
    color = p.color ?? "brand"
    variant = p.variant ?? "fill"
    helperText = p.helperText
    size = p.size ?? 'medium'
    rows = p.rows
    minRows = p.minRows
    maxRows = p.maxRows

    ref ??= useRef(null);
    iconPlacement ??= multiline ? "end" : "center"
    if (!value) iconPlacement = 'center'

    const [_focused, setFocused] = useState(false)
    const conRef: any = useRef()
    let _focus = focused || _focused

    useEffect(() => {
        if (containerRef) {
            (containerRef as any).current = conRef?.current
        }
    }, [containerRef])

    let _rows = useMemo(() => {
        if (rows) return rows
        if (value && multiline) {
            let lines = (value as string).split(`\n`).length
            if (minRows && minRows > lines) {
                return minRows
            } else if (maxRows && maxRows < lines) {
                return maxRows
            } else {
                return lines
            }
        }
    }, [value]) || 1

    const sizes: any = {
        small: {
            height: 38,
            gap: .5,
            fontSize: 14,
        },
        medium: {
            height: 44,
            gap: 1,
            fontSize: 16
        },
        large: {
            height: 52,
            gap: 1,
            fontSize: 18
        }
    }

    const _size = sizes[size]
    let borderColor = _focus ? color : (variant === "fill" ? "transparent" : "divider")
    borderColor = error ? "danger.primary" : borderColor
    let multiprops: any = {}
    if (multiline) {
        multiprops = {
            rows: _rows,
            sx: {
                resize: "none"
            }
        }
    }

    useEffect(() => {
        if ((ref as any).current) {
            (ref as any).current.style.height = "auto";
            (ref as any).current.style.height = `${(ref as any).current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <Tag
            baseClass={`input${_focus ? " input-focused" : ""}`}
        >
            <Tag
                {...slotProps?.container}
                sxr={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: iconPlacement === 'center' ? iconPlacement : `flex-${iconPlacement}`,
                    flexWrap: "nowrap",
                    minWidth: 150,
                    transitionProperty: "border, box-shadow, background",
                    bgcolor: error ? "danger.alpha" : variant === "fill" ? "background.secondary" : "background.primary",
                    border: variant === "text" ? 0 : 1,
                    borderColor: borderColor,
                    borderRadius: 1,
                    px: 1,
                    py: .5,
                }}
                baseClass='input-container'
                disabled={disabled || false}
                ref={conRef}
                {..._size}
                height={multiline ? "auto" : _size.height}
                minHeight={_size.height}
            >
                {startIcon && <Tag
                    sxr={{
                        height: "100%",
                        alignItems: 'center',
                        justifyContent: "center",
                        display: "flex",
                        color: error ? "danger.primary" : "text.secondary",
                    }}
                    baseClass="input-start-icon"
                >{startIcon}</Tag>}
                <Tag
                    sxr={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        minHeight: _size.height,
                    }}
                >
                    <Tag
                        component={multiline ? 'textarea' : 'input'}
                        {...multiprops}
                        {...rest}
                        sxr={{
                            border: 0,
                            outline: 0,
                            bgcolor: "transparent",
                            color: error ? "danger.primary" : "text.primary",
                            fontSize: _size.fontSize,
                            height: multiline ? "auto" : _size.height,
                            width: "100%",
                            maxHeight: 200,
                        }}
                        value={value}
                        baseClass='input-box'
                        ref={ref}
                        onFocus={(e: any) => {
                            focused ?? setFocused(true)
                            onFocus && onFocus(e)
                        }}
                        onBlur={(e: any) => {
                            focused ?? setFocused(false)
                            onBlur && onBlur(e)
                        }}
                    />
                </Tag>
                {endIcon && <Tag
                    sxr={{
                        height: "100%",
                        alignItems: 'center',
                        justifyContent: "center",
                        display: 'flex',
                        color: error ? "danger.primary" : "text.secondary",
                    }}
                    baseClass="input-end-icon"
                >{endIcon}</Tag>}
            </Tag>
            {helperText && <Text
                pl={.5}
                height={_size.height}
                className="input-helper-text"
                fontSize="small"
                color={error ? "danger.primary" : "text.primary"}
            >{helperText}</Text>}
        </Tag>
    )
}
const Input = React.forwardRef(_Input) as typeof _Input
export default Input
