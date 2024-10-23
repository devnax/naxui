import React from 'react'
import Stack from '../../src/Stack'
import ThemeProvider from '../../src/ThemeProvider'
import Lists from './List'
import Accodiond from './Accordion'
import Section from '../Layout/Section'
const ThemeProviders = () => {
    return (
        <Stack
            gap={2}
            m={2}
        >
            <Section
                title="List"
                flexRow
                gap={2}
                bgcolor="background.secondary"
                p={2}
                radius={2}
            >
                <Section title="Light Theme">
                    <ThemeProvider
                        theme="light"
                        p={1}
                        radius={1}
                    >
                        <Lists />
                    </ThemeProvider>
                </Section>
                <Section title="Dark Theme">
                    <ThemeProvider
                        theme="dark"
                        p={1}
                        radius={1}
                    >
                        <Lists />
                    </ThemeProvider>
                </Section>
            </Section>

            <Section
                title="Accodiond"
                flexRow
                gap={2}
                bgcolor="background.secondary"
                p={2}
                radius={2}
            >
                <Section title="Light Theme">
                    <ThemeProvider
                        theme="light"
                        p={1}
                        radius={1}
                    >
                        <Accodiond />
                    </ThemeProvider>
                </Section>
                <Section title="Dark Theme">
                    <ThemeProvider
                        theme="dark"
                        p={1}
                        radius={1}
                    >
                        <Accodiond />
                    </ThemeProvider>
                </Section>
            </Section>
        </Stack>
    )
}

export default ThemeProviders