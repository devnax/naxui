import React from "react"
import Stack from "../../src/Stack"
import Box from "../../src/Box"
import Button from "../../src/Button"
import Container from "../../src/Container"
import Confirm from "../../src/Confirm"
import MetaBox from "../MetaBox"
import AlertDialog from "../../src/AlertDialog"
import Modal from "../../src/Modal"

const sleep = () => new Promise(r => setTimeout(r, 3000))

const Confirms = () => {

    return (
        <Container maxWidth="md">
            <MetaBox title="Confirms">
                <Stack flexRow gap={16} alignItems="center" flexWrap="wrap">
                    <Button
                        onClick={async () => {
                            const is = await Confirm.error({
                                title: "Are you sure?",
                                message: "This action cannot be undone. so be carefull go confirm this action.",
                                buttonPlacement: "full",
                                transition: "fadeDown"
                            })
                            if (is) {
                                let lid = AlertDialog({
                                    title: "Loading",
                                    message: "Your data is deleting...",
                                    modalProps: { closeButton: false }
                                })
                                await sleep()
                                Modal.close(lid)
                                AlertDialog.success({
                                    inlineText: true,
                                    title: "Success",
                                    message: "Your action complete successflly",
                                })
                            }

                        }}
                    >Open</Button>
                    <Button
                        onClick={async () => {
                            const is = await Confirm({
                                title: "Success",
                                message: "You may lost the data so you need to recover again.",
                                type: "warning",
                                buttonPlacement: "full",
                                transition: "fadeDown"
                            })
                        }}
                    >Another</Button>
                </Stack>
            </MetaBox>
        </Container>
    )
}

export default Confirms