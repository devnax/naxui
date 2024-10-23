import React from 'react'
import Stack from '../../src/Stack'
import Avatar from '../../src/Avatar'
import Section from '../Layout/Section'

const Avatars = () => {
    return (
        <Stack>
            <Section title="Basic" flexRow gap={2}>
                <Avatar />
                <Avatar size={45} />
                <Avatar size={50} />
            </Section>
        </Stack>
    )
}

export default Avatars