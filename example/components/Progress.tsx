import React, { useState } from "react";
import CircleProgress from '../../src/CircleProgress'
import LineProgress from '../../src/LineProgress'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import List from '../../src/List'
import ListItem from '../../src/ListItem'
import IconButton from '../../src/IconButton'
import Divider from '../../src/Divider'
import PlusIcon from 'naxui-icons/round/Add'
import MetaBox from "../MetaBox"



const CircleProgresss = () => {
    const [progress, setProgress] = useState(0)
    let update = () => {
        progress >= 100 && setProgress(0)
        setTimeout(() => {
            setProgress(p => (p + 1))
            if (progress < 100) {
                update()
            }
        }, 10);
    }


    return (
        <Stack>
            <MetaBox title="Color" >
                <List>
                    <ListItem selected>Home</ListItem>
                    <Divider />
                    <ListItem>About</ListItem>
                    <ListItem>Services</ListItem>
                </List>
            </MetaBox>
            <MetaBox title="Color" >
                <Stack flexRow gap={2}>
                    <CircleProgress color="paper" />
                    <CircleProgress color="primary" />
                    <CircleProgress color="secondary" />
                    <CircleProgress color="info" />
                    <CircleProgress color="success" />
                    <CircleProgress color="warning" />
                    <CircleProgress color="error" />
                </Stack>
            </MetaBox>

            <MetaBox title="Size" >
                <Stack flexRow gap={2}>
                    <CircleProgress color="paper" size={20} />
                    <CircleProgress color="primary" size={30} />
                    <CircleProgress color="secondary" size={40} />
                    <CircleProgress color="info" size={50} />
                    <CircleProgress color="success" size={60} />
                    <CircleProgress color="warning" size={70} />
                    <CircleProgress color="error" size={80} />
                </Stack>
            </MetaBox>
            <MetaBox title="Value" >
                <Stack flexRow gap={2} mb={2}>
                    <CircleProgress color="paper" value={progress} size={50} showPercentage />
                    <CircleProgress color="success" size={50} thumbSize={5} >
                        <IconButton
                            variant="filled"
                            size={48}
                            onClick={() => {
                                update()
                            }}
                        >
                            <PlusIcon fontSize={14} />
                        </IconButton>
                    </CircleProgress>
                    <CircleProgress color="secondary" value={50} />
                    <CircleProgress color="info" value={60} />
                    <CircleProgress color="success" value={70} />
                    <CircleProgress color="warning" value={80} />
                    <CircleProgress color="error" value={90} />
                </Stack>
                <Button onClick={() => {
                    update()
                }}>Toggle</Button>
            </MetaBox>
            <MetaBox title="Value" >
                <Stack gap={2} mb={2}>
                    <LineProgress color="paper" speed={.5} />
                    <LineProgress color="primary" speed={1} />
                    <LineProgress color="secondary" speed={1.5} />
                    <LineProgress color="info" speed={2} />
                    <LineProgress color="success" speed={2.5} />
                    <LineProgress color="warning" speed={3} />
                    <LineProgress color="error" thumbSize={8} speed={3.5} value={30} />
                </Stack>
            </MetaBox>
        </Stack>
    )
}

export default CircleProgresss