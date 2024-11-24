'use client'
import React, { forwardRef, ReactElement, useState } from 'react';
import { Tag, TagProps, useColorTemplateColors, useInterface } from 'naxui-manager';

export type SwitchProps = Omit<TagProps<"input">, "color" | "size" | "component" | "type" | "checked"> & {
    checked?: boolean;
    size?: number | "small" | "medium" | "large";
    color?: Omit<useColorTemplateColors, "default">;
    disabled?: boolean;
    thumbSize?: number;
    trackSize?: number;
    icon?: ReactElement;
    slotProps?: {
        thumb?: Omit<TagProps, 'children'>;
        track?: Omit<TagProps, 'children'>;
    }
}

const _Switch = (props: SwitchProps, ref?: React.Ref<any>) => {
    let [{ size, checked, color, disabled, icon, onChange, trackSize, slotProps, ...rest }] = useInterface<any>("Switch", props, {})
    const [c, set] = useState(false)
    checked ??= c
    size ??= "medium"
    color ??= "brand"

    onChange = onChange || (() => set(!c));

    let sizes: any = {
        small: 32,
        medium: 48,
        large: 60
    }
    let _size = sizes[size as any] || size

    let height = (_size / 2)
    trackSize ??= height + 4
    let isNormalSize = (height + 4) === trackSize
    let transform = checked ? "92%" : "8%"
    if (!isNormalSize) {
        transform = checked ? "100%" : "-10%"
    }

    return (
        <Tag
            disabled={disabled}
            sxr={{
                width: _size,
                height: height,
                position: "relative",
                cursor: "pointer",
                display: "inline-block"
            }}
            onClick={onChange}
        >
            <Tag
                {...slotProps?.track}
                baseClass='switch-track-bar'
                sxr={{
                    width: _size,
                    height: trackSize,
                    borderRadius: height,
                    position: 'absolute',
                    top: "50%",
                    transform: "translateY(-50%)",
                    bgcolor: checked ? color : "divider",

                }}
            >
            </Tag>
            <Tag
                {...slotProps?.thumb}
                baseClass='switch-thumb'
                sxr={{
                    transition: "all .25s",
                    width: height,
                    height: height,
                    radius: height,
                    bgcolor: "#FFFFFF",
                    position: "absolute",
                    top: "50%",
                    border: isNormalSize ? 0 : 1,
                    left: 0,
                    transform: `translate(${transform}, -50%)`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                {
                    icon
                }
            </Tag>
            <Tag
                {...rest}
                component='input'
                ref={ref}
                type="radio"
                readOnly
                checked={checked}
                sxr={{
                    display: "none!important"
                }}
            />
        </Tag>
    )
}

const Switch = forwardRef(_Switch) as typeof _Switch
export default Switch
