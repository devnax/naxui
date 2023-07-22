import React, { ReactElement, useMemo, useState } from 'react'
import Input, { InputProps } from '../Input'
import List from '../List'
import ListItem from '../ListItem'
import Menu, { MenuProps } from '../Menu'
import Stack from '../Stack'

import DownIcon from 'naxui-icons/round/KeyboardArrowDown';
import UpIcon from 'naxui-icons/round/KeyboardArrowUp';


export type OptionProps = {
    label: string;
    value: string;
    icon?: ReactElement;
}

export type SelectProps = InputProps & {
    options: OptionProps[];
    value?: OptionProps;
    onChange?: (item: OptionProps) => void;
    menuProps?: Omit<MenuProps, 'children'>;
}

const Select = ({ options, onChange, value, menuProps, ...inputProps }: SelectProps) => {
    const [target, setTarget] = useState<any>()

    const { renderedOptions, hasActive } = useMemo(() => {
        let _hasActive = false
        const _opts = options.map((option, idx) => {
            const isActive = value?.value === option.value
            if (!_hasActive && isActive) {
                _hasActive = true
            }
            return <ListItem
                key={idx}
                onClick={() => {
                    onChange && onChange(option)
                }}
                active={isActive}
                startIcon={option?.icon}
            >{option.label}</ListItem>
        })

        return {
            renderedOptions: _opts,
            hasActive: _hasActive
        }
    }, [onChange, options, value])

    return (
        <>
            <Input
                baseClass='select-input'
                endIcon={<Stack flexDirection="row" component="span" pr={2}> {(target ? <UpIcon /> : <DownIcon />)}</Stack>}
                readOnly
                cursor="pointer"
                value={hasActive ? (value?.label || "") : ""}
                startIcon={hasActive ? value?.icon : undefined}
                containerProps={{
                    cursor: "pointer"
                }}
                {...inputProps}
                onFocus={(e: any) => {
                    setTarget(e.currentTarget.parentElement)
                    inputProps.onFocus && inputProps.onFocus(e)
                }}
                onBlur={(e) => {
                    setTarget(null)
                    inputProps.onBlur && inputProps.onBlur(e)
                }}
            />
            <Menu
                baseClass='select-menu'
                target={target}
                placement="bottom"
                width={target?.clientWidth || 0}
                transition="fadeInUp"
                mt={1}
                bgcolor="background.dark"
                {...menuProps}
            >
                <List
                    sx={{
                        '& > *': {
                            mb: 0
                        }
                    }}
                >
                    {renderedOptions}
                </List>
            </Menu>
        </>
    )
}

export default Select