### How to use
this is just a blur box if the blur  is not support in the browser then it will set fade color.

```tsx
import Blur from 'naxui/Blur'

type BlurProps = BoxProps & {
    blur: number;
    img?: string; // for the background image
}


const App = () => {
    return (
        <Blur {...BlurProps}>
            Zoom
        </Blur>
    )
}

```


## useBlurCss
you can use also the `useBlurCss` hook

```tsx
import {useBlurCss} from 'naxui/Blur'

const App = () => {
    const blurCss = useBlurCss(10)// 100 max
    return (
        <Box sx={{...blurCss}}>
            Zoom
        </Box>
    )
}

```