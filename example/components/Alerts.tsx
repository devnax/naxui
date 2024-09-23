import React from 'react'
import Alert from '../../src/Alert'
import Stack from '../../src/Stack'
import Button from '../../src/Button'




const Alerts = () => {
    return (
        <Stack gap={1}>
            <Button onClick={() => {
                Alert.open({
                    title: "Are You Sure?",
                    type: "error",
                    content: <>This action cannot be undone. so be carefull go confirm this action.</>
                })
            }}>Open</Button>
            <Alert
                width={300}
                inline={false}
                onClose={(e) => {

                }}
                title="Error"
            // type='error'
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.
            </Alert>
            <Alert
                title="Information"
                type='info'
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam modi dolores, nobis praesentium maxime pariatur, alias aliquam facilis asperiores ratione tenetur fugit laborum doloribus repellat sequi dolorum porro necessitatibus impedit.
            </Alert>
            <Alert
                title="Warning"
                type='warning'
            >
                You have know some thing before continue
            </Alert>
            <Alert
                // title="Success"
                type='success'
                variant='filled'
            >
                Your proccess has been success. now you can enjoy
            </Alert>
            <Alert
                title="Information"
                type='info'
                variant='outlined'
            >
                Your proccess has been success. now you can enjoy
            </Alert>
        </Stack>
    )
}


export default Alerts