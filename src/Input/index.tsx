'use client'
import React, { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';
import Text from '../Text';

export type InputProps<T extends TagComponentType = "input"> = TagProps<T> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    focused?: boolean;
    autoFocused?: boolean;
    containerProps?: TagProps<"div">;
    containerRef?: MutableRefObject<HTMLDivElement | undefined>;
    variant?: "filled" | "outlined";
    error?: boolean;
    helperText?: string;
    multiline?: boolean;
}

const _Input = <T extends TagComponentType = "input">(props: InputProps<T>, ref?: React.Ref<any>) => {
    let {
        children,
        startIcon,
        endIcon,
        onFocus,
        onBlur,
        focused,
        autoFocused,
        containerProps,
        containerRef,
        disabled,
        variant,
        error,
        helperText,
        multiline,
        ...rest
    } = props
    const [_focused, setFocused] = useState(autoFocused || false)
    const conRef: any = useRef()
    const inpRef: any = ref || useRef()
    let _focus = focused || _focused

    useEffect(() => {
        if (autoFocused && !_focus) {
            setFocused(true)
        }
    }, [])

    useEffect(() => {
        if (containerRef) {
            (containerRef as any).current = conRef?.current
        }
    }, [containerRef])

    useEffect(() => {
        if (_focus) {
            inpRef.current.focus()
        }
    }, [_focus])

    variant = variant || "outlined"
    let borderColor = _focus ? "primary" : (variant === "filled" ? "transparent" : "background.secondary")
    borderColor = error ? "error" : borderColor

    return (
        <Tag>
            <Tag
                baseClass='input'
                disabled={disabled || false}
                ref={conRef}
                flexBox
                flexDirection="row"
                alignItems="center"
                minWidth={150}
                transitionProperty="border, box-shadow, background"
                bgcolor={variant === "filled" ? "paper" : "background.primary"}
                border={1}
                borderColor={borderColor}
                borderRadius={1}
                {...containerProps}
            >
                {startIcon && <Tag component='span' flexBox pl={1} width={30} justifyContent="center" alignItems="center" color={error ? "error" : "text.secondary"} mr={.4}>{startIcon}</Tag>}
                <Tag
                    flex={1}
                    component={multiline ? 'textarea' : 'input'}
                    border={0}
                    outline={0}
                    bgcolor="transparent"
                    width="100%"
                    color={error ? "error" : "text.primary"}
                    fontSize="text"
                    py={1}
                    px={1}
                    {...rest}
                    ref={inpRef}
                    onFocus={(e: any) => {
                        (focused === undefined) && setFocused(true)
                        onFocus && onFocus(e)
                    }}
                    onBlur={(e: any) => {
                        (focused === undefined) && setFocused(false)
                        onBlur && onBlur(e)
                    }}
                />
                {endIcon && <Tag flexBox component='span' width={30} pr={1} justifyContent="center" alignItems="center" color={error ? "error" : "text.secondary"} >{endIcon}</Tag>}
            </Tag>
            {helperText && <Text mt={.5} className="input-helper-text" fontSize="small" color={error ? "error" : "text.primary"}>{helperText}</Text>}
        </Tag>
    )
}
const Input = React.forwardRef(_Input) as typeof _Input
export default Input
