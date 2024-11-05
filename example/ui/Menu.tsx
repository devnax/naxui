import React, { useRef, useState } from 'react'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import Menu from '../../src/Menu'
import List from '../../src/List'
import ListItem from '../../src/ListItem'

const Menus = () => {
    const [target, setTarget] = useState<any>()
    return (
        <div>

            <Stack
                pt={40}
                alignItems="center"
                justifyContent="center"
            >
                <Button
                    onClick={(e) => {
                        setTarget(!target ? e.currentTarget : null)
                    }}
                >Open</Button>
                <Menu target={target} onClickOutside={() => setTarget(null)}>
                    <List width={180} variant="fill" bgcolor="background.primary" shadow={5}>
                        <ListItem >Home</ListItem>
                        <ListItem >About</ListItem>
                        <ListItem >Services</ListItem>
                        <ListItem >Contact</ListItem>
                    </List>
                </Menu>
            </Stack>

        </div>
    )
}

export default Menus