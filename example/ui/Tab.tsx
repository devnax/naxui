import React, { useState } from 'react'
import Stack from '../../src/Stack'
import Tabs from '../../src/Tabs'
import Tab from '../../src/Tab'

const Alerts = () => {
    const [val, setVal] = useState("home")
    return (
        <Stack gap={1}>
            <Tabs value={val}>
                <Tab value="home">Home</Tab>
                <Tab value="about">About</Tab>
                <Tab value="Services">Services</Tab>
            </Tabs>
        </Stack>
    )
}


export default Alerts