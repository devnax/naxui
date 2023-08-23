'use client'
import React, { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import { Tag, TagProps, TagComponenntType, alpha } from 'naxui-manager';
import Stack, { StackProps } from '../Stack';

import useUIVariant, { UseUIVariantTypes, UseUIVariantColorTypes } from '../useUIVariant'
import useCornerVariant, { UseCornerVariantTypes } from '../useCornerVariant'

export type InputProps<T extends TagComponenntType = "input"> = TagProps<T> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    focused?: boolean;
    autoFocused?: boolean;
    containerProps?: StackProps;
    containerRef?: MutableRefObject<HTMLDivElement | undefined>;

    color?: UseUIVariantColorTypes;
    variant?: UseUIVariantTypes;
    softness?: boolean | number;
    corner?: UseCornerVariantTypes;
}

const Input = <T extends TagComponenntType = "input">(props: InputProps<T>, ref?: React.Ref<any>) => {
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
        color,
        corner,
        softness,
        ...rest
    } = props
    softness = true
    const conRef: any = useRef()
    const inpRef: any = ref || useRef()
    const [_focused, setFocused] = useState(autoFocused || false)
    let _focus = focused || _focused
    const cornerCss = useCornerVariant(corner || "rounded")
    const uiCss: any = useUIVariant("outlined", color, softness as any)


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


    return (
        <Stack
            baseClass='input'
            disabled={disabled || false}
            ref={conRef}
            flexDirection="row"
            alignItems="center"
            minWidth={150}
            border={1}
            borderColor={_focus ? "primary.color" : "background.paper"}
            transition=".2s"
            transitionProperty="border, box-shadow"
            {...cornerCss}
            {...uiCss}
            {...containerProps}
            bgcolor={alpha("grey.3", .1)}
        >
            {startIcon && <Tag component='span' flexBox pl={1} width={30} justifyContent="center" alignItems="center" color="text.secondary" mr={.4}>{startIcon}</Tag>}
            <Tag
                flex={1}
                component='input'
                border={0}
                outline={0}
                bgcolor="transparent"
                width="100%"
                color={"text.primary"}
                fontSize="fontsize.1"
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
            {endIcon && <Tag flexBox component='span' width={30} pr={1} justifyContent="center" alignItems="center" color="text.secondary" >{endIcon}</Tag>}
        </Stack>
    )
}
export default React.forwardRef(Input) as typeof Input
