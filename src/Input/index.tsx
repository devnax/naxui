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
    const [_focused, setFoused] = useState(false)

    focused = focused || _focused
    useEffect(() => {
        if (containerRef) {
            (containerRef as any).current = conRef?.current
        }
    }, [containerRef])
    useEffect(() => {
        autoFocused && setFoused(true)
    }, [autoFocused])

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
            borderColor={focused ? "primary.main" : "background.dark"}
            shadow={focused ? 2 : 0}
            transition=".2s"
            transitionProperty="border, box-shadow"
            {...containerProps}
        >
            {startIcon && <Tag component='span' flexBox pl={1} width={30} justifyContent="center" alignItems="center" color="text.primary" mr={.4}>{startIcon}</Tag>}
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
                {...rest}
                ref={ref}
                onFocus={(e: any) => {
                    setFoused(true)
                    onFocus && onFocus(e)
                }}
                onBlur={(e: any) => {
                    setFoused(false)
                    onBlur && onBlur(e)
                }}
                px={1}
            />
            {endIcon && <Tag flexBox component='span' width={30} pr={1} justifyContent="center" alignItems="center" color="text.primary" >{endIcon}</Tag>}
        </Stack>
    )
}
export default React.forwardRef(Input) as typeof Input
