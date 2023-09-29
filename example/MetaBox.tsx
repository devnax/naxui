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
        <Stack gap={8} mb={3} {...rest} >
            <Text fontWeight={600}>{title}</Text>
            <Box border={1} radius={1} p={3}>
                {children}
            </Box>
        </Stack>
    )
}


export default MetaBox