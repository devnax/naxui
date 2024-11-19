import React from 'react'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import Tooltip from '../../src/Tooltip'
import Section from '../Layout/Section'

const Tooltips = () => {
    return (
        <Stack>
            <Section title="Basic" flexRow gap={2}>
                <Tooltip title="Hover">
                    <Button >Toggle</Button>
                </Tooltip>
            </Section>
        </Stack>
    )
}

export default Tooltips