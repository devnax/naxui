'use client'
import React, { useState } from 'react';
import { Tag, TagProps, TagComponenntType, alpha } from 'naxui-manager';

export type SwitchProps<T extends TagComponenntType = "input"> = Omit<TagProps<T>, 'color'> & {
    checked?: boolean;
    size?: number;
    color?: "primary" | "secondary" | "success" | "error" | "warning";
}

const Switch = <T extends TagComponenntType = "input">({ children, size, checked, color, disabled, ...rest }: SwitchProps<T>, ref?: React.Ref<any>) => {
    const [c, set] = useState(false)
    checked = checked || c
    size = size || 24
    color = color || "primary"
    rest.onChange = rest.onChange || (() => set(!c));

    return (
        <Tag
            baseClass='switch'
            component='span'
            cursor="pointer"
            display="inline-flex"
            flexDirection="row"
            p={.2}
            alignItems="center"
            color={checked ? color : "text.secondary"}
            disabled={disabled}
            position="relative"
            verticalAlign="middle"
            bgcolor={checked ? alpha(color, 3) : alpha(color, 1.5)}
            width={size + (size / 5 * 4)}
            height={size}
            borderColor={checked ? `${color}.dark` : "divider"}
            radius={2}
            transition="background .3s"
        >
            <Tag
                transition="all .25s"
                position="absolute"
                top={2}
                left={checked ? size - 4 : 2}
                width={size - 4}
                height={size - 4}
                radius={size}
                bgcolor={checked ? `${color}` : "#FFF"}
                shadow={1}
                border={checked ? 0 : 0}
                borderColor="divider"
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
export default React.forwardRef(Switch) as typeof Switch
