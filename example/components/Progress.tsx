import React, { useState } from "react";
import CircleProgress from '../../src/CircleProgress'
import LineProgress from '../../src/LineProgress'
import Stack from '../../src/Stack'
import Button from '../../src/Button'
import IconButton from '../../src/IconButton'
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
            </MetaBox>
            <MetaBox title="Color" >
                <Stack flexRow gap={16}>
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
                <Stack flexRow gap={16}>
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
                <Stack flexRow gap={16} mb={2}>
                    <CircleProgress color="paper" value={progress} size={50} showPercentage />
                    <CircleProgress color="primary" value={progress} size={50} trackSize={1}>
                        <IconButton
                            size={45}
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
                <Stack gap={16} mb={2}>
                    <LineProgress color="paper" duration={.5} />
                    <LineProgress color="primary" duration={1} />
                    <LineProgress color="secondary" duration={1.5} />
                    <LineProgress color="info" duration={2} />
                    <LineProgress color="success" duration={2.5} />
                    <LineProgress color="warning" duration={3} />
                    <LineProgress color="error" duration={3.5} value={progress} />
                </Stack>
            </MetaBox>
        </Stack>
    )
}

export default CircleProgresss