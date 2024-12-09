import React from 'react'
import Scrollbar from '../../src/Scrollbar'
import Stack from '../../src/Stack'

const Accordion = () => {
    return (
        <Stack
            height={100}

            width={200}
        >
            <Scrollbar
                thumbColor='red'
                thumbSize={1}
                onScrollEnd={() => console.log("adas")}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, asperiores. Esse consectetur numquam doloremque sunt voluptas ullam unde quaerat atque cumque alias? Accusantium ullam cum cupiditate, animi mollitia facere deserunt.
            </Scrollbar>
        </Stack >
    )
}

export default Accordion