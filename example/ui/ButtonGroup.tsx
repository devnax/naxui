import React from 'react'
import Stack from '../../src/Stack'
import ButtonGroup from '../../src/ButtonGroup'
import Button from '../../src/Button'
import Section from '../Layout/Section'
import NextIcon from 'naxui-icons/round/ArrowForward'
import PrevIcon from 'naxui-icons/round/ArrowBack'

const ButtonGroups = () => {
    return (
        <Stack>
            <Section title="Basic" gap={2} direction="row">
                <ButtonGroup
                    color='brand'
                    variant='alpha'
                    size="small"
                >
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                </ButtonGroup>
                <ButtonGroup
                    color='default'
                    variant='alpha'
                    size="small"
                >
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                </ButtonGroup>
            </Section>
            <Section title="Basic" gap={2} direction="row">
                <ButtonGroup
                    color='success'
                    variant='alpha'
                    size="small"
                >
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                </ButtonGroup>
                <ButtonGroup
                    color='danger'
                    variant='alpha'
                    size="medium"
                >
                    <Button><PrevIcon /></Button>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button><NextIcon /></Button>
                </ButtonGroup>
                <ButtonGroup
                    color='warning'
                    variant='alpha'
                    size="large"
                >
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                </ButtonGroup>
            </Section>
        </Stack>
    )
}

export default ButtonGroups