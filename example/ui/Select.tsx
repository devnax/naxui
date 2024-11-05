import React, { useState } from 'react'
import Stack from '../../src/Stack'
import Select from '../../src/Select'
import Option from '../../src/Option'

const SelectMenu = () => {
    const [value, setValue] = useState<any>("")
    return (
        <div>
            <Stack
                pt={4}
                alignItems="center"
                justifyContent="center"
            >
                <Select
                    value={value}
                    onChange={(val) => {
                        setValue(val)
                    }}
                >
                    <Option value="Home">Home</Option>
                    <Option value="About">About</Option>
                    <Option value="Services">Services</Option>
                    <Option value="Contact">Contact</Option>
                </Select>
            </Stack>

        </div>
    )
}

export default SelectMenu