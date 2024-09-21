import React from "react"
import Stack from "../../src/Stack"
import Button from "../../src/Button"
import IconButton from "../../src/IconButton"
import Container from "../../src/Container"
import Badge from "../../src/Badge"
import MetaBox from "../MetaBox"
import InfoIcon from 'naxui-icons/round/Info';
import HomeIcon from 'naxui-icons/round/Home';
import IconClose from 'naxui-icons/round/Close';


const Buttons = () => {
    return (
        <Container maxWidth="md">
            <MetaBox title="Icon Button" gap={2}>
                <Stack flexRow gap={2} alignItems="center" flexWrap="wrap">
                    <IconButton color="default">
                        <IconClose />
                    </IconButton>
                    <IconButton >
                        <IconClose />
                    </IconButton>
                    <IconButton color="accent">
                        <IconClose />
                    </IconButton>
                    <IconButton color="success">
                        <IconClose />
                    </IconButton>
                    <IconButton color="info">
                        <IconClose />
                    </IconButton>
                    <IconButton color="warning">
                        <IconClose />
                    </IconButton>
                    <IconButton color="danger">
                        <IconClose />
                    </IconButton>
                </Stack>
                <Stack flexRow gap={2} alignItems="center" flexWrap="wrap">
                    <IconButton variant="fill">
                        <IconClose />
                    </IconButton>
                    <IconButton color="accent" variant="outline">
                        <IconClose />
                    </IconButton>
                    <IconButton color="success" variant="alpha">
                        <IconClose />
                    </IconButton>
                    <IconButton color="info" variant="text">
                        <IconClose />
                    </IconButton>
                </Stack>
                <Stack flexRow gap={2} alignItems="center" flexWrap="wrap">
                    <IconButton size={24} color="danger">
                        <IconClose />
                    </IconButton>
                    <IconButton color="accent" size={28}>
                        <IconClose />
                    </IconButton>
                    <IconButton color="success" size={32}>
                        <IconClose />
                    </IconButton>
                    <IconButton color="info" size={38}>
                        <IconClose />
                    </IconButton>
                </Stack>


            </MetaBox>
            <MetaBox title="Colors">
                <Stack flexRow gap={2} alignItems="center" flexWrap="wrap">
                    <Button color="default" loading>Button</Button>
                    <Button startIcon={<InfoIcon />} color="brand" loading>Button</Button>
                    <Button startIcon={<InfoIcon />} color="info">Button</Button>
                    <Button color="accent" endIcon={<HomeIcon />}>Button</Button>
                    <Button color="warning">Button</Button>
                    <Button color="success">Button</Button>
                    <Button color="danger">Button</Button>
                </Stack>
            </MetaBox>
            <MetaBox title="Variants">
                <Stack flexRow gap={2} alignItems="center" flexWrap="wrap">
                    <Button color="brand" variant="fill">Button</Button>
                    <Button color="brand" variant="outline">Button</Button>
                    <Button color="brand" variant="text">Button</Button>
                </Stack>
            </MetaBox>
            <MetaBox title="Sizes">
                <Stack flexRow gap={2} alignItems="center" flexWrap="wrap">
                    <Button color="brand" size="small">Button</Button>
                    <Button color="brand" size="medium">Button</Button>
                    <Button color="brand" size="large">Button</Button>
                </Stack>
            </MetaBox>
        </Container>
    )
}

export default Buttons