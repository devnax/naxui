import React from "react"
import Stack from "../../src/Stack"
import Button from "../../src/Button"
import Container from "../../src/Container"
import Modal from "../../src/Modal"
import Input from "../../src/Input"
import Label from "../../src/Label"
import MetaBox from "../MetaBox"
import Text from "../../src/Text"


const Form = () => {
    return (
        <Stack px={4} py={2}>
            <Stack flexRow p={2} px={0}>
                <Text fontWeight="bold">Login To Your Account</Text>
            </Stack>
            <Stack gap={2.4} py={3} >
                <Stack gap={1}>
                    <Label>Email</Label>
                    <Input label="Email" />
                </Stack>
                <Stack gap={1}>
                    <Label>Password</Label>
                    <Input label="Password" />
                </Stack>
            </Stack>
            <Stack flexRow p={2} px={0} justifyContent="flex-end" gap={2}>
                <Button variant="text" color="error" onClick={() => Modal.close("mymod")}>Cancel</Button>
                <Button>Submit</Button>
            </Stack>
        </Stack >
    )
}

const Modals = () => {
    return (
        <Container maxWidth="md">
            <MetaBox title="Colors">
                <Stack flexRow gap={2} alignItems="center" flexWrap="wrap">
                    <Button
                        onClick={() => {
                            Modal.open("mymod", <Form />, {
                                closeButton: false,
                                rootProps: {
                                    p: 0
                                }
                            })
                        }}
                    >Open</Button>
                </Stack>
            </MetaBox >
        </Container >
    )
}

export default Modals