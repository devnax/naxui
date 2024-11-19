import React from 'react'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import Toast from '../../src/Toast'
import Section from '../Layout/Section'

const Toasts = () => {
    const [open, setOpen] = React.useState(false)
    return (
        <Stack>
            <Section title="Basic" flexRow gap={2}>
                <Button onClick={() => setOpen(!open)}>Toggle</Button>
                <Button onClick={() => Toast.open({
                    title: "Warning",
                    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                    color: "warning"
                })}>Open</Button>
            </Section>
        </Stack>
    )
}

export default Toasts