import React, { useState } from 'react'
import Stack from '../../src/Stack'
import Tabs from '../../src/Tabs'
import Tab from '../../src/Tab'
import HomeIcon from 'naxui-icons/round/Home'

const Alerts = () => {
    const [val, setVal] = useState<string>("home")
    return (
        <Stack gap={1} display='block'>
            <Tabs
                value={val}
                onChange={(v: any) => {
                    setVal(v)
                }}
            >
                <Tab value="home" startIcon={<HomeIcon />}>Home</Tab>
                <Tab value="about">About</Tab>
                <Tab value="Services">Services</Tab>
            </Tabs>
        </Stack>
    )
}


export default Alerts