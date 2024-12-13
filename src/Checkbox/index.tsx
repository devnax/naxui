'use client'
import React, { useState, ReactElement } from 'react';
import { Tag, useInterface, useColorTemplateColors, TagProps, useBreakpointProps } from 'naxui-manager';
import CheckIcon from 'naxui-icons/round/CheckBox'
import UnCheckIcon from 'naxui-icons/round/CheckBoxOutlineBlank'
import IndeterminateCheckBoxIcon from 'naxui-icons/round/IndeterminateCheckBox';
import { useBreakpoinPropsType } from 'naxui-manager/dist/breakpoint/useBreakpointProps';

export type CheckboxProps = Omit<TagProps<"input">, "color" | "size" | "component" | "type" | "checked"> & {
    checkIcon?: useBreakpoinPropsType<ReactElement>;
    uncheckIcon?: useBreakpoinPropsType<ReactElement>;
    indeterminate?: useBreakpoinPropsType<boolean>;
    checked?: boolean;
    size?: useBreakpoinPropsType<number | "small" | "medium" | "large">;
    color?: useBreakpoinPropsType<useColorTemplateColors>;
}

const _Checkbox = (props: CheckboxProps, ref?: React.Ref<any>) => {
    let [{ color, size, checkIcon, uncheckIcon, checked, indeterminate, disabled, onChange, ...rest }] = useInterface<any>("Checkbox", props, {})
    const _p: any = {}
    if (checkIcon) _p.checkIcon = checkIcon
    if (uncheckIcon) _p.uncheckIcon = uncheckIcon
    if (indeterminate) _p.indeterminate = indeterminate
    if (size) _p.size = size
    if (color) _p.color = color
    const p: any = useBreakpointProps(_p)

    checkIcon = p.checkIcon
    uncheckIcon = p.uncheckIcon
    indeterminate = p.indeterminate
    size = p.size
    color = p.color

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
