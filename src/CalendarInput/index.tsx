"use client"
import Input, { InputProps } from '../Input'
import Menu, { MenuProps } from '../Menu'
import React, { useRef, useState } from 'react'
import Calendar, { CalendarProps } from '../Calendar'
import Stack from '../Stack'
import ClickOutside from '../ClickOutside'
import CalendarIcon from 'naxui-icons/round/CalendarMonth';
import IconButton from '../IconButton'
import ClearIcon from 'naxui-icons/round/Clear';
import { useInterface } from 'naxui-manager'

export type CalenderInpurProps = Omit<InputProps, "value" | "onChange"> & {
    value?: CalendarProps["value"];
    onChange?: CalendarProps["onChange"];
    getInputValue?: (value?: Date | null) => string;
    slotProps?: {
        calender?: CalendarProps;
        menu?: MenuProps;
    }
}

const CalenderInput = (props: CalenderInpurProps) => {
    let [{ value, onChange, getInputValue, slotProps, placeholder, ...inputProps }] = useInterface<any>("CanlendarInput", props, {})
    const [target, setTarget] = useState<any>()
    const inputRef: any = useRef()

    return (
        <>
            <Input
                readOnly
                onClick={() => setTarget(target ? null : inputRef?.current)}
                startIcon={<CalendarIcon />}
                {...inputProps}
                endIcon={<>
                    {value && <Stack>
                        <IconButton
                            color="default"
                            size={28}
                            variant="text"
                            onClick={() => {
                                onChange && onChange(null)
                            }}
                        >
                            <ClearIcon fontSize={20} />
                        </IconButton>
                    </Stack>}
                </>}
                cursor="pointer"
                containerRef={inputRef}
                value={getInputValue ? getInputValue(value) : (value ? value.toLocaleDateString("en-US") : "")}
            />
            <Menu
                target={target}
                placement="bottom-left"
                bgcolor="transparent"
                {...slotProps?.menu}
            >
                <ClickOutside onClickOutside={() => setTarget(null)}>
                    <Calendar
                        {...slotProps?.calender}
                        value={value}
                        onChange={(e) => {
                            setTarget(null)
                            onChange && onChange(e)
                        }}
                    />
                </ClickOutside>
            </Menu>
        </>
    )
}

export default CalenderInput