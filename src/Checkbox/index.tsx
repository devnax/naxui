'use client'
import React, { useState, ReactElement } from 'react';
import { Tag, TagProps, TagComponenntType } from 'naxui-manager';
import CheckIcon from 'naxui-icons/round/CheckBox'
import UnCheckIcon from 'naxui-icons/round/CheckBoxOutlineBlank'
import IndeterminateCheckBoxIcon from 'naxui-icons/round/IndeterminateCheckBox';

export type CheckboxProps<T extends TagComponenntType = "input"> = TagProps<T> & {
    checkIcon?: ReactElement;
    uncheckIcon?: ReactElement;
    indeterminate?: boolean;
    checked?: boolean;
    size?: number;
}

const Checkbox = <T extends TagComponenntType = "input">({ children, size, checkIcon, uncheckIcon, checked, indeterminate, color, disabled, ...rest }: CheckboxProps<T>, ref?: React.Ref<any>) => {
    const [c, set] = useState(false)
    checked = checked || c
    size = size || 22
    rest.onChange = rest.onChange || (() => set(!c));
    if (indeterminate) {
        checked = true
        checkIcon = <IndeterminateCheckBoxIcon />
    }
    return (
        <Tag
            baseClass='checkbox'
            component='span'
            cursor="pointer"
            display="inline-block"
            color={checked ? (`color.${color || "primary"}`) : "color.subtext"}
            disabled={disabled}
            position="relative"
            verticalAlign="middle"
            width={size}
            height={size}
        >
            {checked ? (checkIcon || <CheckIcon fontSize={size} />) : (uncheckIcon || <UnCheckIcon fontSize={size} />)}
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
export default React.forwardRef(Checkbox) as typeof Checkbox
