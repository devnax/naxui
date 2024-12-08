'use client'
import React, { useState, ReactElement } from 'react';
import { Tag, useInterface, useColorTemplateColors, TagProps } from 'naxui-manager';
import CheckIcon from 'naxui-icons/round/CheckBox'
import UnCheckIcon from 'naxui-icons/round/CheckBoxOutlineBlank'
import IndeterminateCheckBoxIcon from 'naxui-icons/round/IndeterminateCheckBox';

export type CheckboxProps = Omit<TagProps<"input">, "color" | "size" | "component" | "type" | "checked"> & {
    checkIcon?: ReactElement;
    uncheckIcon?: ReactElement;
    indeterminate?: boolean;
    checked?: boolean;
    size?: number | "small" | "medium" | "large";
    color?: useColorTemplateColors;
}

const _Checkbox = (props: CheckboxProps, ref?: React.Ref<any>) => {
    let [{ color, size, checkIcon, uncheckIcon, checked, indeterminate, disabled, onChange, ...rest }] = useInterface<any>("Checkbox", props, {})
    const [c, set] = useState(false)
    checked ??= c
    size ??= "medium"
    color ??= "brand"

    onChange = onChange || (() => set(!c));
    if (indeterminate) {
        checked = true
        checkIcon = <IndeterminateCheckBoxIcon />
    }

    let sizes: any = {
        small: 22,
        medium: 24,
        large: 32
    }

    if (typeof size === 'string' && sizes[size]) {
        size = sizes[size]
    }

    return (
        <>
            <Tag
                baseClass='checkbox'
                onClick={() => {
                    onChange && onChange()
                }}
                sxr={{
                    height: size,
                    width: size,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: checked ? color : "text.secondary",
                    cursor: "pointer",
                    disabled: disabled,
                    "& svg": {
                        fontSize: size
                    },
                    ...rest?.sx
                }}
            >
                {checked ? (checkIcon || <CheckIcon />) : (uncheckIcon || <UnCheckIcon />)}
            </Tag>
            <Tag
                {...rest}
                component='input'
                ref={ref}
                readOnly
                type="checkbox"
                checked={checked}
                sxr={{
                    display: "none!important"
                }}
            />
        </>
    )
}
const Checkbox = React.forwardRef(_Checkbox) as typeof _Checkbox
export default Checkbox
