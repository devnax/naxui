'use client'
import React, { useState } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';

export type SwitchProps<T extends TagComponenntType = "input"> = Omit<TagProps<T>, 'color'> & {
    checked?: boolean;
    size?: number;
    color?: "brand" | "accent" | "success" | "error" | "warning";
}

const _Switch = <T extends TagComponenntType = "input">({ children, size, checked, color, disabled, ...rest }: SwitchProps<T>, ref?: React.Ref<any>) => {
    const [c, set] = useState(false)
    checked = checked || c
    size = size || 44
    let _color = `${color || "primary"}`
    rest.onChange = rest.onChange || (() => set(!c));
    let height = (size / 2) + 4
    let thumbSize = height - 4

    return (
        <Tag
            baseClass='switch'
            component='span'
            cursor="pointer"
            display="inline-flex"
            flexDirection="row"
            alignItems="center"
            color={checked ? color : "text.secondary"}
            disabled={disabled}
            position="relative"
            verticalAlign="middle"
            bgcolor={checked ? _color : "paper"}
            width={size}
            height={height}
            radius={2}
            transition="background .3s"
        >
            <Tag
                component='span'
                transition="all .25s"
                transform={`translateX(${checked ? (size / 2) - 2 : 2}px)`}
                width={thumbSize}
                height={thumbSize}
                radius={size}
                bgcolor={"#FFF"}
                shadow={2}
            ></Tag>
            <Tag
                checked={checked}
                {...rest}
                component='input'
                type="checkbox"
                cursor="pointer"
                position="absolute"
                opacity={0}
                top={0}
                left={0}
                right={0}
                bottom={0}
                ref={ref}
            />
        </Tag>
    )
}

const Switch = React.forwardRef(_Switch) as typeof _Switch
export default Switch
