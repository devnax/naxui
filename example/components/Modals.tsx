import React from "react"
import Stack from "../../src/Stack"
import Button from "../../src/Button"
import Container from "../../src/Container"
import Modal from "../../src/Modal"
import MetaBox from "../MetaBox"
import Text from "../../src/Text"

const Toasts = () => {
    return (
        <Container maxWidth="md">
            <MetaBox title="Colors">
                <Stack flexRow gap={16} alignItems="center" flexWrap="wrap">
                    <Button
                        onClick={() => {
                            Modal.open("mymod", <Text>Wellcome</Text>)
                        }}
                    >Open</Button>
                </Stack>
            </MetaBox >
        </Container >
    )
}

export default Toasts