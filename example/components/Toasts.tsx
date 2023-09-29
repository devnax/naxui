import React from "react"
import Stack from "../../src/Stack"
import Button from "../../src/Button"
import Container from "../../src/Container"
import Toast from "../../src/Toast"
import MetaBox from "../MetaBox"

const Toasts = () => {
    return (
        <Container maxWidth="md">
            <MetaBox title="Colors">
                <Stack flexRow gap={16} alignItems="center">
                    <Button
                        onClick={() => {
                            Toast.open(Math.random().toString(), () => <>wellcome</>, {
                                placement: "top-left"
                            })
                        }}
                    >Top Left</Button>

                    <Button
                        onClick={() => {
                            Toast.open(Math.random().toString(), () => <>wellcome</>, {
                                placement: "top-center"
                            })
                        }}
                    >Top Center</Button>
                    <Button
                        onClick={() => {
                            Toast.open(Math.random().toString(), () => <>wellcome</>, {
                                placement: "top-right"
                            })
                        }}
                    >Top Right</Button>
                    <Button
                        onClick={() => {
                            Toast.open(Math.random().toString(), () => <>wellcome</>, {
                                placement: "bottom-left"
                            })
                        }}
                    >Bottom Left</Button>

                    <Button
                        onClick={() => {
                            Toast.open(Math.random().toString(), () => <>wellcome</>, {
                                placement: "bottom-center"
                            })
                        }}
                    >Bottom Center</Button>
                    <Button
                        onClick={() => {
                            Toast.open(Math.random().toString(), () => <>wellcome</>, {
                                placement: "bottom-right"
                            })
                        }}
                    >Bottom Right</Button>
                </Stack>
            </MetaBox>
        </Container>
    )
}

export default Toasts