import React from 'react'
import Stack from '../../src/Stack'
import Text from '../../src/Text'
import Drawer from '../../src/Drawer'
import Button from '../../src/Button'
import Section from '../Layout/Section'

const Drawers = () => {
    const [open, setOpen] = React.useState(false)
    return (
        <Stack>
            <Section title="Basic" flexRow gap={2}>
                <Drawer
                    open={open}
                    onClickOutside={() => setOpen(false)}
                    placement='bottom'
                >
                    <Text>Hello World</Text>
                </Drawer>
                <Button onClick={() => setOpen(!open)}>Toggle</Button>
                <Button onClick={() => Drawer.open(<Text>Hello World</Text>)}>Open</Button>
            </Section>
        </Stack>
    )
}

export default Drawers