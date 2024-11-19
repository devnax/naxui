import React, { useState } from 'react'
import Stack from '../../src/Stack'
import Select from '../../src/Select'
import Option from '../../src/Option'
import Tabs from '../../src/Tabs'
import Tab from '../../src/Tab'
import Checkbox from '../../src/Checkbox'
import HomeIcon from 'naxui-icons/round/Home'
import Section from '../Layout/Section'
import Text from '../../src/Text'

const TabItem = ({ color, variant, verticle }: any) => {
    const [val, setVal] = useState<string>("home")
    color ??= "brand"
    variant ??= "end-line"
    return (
        <Stack gap={3} direction="row" alignItems='center'>
            <Tabs
                verticle={verticle}
                variant={variant}
                color={color}
                radius={1}
                overflow="hidden"
                bgcolor="background.secondary"
                value={val}
                onChange={(v: any) => {
                    setVal(v)
                }}
            >
                <Tab value="home" startIcon={<HomeIcon />}>Home</Tab>
                <Tab value="about">About, Naxrul Ahmed</Tab>
                <Tab value="Services">Services for your matches</Tab>
                {/* <Tab value="contact">Contact Us</Tab>
                <Tab value="Blogs">Blogs</Tab> */}
            </Tabs>
        </Stack>
    )
}


const TabView = () => {
    const [color, setColor] = useState("brand")
    const [variant, setVariant] = useState("start-line")
    const [verticle, setVerticle] = useState(false)
    return (
        <Stack gap={3}>
            <Stack flexRow gap={2}>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                >
                    <Checkbox
                        checked={verticle}
                        onChange={() => {
                            setVerticle(!verticle)
                        }}
                    />
                    <Text>Verticle?</Text>
                </Stack>
                <Select value={color} onChange={(v: any) => setColor(v)}>
                    <Option value="brand">brand</Option>
                    <Option value="accent">accent</Option>
                    <Option value="info">info</Option>
                    <Option value="success">success</Option>
                    <Option value="warning">warning</Option>
                    <Option value="danger">danger</Option>
                </Select>
                <Select value={variant} onChange={(v: any) => setVariant(v)}>
                    <Option value="start-line">start-line</Option>
                    <Option value="end-line">end-line</Option>
                    <Option value="fill">fill</Option>
                    <Option value="alpha">alpha</Option>
                    <Option value="outline">outline</Option>
                    <Option value="text">text</Option>
                </Select>
            </Stack>
            <TabItem color={color} variant={variant} verticle={verticle} />
        </Stack>
    )
}


export default TabView