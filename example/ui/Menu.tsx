import React, { useRef, useState } from 'react'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import Menu from '../../src/Menu'
import List from '../../src/List'
import ListItem from '../../src/ListItem'
import Section from '../Layout/Section'

const Menus = () => {
    const [target, setTarget] = useState<any>()
    return (
        <div>
            <Button
                onClick={(e) => {
                    setTarget(!target ? e.currentTarget : null)
                }}

            >Open</Button>
            <Menu target={target} onClickOutside={() => setTarget(null)}>
                <List width={180} variant="fill">
                    <ListItem>Home</ListItem>
                    <ListItem>About</ListItem>
                    <ListItem>Services</ListItem>
                    <ListItem>Contact</ListItem>
                </List>
            </Menu>
        </div>
    )
}

export default Menus