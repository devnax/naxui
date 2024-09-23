import React from 'react'
import Section from "../Layout/Section"
import Stack from '../../src/Stack'
import List from '../../src/List'
import ListItem from '../../src/ListItem'
import HomeIcon from 'naxui-icons/round/Home';
import InfoIcon from 'naxui-icons/round/Info';


const Lists = () => {
    return (
        <Stack>
            <Section title="List">
                <List width={200}>
                    <ListItem
                        startIcon={<HomeIcon />}
                        endIcon={<InfoIcon />}
                        subtitle="Another Item"
                        selected
                    >Home</ListItem>
                    <ListItem
                        startIcon={<HomeIcon />}
                        endIcon={<InfoIcon />}
                        subtitle="Administration"
                    >About</ListItem>
                    <ListItem>Services</ListItem>
                    <ListItem>Contact</ListItem>
                </List>
            </Section>
        </Stack>
    )
}

export default Lists