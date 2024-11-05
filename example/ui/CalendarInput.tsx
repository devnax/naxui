import React, { useState } from 'react'
import Stack from '../../src/Stack'
import CalendarInput from '../../src/CalendarInput'

const CalendarInputs = () => {
    const [value, setValue] = useState(null)
    return (
        <Stack>
            <CalendarInput
                value={value}
                placeholder='Birth of date'
                onChange={(d: any) => {
                    setValue(d)
                }}
            />
        </Stack>
    )
}

export default CalendarInputs