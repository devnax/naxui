import React from "react";
import Box from "../src/Box";
import Text from "../src/Text";
import Stack, { StackProps } from '../src/Stack'
import { alpha } from "naxui-manager";

type Props = StackProps & {
    title: string;
}

const MetaBox = ({ title, children, ...rest }: Props) => {
    return (
        <Stack gap={1} mb={3} >
            <Text fontWeight={600} color="text.primary">{title}</Text>
            <Stack border={1} radius={1} p={3} {...rest} >
                {children}
            </Stack>
        </Stack>
    )
}


export default MetaBox