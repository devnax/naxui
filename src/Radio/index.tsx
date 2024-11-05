'use client'
import React from 'react';
import { useInterface } from 'naxui-manager';
import CheckIcon from 'naxui-icons/round/RadioButtonChecked'
import UnCheckIcon from 'naxui-icons/round/RadioButtonUnchecked'
import Checkbox, { CheckboxProps } from '../Checkbox';

export type RadioProps = CheckboxProps
const _Radio = (props: RadioProps, ref?: React.Ref<any>) => {
    let [rest] = useInterface<any>("Radio", props, {})
    return <Checkbox
        checkIcon={<CheckIcon />}
        uncheckIcon={<UnCheckIcon />}
        {...rest}
        ref={ref}
        classNames={['radio', ...(rest?.classNames || [])]}
    />
}
const Radio = React.forwardRef(_Radio) as typeof _Radio
export default Radio
