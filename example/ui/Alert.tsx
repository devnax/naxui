import React from 'react'
import Alert from '../../src/Alert'
import Stack from '../../src/Stack'
import Text from '../../src/Text'
import Button from '../../src/Button'

const Alerts = () => {
    return (
        <Stack gap={1}>
            <Button onClick={() => {
                Alert.open({
                    title: "Are You Sure?",
                    type: "success",
                    content: <>This action cannot be undone. so be carefull go confirm this action.</>
                })
            }}>Open</Button>
            <Alert
                width={300}
                mode="box"
                color="warning"
                variant='alpha'
                title="Warning"
            >
                <Stack
                    gap={2}
                >
                    <Text color="inherit">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.</Text>
                </Stack>
            </Alert>
            <Alert
                title="Information"
                type='info'
                variant='alpha'
                color="danger"
                onClose={() => { }}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam modi dolores, nobis praesentium maxime pariatur, alias aliquam facilis asperiores ratione tenetur fugit laborum doloribus repellat sequi dolorum porro necessitatibus impedit.
            </Alert>
            <Alert
                title="Warning"
                type='warning'
                color="warning"
            >
                You have know some thing before continue
            </Alert>
            <Alert
                type='success'
                color="success"
            >
                Your proccess has been success. now you can enjoy
            </Alert>
            <Alert
                title="Information"
                type='info'
                color="info"
            >
                Your proccess has been success. now you can enjoy
            </Alert>
        </Stack>
    )
}


export default Alerts