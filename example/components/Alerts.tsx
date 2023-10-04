import React from "react"
import Stack from "../../src/Stack"
import Button from "../../src/Button"
import Container from "../../src/Container"
import Alert from "../../src/Alert"
import MetaBox from "../MetaBox"

const Alerts = () => {
    return (
        <Container maxWidth="md">
            <MetaBox title="Alerts">
                <Stack flexRow gap={16} alignItems="center" flexWrap="wrap">
                    <Button
                        onClick={async () => {
                            Alert({
                                title: "Are you sure?",
                                message: "This action cannot be undone. All values associate with this field will be lost",
                                type: "error",
                                inlineText: true,
                                transition: "zoomOver"
                            })

                        }}
                    >Open</Button>
                    <Button
                        onClick={async () => {
                            Alert({
                                title: "Failed",
                                message: "You may lost the data so you need to recover again.",
                                type: "error",
                            })
                        }}
                    >Another</Button>
                </Stack>
            </MetaBox >
        </Container >
    )
}

export default Alerts