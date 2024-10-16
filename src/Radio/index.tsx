'use client'
import React, { ReactElement } from 'react';
import { Tag, TagProps, TagComponentType } from 'naxui-manager';
import CheckIcon from 'naxui-icons/round/RadioButtonChecked'
import UnCheckIcon from 'naxui-icons/round/RadioButtonUnchecked'

export type RadioProps<T extends TagComponentType = "input"> = TagProps<T> & {
    checkIcon?: ReactElement;
    uncheckIcon?: ReactElement;
    size?: number;
    checked?: boolean;
    value: string | number;
}

const _Radio = <T extends TagComponentType = "input">({ children, size, checkIcon, uncheckIcon, value, checked, color, disabled, ...rest }: RadioProps<T>, ref?: React.Ref<any>) => {
    size = size || 22
    return (
        <Tag
            component='span'
            cursor="pointer"
            display="inline-block"
            color={checked ? (`${color || "primary"}`) : "text.secondary"}
            disabled={disabled}
            position="relative"
            verticalAlign="middle"
            width={size}
            height={size}
        >
            {checked ? (checkIcon || <CheckIcon fontSize={size} />) : (uncheckIcon || <UnCheckIcon fontSize={size} />)}
            <Tag
                value={value}
                {...rest}
                baseClass='radio'
                component='input'
                type="radio"
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

const Radio = React.forwardRef(_Radio) as typeof _Radio
export default Radio
