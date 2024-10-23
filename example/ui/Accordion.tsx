import React from 'react'
import Accordion from '../../src/Accordion'
import Stack from '../../src/Stack'
import ExpandIcon from "naxui-icons/round/Settings";
import Section from '../Layout/Section'

const Accordions = () => {
    const [expand, setExpand] = React.useState(1)
    return (
        <Stack>
            <Section title="Basic">
                <Stack border={1} borderColor="divider" radius={1} overflow="hidden" maxWidth={600}>
                    <Accordion
                        expand={expand === 1}
                        onClick={() => setExpand(expand === 1 ? 0 : 1)}
                        endIcon={<ExpandIcon />}
                        title="Built with MUI v5 with two versions Next.js | Vite"
                        expandIconPlacement='start'
                        borderBottom={1}
                        borderColor="divider"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tenetur dolorem pariatur illo eveniet, at qui temporibus commodi nemo architecto voluptatem, deleniti ex eius distinctio accusantium omnis magni iste amet!
                    </Accordion>
                    <Accordion
                        expand={expand === 2}
                        onClick={() => setExpand(expand === 2 ? 0 : 2)}
                        title="The theme is ready to change to any style you want."
                        color="danger"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tenetur dolorem pariatur illo eveniet, at qui temporibus commodi nemo architecto voluptatem, deleniti ex eius distinctio accusantium omnis magni iste amet!
                    </Accordion>
                </Stack>
            </Section>

        </Stack>
    )
}

export default Accordions