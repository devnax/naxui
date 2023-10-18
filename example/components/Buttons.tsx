import React from "react"
import Stack from "../../src/Stack"
import Button from "../../src/Button"
import Container from "../../src/Container"
import MetaBox from "../MetaBox"
import InfoIcon from 'naxui-icons/round/Info';
import HomeIcon from 'naxui-icons/round/Home';

const Buttons = () => {
    return (
        <Container maxWidth="md">
            <MetaBox title="Colors">
                <Stack flexRow gap={16} alignItems="center" flexWrap="wrap">
                    <Button color="paper" >Button</Button>
                    <Button startIcon={<InfoIcon />} color="primary">Button</Button>
                    <Button startIcon={<InfoIcon />} color="info">Button</Button>
                    <Button color="secondary" endIcon={<HomeIcon />}>Button</Button>
                    <Button color="warning">Button</Button>
                    <Button color="success">Button</Button>
                    <Button color="error">Button</Button>
                </Stack>
            </MetaBox>
            <MetaBox title="Variants">
                <Stack flexRow gap={16} alignItems="center" flexWrap="wrap">
                    <Button color="primary" variant="filled">Button</Button>
                    <Button color="primary" variant="outlined">Button</Button>
                    <Button color="primary" variant="text">Button</Button>
                </Stack>
            </MetaBox>
            <MetaBox title="Sizes">
                <Stack flexRow gap={16} alignItems="center" flexWrap="wrap">
                    <Button color="primary" size="small">Button</Button>
                    <Button color="primary" size="medium">Button</Button>
                    <Button color="primary" size="large">Button</Button>
                </Stack>
            </MetaBox>
        </Container>
    )
}

export default Buttons