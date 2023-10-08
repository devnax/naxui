import React from 'react'
import Alert from '../../src/Alert'
import Stack from '../../src/Stack'
import Button from '../../src/Button'

const Alerts = () => {
    return (
        <Stack gap={8}>
            <Alert
                title="Error"
                type='error'
                footer={<>
                    <Button size="small" variant='text' color="error">Finish</Button>
                </>}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.
            </Alert>
            <Alert
                title="Information"
                type='info'
            >
                You have know some thing before continue
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