import React from 'react'
import Stack from '../../src/Stack'
import Layer from '../../src/Layer'
import Text from '../../src/Text'
import Button from '../../src/Button'
import Section from '../Layout/Section'

const Content = () => {
    return (
        <Stack
            bgcolor="brand.primary"
            height={350}
            justifyContent="center"
            alignItems="center"
            width={300}
        >
            <Text variant='h2' p={3} >Wellcome</Text>
        </Stack>
    )
}


const Layers = () => {
    return (
        <Section title="Layers">
            <Button
                onClick={() => Layer.open("hello", <Content />, {
                    closeOutsideClick: true,
                })}
            >Open</Button>
        </Section>
    )
}

export default Layers