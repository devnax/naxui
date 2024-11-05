import React from 'react'
import Collaps from '../../src/Collaps'
import Stack from '../../src/Stack'
import ExpandIcon from "naxui-icons/round/Settings";
import Section from '../Layout/Section'
import Button from '../../src/Button';

const Accordions = () => {
    const [expand, setExpand] = React.useState(false)
    return (
        <Stack>
            <Section title="Basic" gap={2}>
                <Button
                    onClick={() => {
                        setExpand(!expand)
                    }}
                >Toggle</Button>
                <Collaps
                    open={expand}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores tenetur dolorem pariatur illo eveniet, at qui temporibus commodi nemo architecto voluptatem, deleniti ex eius distinctio accusantium omnis magni iste amet!
                </Collaps>
            </Section>

        </Stack>
    )
}

export default Accordions