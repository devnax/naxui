import React, { useState } from 'react'
import Calender from '../../src/Calendar'
import Stack from '../../src/Stack'
import Section from '../Layout/Section'

const Calendars = () => {
    const [value, setValue] = useState()

    return (
        <Stack>
            <Section title="Basic">
                <Calender
                    value={value}
                    onChange={(c: any) => {
                        setValue(c)
                    }}
                />
            </Section>
        </Stack>
    )
}

export default Calendars