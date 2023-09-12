'use client'
import React, { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import Stack, { StackProps } from '../Stack';
import Box from '../Box';
import Text from '../Text';

export type InputProps<T extends TagComponenntType = "input"> = TagProps<T> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    focused?: boolean;
    autoFocused?: boolean;
    containerProps?: StackProps;
    containerRef?: MutableRefObject<HTMLDivElement | undefined>;
    variant?: "filled" | "outlined";
    error?: boolean;
    helperText?: string;
}

const _Input = <T extends TagComponenntType = "input">(props: InputProps<T>, ref?: React.Ref<any>) => {
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
        ...rest
    } = props
    const [_focused, setFocused] = useState(autoFocused || false)
    const conRef: any = useRef()
    const inpRef: any = ref || useRef()
    let _focus = focused || _focused

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
    let borderColor = _focus ? "color.primary" : (variant === "filled" ? "transparent" : "color.divider")
    borderColor = error ? "color.error" : borderColor

    return (
        <Box>
            <Stack
                baseClass='input'
                disabled={disabled || false}
                ref={conRef}
                flexDirection="row"
                alignItems="center"
                minWidth={150}
                transition=".2s"
                transitionProperty="border, box-shadow, background"
                bgcolor={variant === "filled" ? "color.paper" : "transparent"}
                border={1}
                borderColor={borderColor}
                borderRadius={1}
                {...containerProps}
            >
                {startIcon && <Tag component='span' flexBox pl={1} width={30} justifyContent="center" alignItems="center" color={error ? "color.error" : "color.subtext"} mr={.4}>{startIcon}</Tag>}
                <Tag
                    flex={1}
                    component='input'
                    border={0}
                    outline={0}
                    bgcolor="transparent"
                    width="100%"
                    color={error ? "color.error" : "color.text"}
                    fontSize="fontsize.text"
                    py={1.5}
                    px={1.5}
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
                {endIcon && <Tag flexBox component='span' width={30} pr={1} justifyContent="center" alignItems="center" color={error ? "color.error" : "color.subtext"} >{endIcon}</Tag>}
            </Stack>
            {helperText && <Text mt={.5} fontSize={"fontsize.small"} color={error ? "color.error" : "color.text"}>{helperText}</Text>}
        </Box>
    )
}
const Input = React.forwardRef(_Input) as typeof _Input
export default Input
