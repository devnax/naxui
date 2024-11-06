'use client'
import React, { useState, ReactElement } from 'react';
import { Tag, useInterface, useColorTemplateColors, TagComponentType, TagProps } from 'naxui-manager';
import CheckIcon from 'naxui-icons/round/CheckBox'
import UnCheckIcon from 'naxui-icons/round/CheckBoxOutlineBlank'
import IndeterminateCheckBoxIcon from 'naxui-icons/round/IndeterminateCheckBox';

export type CheckboxProps<T extends TagComponentType = "div"> = Omit<TagProps<T>, "color" | "onClick" | "children" | "size"> & {
    checkIcon?: ReactElement;
    uncheckIcon?: ReactElement;
    indeterminate?: boolean;
    checked?: boolean;
    size?: number | "small" | "medium" | "large";
    color?: useColorTemplateColors;
    onChange?: () => void;
}

const _Checkbox = <T extends TagComponentType = "div">(props: CheckboxProps<T>, ref?: React.Ref<any>) => {
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
        medium: 28,
        large: 32
    }

    if (typeof size === 'string' && sizes[size]) {
        size = sizes[size]
    }

    return (
        <Tag
            {...rest}
            baseClass='checkbox'
            ref={ref}
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
    )
}
const Checkbox = React.forwardRef(_Checkbox) as typeof _Checkbox
export default Checkbox
