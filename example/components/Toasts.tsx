import React from "react"
import Stack from "../../src/Stack"
import Button from "../../src/Button"
import Container from "../../src/Container"
import Text from "../../src/Text"
import Toast from "../../src/Toast"
import MetaBox from "../MetaBox"

const Toasts = () => {
    return (
        <Container maxWidth="md">
            <MetaBox title="Colors">
                <Stack flexRow gap={16} alignItems="center" flexWrap="wrap">
                    <Button
                        onClick={() => {
                            Toast.open("Hi Naxrul Ahmed", {
                                placement: "top-left",
                                icon: "success"
                            })
                        }}
                    >Top Left</Button>

                    <Button
                        onClick={() => {
                            Toast.open(() => <>wellcome</>, {
                                placement: "top-center"
                            })
                        }}
                    >Top Center</Button>
                    <Button
                        onClick={() => {
                            Toast.open(() => <>wellcome</>, {
                                placement: "top-right"
                            })
                        }}
                    >Top Right</Button>
                    <Button
                        onClick={() => {
                            Toast.open(() => <>wellcome</>, {
                                placement: "bottom-left"
                            })
                        }}
                    >Bottom Left</Button>

                    <Button
                        onClick={() => {
                            Toast.open(() => <>wellcome</>, {
                                placement: "bottom-center"
                            })
                        }}
                    >Bottom Center</Button>
                    <Button
                        onClick={() => {
                            Toast.open(<>
                                <Text fontWeight={500} lineHeight="initial" color="#fff">Success</Text>
                                <Text lineHeight="initial" type="subtext" fontSize="fontsize.block" color="#fff">
                                    You have successfully created your account
                                </Text>
                            </>, {
                                placement: "bottom-right",
                                autoClose: false,
                                color: "error",
                                icon: "error"
                            })
                        }}
                    >Bottom Right</Button>
                    <Button
                        onClick={() => {
                            Toast.closeAll()
                        }}
                    >Close All</Button>
                </Stack>
            </MetaBox>
        </Container>
    )
}

export default Toasts