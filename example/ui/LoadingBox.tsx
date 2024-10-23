import React from 'react'
import Stack from '../../src/Stack'
import LoadingBox from '../../src/LoadingBox'
import Text from '../../src/Text'

const LoadingBoxes = () => {
    return (
        <div>
            <LoadingBox
                loading
            >
                <Stack
                    bgcolor="background.secondary"
                    height={200}
                    width={300}
                    p={2}
                    radius={2}
                >
                    <Text>
                        If You Want Equal Width & Height:
                        To ensure that all flex items also have the same width (not just height), use the flex: 1 or adjust flex properties accordingly.

                        Full Example:
                    </Text>
                </Stack>
            </LoadingBox>
        </div>
    )
}

export default LoadingBoxes