import React from 'react'
import Alert from '../../src/Alert'
import Stack from '../../src/Stack'
import Button from '../../src/Button'


function adjustColor(hex: any, factor: number) {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    r = Math.floor(r * factor);
    g = Math.floor(g * factor);
    b = Math.floor(b * factor);

    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}




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