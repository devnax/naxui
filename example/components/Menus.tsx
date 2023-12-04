import React, { useEffect, useRef, useState } from "react"
import Menu from '../../src/Menu'
import Button from '../../src/Button'
import Stack from '../../src/Stack'
import Divider from '../../src/Divider'
import Drawer from '../../src/Drawer'
import Select from '../../src/Select'
import Option from '../../src/Option'
const Menus = () => {
    const ref: any = useRef()
    const [target, setTarget] = useState<any>()
    useEffect(() => {
        // document.addEventListener("contextmenu", (e) => {
        //     e.preventDefault()
        //     Menu.openContextMenu(e as any, <Stack p={2}>
        //         Child
        //     </Stack>)
        // })
    }, [])

    return (
        <div >
            <Select mb={2} containerProps={{ mb: 2, width: 100 }}>
                <Option value={1}>Home</Option>
            </Select>

            <Button
                onClick={() => {
                    Drawer.open(<h1>Hello</h1>, {})
                }}
            >Open Drawer</Button>
            <Menu target={target} menuRef={ref} onClickOutside={() => setTarget(null)}>
                Well
            </Menu>
            <Button
                onClick={(e: any) => {
                    Menu.open(e.target, <Stack>
                        <Button onClick={(se: any) => {
                            Menu.open(se.target, <Stack p={2}>
                                Child
                            </Stack>)
                        }}>Sub</Button>
                    </Stack>)
                }}
            >Menu1</Button>
            <Divider my={1} />
            <Button
                onClick={(e) => {
                    Menu.close()
                }}
            >Menu2</Button>
        </div>
    )
}

export default Menus