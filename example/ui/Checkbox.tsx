import React, { useState } from 'react'
import Stack from '../../src/Stack'
import Checkbox from '../../src/Checkbox'
import Radio from '../../src/Radio'
import Switch from '../../src/Switch'
import Section from '../Layout/Section'
import HeartIcon from 'naxui-icons/round/HeartBroken'

const Checkboxes = () => {
    const [value, setValue] = useState("A")
    return (
        <Stack gap={3}>
            <Section title="Basic" gap={2} flexRow>
                <Checkbox
                    checked={value === "A"}
                    onChange={() => {
                        setValue(value === "A" ? "" : "A")
                    }}
                />
                <Checkbox
                    color="accent"
                    checked={value === "B"}
                    onChange={() => {
                        setValue(value === "B" ? "" : "B")

                    }}
                />
                <Checkbox
                    color="danger"
                    checked={value === "C"}
                    onChange={() => {
                        setValue(value === "C" ? "" : "C")

                    }}
                />
            </Section>
            <Section title="Sizes" gap={2} flexRow>
                <Checkbox
                    size="small"
                    checked={value === "A"}
                    onChange={() => {
                        setValue("A")
                    }}
                />
                <Checkbox
                    size="medium"
                    color="accent"
                    checked={value === "A"}
                    onChange={() => {
                        setValue("A")
                    }}
                />
                <Checkbox
                    size="large"
                    color="danger"
                    checked={value === "A"}
                    onChange={() => {
                        setValue("A")
                    }}
                />
            </Section>
            <Section title="Radio" gap={2} flexRow>
                <Radio
                    size="small"
                    checked={value === "A"}
                    onChange={() => {
                        setValue("A")
                    }}
                />
                <Radio
                    size="medium"
                    color="accent"
                    checked={value === "A"}
                    onChange={() => {
                        setValue("A")
                    }}
                />
                <Radio
                    size="large"
                    color="danger"
                    checked={value === "A"}
                    onChange={() => {
                        setValue("A")
                    }}
                />
            </Section>
            <Section title="Radio" gap={2} flexRow>
                <Switch
                    size={80}
                    checked={value === "A"}
                    onChange={() => {
                        setValue(value === "A" ? "B" : "A")
                    }}
                />
                <Switch
                    color="accent"
                    checked={value === "A"}
                    onChange={() => {
                        setValue(value === "A" ? "B" : "A")
                    }}
                    trackSize={16}
                    size={60}
                />
                <Switch
                    color="info"
                    checked={value === "A"}
                    onChange={() => {
                        setValue(value === "A" ? "B" : "A")
                    }}
                />
                <Switch
                    color="warning"
                    checked={value === "A"}
                    onChange={() => {
                        setValue(value === "A" ? "B" : "A")
                    }}
                />

            </Section>

        </Stack>
    )
}

export default Checkboxes