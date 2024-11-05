import React, { useRef, useState } from 'react'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import Layer from '../../src/Layer'
import List from '../../src/List'
import ListItem from '../../src/ListItem'
import ClickOutside from '../../src/ClickOutside'

const Layers = () => {
    const [open, setOpen] = useState<any>(false)

    let layerContent = <Stack
        height="100%"
        alignItems="center"
        justifyContent="center"
    >
        <ClickOutside onClickOutside={() => setOpen(false)}>
            <Stack gap={2}>
                <Button
                    onClick={(e) => {
                        Layer.close("id")
                    }}
                >Close</Button>
                <List radius={1} width={180} variant="fill" bgcolor="background.primary" shadow={5}>
                    <ListItem >Home</ListItem>
                    <ListItem >About</ListItem>
                    <ListItem >Services</ListItem>
                    <ListItem >Contact</ListItem>
                </List>
            </Stack>
        </ClickOutside>
    </Stack>

    return (
        <div>
            <Stack
                pt={40}
                alignItems="center"
                justifyContent="center"
            >
                <Button
                    onClick={(e) => {
                        // setOpen(!open)
                        Layer.open("id", layerContent, {
                            blur: 20
                        })
                    }}
                >Open</Button>
                <Layer
                    open={open}
                    blur={20}
                    onClickOutside={() => setOpen(false)}
                >
                    {layerContent}
                </Layer>
            </Stack>
        </div>
    )
}

export default Layers