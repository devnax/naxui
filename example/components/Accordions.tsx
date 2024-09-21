import React from 'react'
import Accordion from '../../src/Accordion'
import Stack from '../../src/Stack'
import ExpandIcon from "naxui-icons/round/Settings";


const Accordions = () => {
    const [expand, setExpand] = React.useState(1)
    return (
        <Stack border={1} borderColor="background.secondary" radius={1} overflow="hidden" width={600}>
            <Accordion expand={expand === 1} onChange={exp => setExpand(exp ? 1 : 0)} borderBottom={1} borderColor="background.secondary" endIcon={<ExpandIcon />} title="Built with MUI v5 with two versions Next.js | Vite">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tenetur dolorem pariatur illo eveniet, at qui temporibus commodi nemo architecto voluptatem, deleniti ex eius distinctio accusantium omnis magni iste amet!
            </Accordion>
            <Accordion expand={expand === 2} onChange={exp => setExpand(exp ? 2 : 0)} title="The theme is ready to change to any style you want.">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tenetur dolorem pariatur illo eveniet, at qui temporibus commodi nemo architecto voluptatem, deleniti ex eius distinctio accusantium omnis magni iste amet!
            </Accordion>
        </Stack>
    )
}

export default Accordions