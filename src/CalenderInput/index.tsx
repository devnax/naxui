"use client"
import Input, { InputProps } from '../Input'
import Menu, { MenuProps } from '../Menu'
import React, { useRef, useState } from 'react'
import Calendar, { CalenderProps } from '../Calender'
import Stack from '../Stack'
import ClickOutside from '../ClickOutside'
import CalendarIcon from 'naxui-icons/round/CalendarMonth';
import IconButton from '../IconButton'
import ClearIcon from 'naxui-icons/round/Clear';

export type CalenderInpurProps = CalenderProps & {
    inputProps?: InputProps;
    menuProps?: MenuProps;
    getInputValue?: (value?: Date | null) => string
}

const CalenderInput = ({ value, onChange, getInputValue, inputProps, menuProps }: CalenderInpurProps) => {
    const [target, setTarget] = useState<any>()
    const inputRef: any = useRef()

    return (
        <>
            <Input
                readOnly
                onClick={() => setTarget(inputRef?.current)}
                startIcon={<CalendarIcon />}
                {...inputProps}
                endIcon={<>
                    {value && <Stack>
                        <IconButton
                            size={26}
                            onClick={() => {
                                onChange && onChange(null)
                            }}
                            sx={{
                                color: "color.paper.subtext"
                            }}
                        >
                            <ClearIcon fontSize={20} />
                        </IconButton>
                    </Stack>}
                </>}
                containerProps={{
                    maxWidth: (36 * 7) + 18,
                    ...(inputProps?.containerProps),
                    ref: inputRef
                }}
                value={getInputValue ? getInputValue(value) : (value ? value.toLocaleDateString("en-US") : "")}
            />
            <Menu
                target={target}
                placement="bottom"
                bgcolor="transparent"
                {...menuProps}
            >
                <ClickOutside onClickOutside={() => setTarget(null)}>
                    <Stack>
                        <Calendar
                            value={value}
                            onChange={onChange}
                            onButtonClick={(mode) => {
                                if (mode === 'day') {
                                    setTarget(null)
                                }
                            }}
                        />
                    </Stack>
                </ClickOutside>
            </Menu>
        </>
    )
}

export default CalenderInput