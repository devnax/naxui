import React, { useEffect, useRef, useState } from 'react'
import Stack from '../../src/Stack'
import Input from '../../src/Input'
import IconButton from '../../src/IconButton'
import SendIcon from 'naxui-icons/round/Send'
import SearchIcon from 'naxui-icons/round/Search'
import Section from '../Layout/Section'

const Inputs = () => {
    const [v, setV] = useState('')
    return (
        <Stack gap={2}>
            <Section title="Basic" gap={2}>
                <Input
                    endIcon={<SendIcon />}
                    placeholder='Write a message...'
                />
                <Input
                    variant='outline'
                    startIcon={<SearchIcon />}
                    endIcon={<SendIcon />}
                />
            </Section>
            <Section title="Size" gap={2}>
                <Input
                    size="small"
                    endIcon={<SendIcon />}
                />
                <Input
                    size="medium"
                    endIcon={<SendIcon />}
                />
                <Input
                    size="large"
                    endIcon={<SendIcon />}
                />
            </Section>
            <Section title="Error" gap={2}>
                <Input
                    size="small"
                    endIcon={<SendIcon />}
                    error
                />
                <Input
                    size="medium"
                    endIcon={<SendIcon />}
                    error
                    helperText='Please fill this box'
                />
                <Input
                    size="large"
                    endIcon={<SendIcon />}
                    autoFocus
                />
            </Section>
            <Section title="Disabled" gap={2}>
                <Input
                    size="medium"
                    endIcon={<SendIcon />}
                    disabled
                />
            </Section>
            <Section title="Multiline" gap={2}>
                <Input
                    size="medium"
                    endIcon={<IconButton variant='text'><SendIcon /></IconButton>}
                    multiline
                    value={v}
                    placeholder='Type a message...'
                    onChange={(nv: any) => {
                        setV(nv.target.value)
                    }}
                />
            </Section>
        </Stack>
    )
}

export default Inputs