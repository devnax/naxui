import React from 'react'
import Stack from '../../src/Stack'
import Layer from '../../src/Layer'
import Text from '../../src/Text'
import Button from '../../src/Button'
import Transition from '../../src/Transition'
import Section from '../Layout/Section'

const Content = ({ name }: any) => {
    return (
        <Stack
            bgcolor="brand.primary"
            height={100}
            justifyContent="center"
            alignItems="center"
            width={100}
            radius={2}
        >
            <Text color="brand.text" p={3} >{name}</Text>
        </Stack>
    )
}


const Transitions = () => {
    const [open, setOpen] = React.useState(false)
    return (
        <Section title="Transitions">
            <div>
                <Transition
                    hideable
                    open={open}
                    variant="fadeDown"
                >
                    <div>
                        <Content />
                    </div>
                </Transition>
            </div>
            {/* <div>
                <Transition
                    open={open}
                    variant="fadeUp"
                >
                    <div>
                        <Content />
                    </div>
                </Transition>
            </div> */}

            {/* <Transition
                in={open}
                type="fade"
            >
                <Content name="grow" />
            </Transition> */}
            {/* <Transition
                in={open}
                type="zoom"
            >
                <Content name="zoom" />
            </Transition> */}
            <Stack>

            </Stack>
            <Button
                onClick={() => {
                    setOpen(!open)
                }}
            >Open</Button>
        </Section>
    )
}

export default Transitions