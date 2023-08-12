'use client'
import React, { MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import Stack, { StackProps } from '../Stack';

export type InputProps<T extends TagComponenntType = "input"> = TagProps<T> & {
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    focused?: boolean;
    autoFocused?: boolean;
    containerProps?: StackProps;
    containerRef?: MutableRefObject<HTMLDivElement | undefined>;
}

const Input = <T extends TagComponenntType = "input">({ children, startIcon, endIcon, onFocus, onBlur, focused, autoFocused, containerProps, containerRef, disabled, ...rest }: InputProps<T>, ref?: React.Ref<any>) => {
    const conRef: any = useRef()
    const inpRef: any = ref || useRef()
    const [_focused, setFocused] = useState(autoFocused || false)
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


    return (
        <Stack
            baseClass='input'
            disabled={disabled}
            ref={conRef}
            flexDirection="row"
            alignItems="center"
            bgcolor="background.dark"
            minWidth={150}
            radius={1}
            border={1}
            borderColor={_focus ? "primary.main" : "background.dark"}
            shadow={_focus ? 2 : 0}
            transition=".2s"
            transitionProperty="border, box-shadow"
            {...containerProps}
        >
            {startIcon && <Tag component='span' flexBox pl={1} width={30} justifyContent="center" alignItems="center" color="text.secondary" mr={.4}>{startIcon}</Tag>}
            <Tag
                flex={1}
                component='input'
                border={0}
                outline={0}
                bgcolor="transparent"
                width="100%"
                color="text.primary"
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
