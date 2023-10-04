import React from "react"
import Stack from "../../src/Stack"
import Button from "../../src/Button"
import Container from "../../src/Container"
import Confirm from "../../src/Confirm"
import MetaBox from "../MetaBox"

const Confirms = () => {
    return (
        <Container maxWidth="md">
            <MetaBox title="Confirms">
                <Stack flexRow gap={16} alignItems="center" flexWrap="wrap">
                    <Button
                        onClick={async () => {
                            const is = await Confirm({
                                title: "Are you sure?",
                                message: "This action cannot be undone. All values associate with this field will be lost",
                                type: "error",
                                buttonPlacement: "right",
                                inlineText: true
                            })


                        }}
                    >Open</Button>
                    <Button
                        onClick={async () => {
                            const is = await Confirm({
                                title: "Success",
                                message: "You may lost the data so you need to recover again.",
                                type: "success",
                                buttonPlacement: "half",
                            }, () => { })
                        }}
                    >Another</Button>
                </Stack>
            </MetaBox >
        </Container >
    )
}

export default Confirms