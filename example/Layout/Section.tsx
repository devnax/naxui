import React from "react";
import Text from "../../src/Text";
import Stack, { StackProps } from '../../src/Stack'

type Props = StackProps & {
    title: string;
}

const Section = ({ title, children, ...rest }: Props) => {
    return (
        <Stack gap={1} mb={3} >
            <Text fontWeight={600} color="text.secondary">{title}</Text>
            <Stack  {...rest} >
                {children}
            </Stack>
        </Stack>
    )
}


export default Section