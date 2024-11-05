import React, { useState } from 'react'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import Modal from '../../src/Modal'
import Text from '../../src/Text'

const Modals = () => {
    const [open, setOpen] = useState<any>(false)
    let close = () => {
        Modal.close("modal")
    }

    let modalContent = <Stack gap={3} p={2}>
        <Text variant="h6">Modal Header</Text>
        <Text>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, sequi libero reiciendis ipsam aut illo fuga ut nihil iure dolorum quam magni rerum ad fugiat. Nobis sapiente animi eligendi adipisci.
        </Text>
        <Stack
            justifyContent="flex-end"
            direction="row"
            gap={2}
        >
            <Button color="default" onClick={close}>Cancel</Button>
            <Button onClick={close}>Apply</Button>
        </Stack>
    </Stack>

    return (
        <div>
            <Stack
                pt={40}
                alignItems="center"
                justifyContent="center"
            >
                <Button
                    onClick={(e) => {
                        // setOpen(!open)
                        Modal.open("modal", modalContent, { blur: 2 })
                    }}
                >Open</Button>
                <Modal open={open} blur={20} onClickOutside={() => setOpen(false)}>
                    <Stack gap={3}>
                        <Text variant="h6">Modal Header</Text>
                        <Text>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, sequi libero reiciendis ipsam aut illo fuga ut nihil iure dolorum quam magni rerum ad fugiat. Nobis sapiente animi eligendi adipisci.
                        </Text>
                        <Stack
                            justifyContent="flex-end"
                            direction="row"
                            gap={2}
                        >
                            <Button color="default" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={() => setOpen(false)}>Apply</Button>
                        </Stack>
                    </Stack>
                </Modal>
            </Stack>

        </div>
    )
}

export default Modals