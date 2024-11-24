import React from 'react'
import Alert from '../../src/Alert'
import Stack from '../../src/Stack'
import Text from '../../src/Text'
import Button from '../../src/Button'

const Alerts = () => {
    return (
        <Stack gap={1}

        >
            <Button
                onClick={() => {
                    Alert.confirm({
                        title: "Are You Sure?",
                        content: <>
                            This action cannot be undone. so be carefull go confirm this action.
                            This action cannot be undone. so be carefull go confirm this action.
                        </>,
                        okButtonText: "Agree"
                    })
                }}>Open</Button>
            <Alert
                width={300}
                direction="column"
                color="warning"
                variant='alpha'
                title="Warning"
            >
                <Stack
                    gap={2}
                >
                    <Text color="inherit" fontSize="inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.</Text>
                </Stack>
            </Alert>
            <Alert
                title="Information"
                variant='alpha'
                color="danger"
                onClose={() => { }}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam modi dolores, nobis praesentium maxime pariatur, alias aliquam facilis asperiores ratione tenetur fugit laborum doloribus repellat sequi dolorum porro necessitatibus impedit.
            </Alert>
            <Alert
                title="Warning"
                color="warning"
            >
                You have know some thing before continue
            </Alert>
            <Alert
                color="success"
            >
                Your proccess has been success. now you can enjoy
            </Alert>
            <Alert
                title="Information"
                color="brand"
            >
                Your proccess has been success. now you can enjoy
            </Alert>
        </Stack>
    )
}


export default Alerts