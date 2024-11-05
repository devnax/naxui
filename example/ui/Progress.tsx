import React from "react"
import Container from "../../src/Container"
import Section from "../Layout/Section"
import CircleProgress from "../../src/CircleProgress"
import LineProgress from "../../src/LineProgress"


const Colored = () => {
    return (
        <Section title="Colors" gap={2} flexRow>
            <CircleProgress
                color="default"
            />
            <CircleProgress
                color="brand"
            />
            <CircleProgress
                color="accent"
            />
            <CircleProgress
                color="info"
            />
            <CircleProgress
                color="success"
            />
            <CircleProgress
                color="warning"
            />
            <CircleProgress
                color="danger"
            />
        </Section>
    )

}

const ColoredLineProgress = () => {
    return (
        <Section title="Colors" gap={2}>
            <LineProgress
                color="default"
            />
            <LineProgress
                color="brand"
            />
            <LineProgress
                color="accent"
            />
            <LineProgress
                color="info"
            />
            <LineProgress
                color="success"
            />
            <LineProgress
                color="warning"
            />
            <LineProgress
                color="danger"
            />
        </Section>
    )

}

const Progresses = () => {
    return (
        <Container maxWidth="md">
            <Section title="Basic" gap={2} flexRow>
                <CircleProgress
                    size={40}
                />
                <CircleProgress
                    color="accent"
                    size={40}
                />
            </Section>
            <Colored />
            <Section title="Size" gap={2} flexRow>
                <CircleProgress
                    size={"small"}
                />
                <CircleProgress
                    size={"medium"}
                />
                <CircleProgress
                    size={"large"}
                />
            </Section>
            <Section title="Thumb Size" gap={2} flexRow>
                <CircleProgress
                    thumbSize={9}
                    trackSize={4}
                />
            </Section>
            <Section title="Line Progress" gap={2} flexRow>
                <LineProgress
                />
            </Section>
            <ColoredLineProgress />
            <Section title="Line Progress Value" gap={2} flexRow>
                <LineProgress
                    value={50}
                />
            </Section>
        </Container>
    )
}

export default Progresses