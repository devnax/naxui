import React, { useState } from 'react'
import Stack from '../../src/Stack'
import Chip from '../../src/Chip'
import IconButton from '../../src/IconButton'
import Section from '../Layout/Section'
import HomeIcon from 'naxui-icons/round/Home'
import CloseIcon from 'naxui-icons/round/Close'

const ChipBox = ({ color }) => {
    return (
        <Section title={color} gap={2} flexRow alignItems="center">
            <Chip
                size="small"
                color={color}
                variant="fill"
                label='Active'
            />
            <Chip
                size="medium"
                color={color}
                variant='outline'
                label='Deactive'
            />
            <Chip
                size='large'
                color={color}
                variant='alpha'
                label='Panding'
            />
            <Chip
                color={color}
                variant='text'
                label='Processing'
            />
        </Section>
    )
}

const Chips = () => {
    const [value, setValue] = useState("A")
    return (
        <Stack gap={3}>
            <ChipBox color="default" />
            <ChipBox color="brand" />
            <ChipBox color="accent" />
            <ChipBox color="success" />
            <ChipBox color="warning" />
            <ChipBox color="danger" />
            <Section title={"Sizes"} gap={2} flexRow alignItems="center">
                <Chip
                    startIcon={<HomeIcon fontSize={16} />}
                    size="small"
                    variant="fill"
                    label='Hello'
                />
                <Chip
                    size="medium"
                    variant='outline'
                    label='Hello'
                    startIcon={<IconButton variant='fill' size={22}><CloseIcon /></IconButton>}
                    endIcon={<IconButton variant='fill' size={22}><CloseIcon /></IconButton>}
                />
                <Chip
                    size="large"
                    variant='alpha'
                    label='This is a chip box'
                    startIcon={<IconButton variant='fill' size={22}><CloseIcon /></IconButton>}
                    endIcon={<IconButton variant='fill' size={22}><CloseIcon /></IconButton>}
                />
            </Section>
        </Stack>
    )
}

export default Chips