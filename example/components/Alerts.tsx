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


function getContrastText(hexColor) {
    // Remove the '#' from the beginning if it's present
    hexColor = hexColor.replace(/^#/, '');

    // Convert the hex color to RGB
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);

    // Calculate the relative luminance (Y) using the formula for sRGB color space
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Determine whether to use black or white text based on luminance
    const textColor = luminance > 0.5 ? '#111111' : '#FFFFFF';

    return textColor;
}


const Alerts = () => {
    let col = "#0066ff"
    return (
        <Stack gap={8}>
            <Stack p={2} gap={16} flexRow>
                <Stack p={2} flex={1} radius={2} bgcolor={adjustColor(col, 1)} color={adjustColor(getContrastText(col), .9)} >
                    Hello World
                </Stack>
            </Stack>
            <Alert
                title="Error"
                type='error'
                footer={<>
                    <Button size="small" variant='text' color="error"
                        sx={{
                            color: adjustColor("#dc2626", .8)
                        }}
                    >Finish</Button>
                </>}
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