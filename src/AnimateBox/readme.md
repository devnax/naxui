### How to use

```tsx
import {MotionProps} from 'framer-motion'
import Animate, {variants, AnimationType} from 'naxui/Animate'

interface AnimateProps extends MotionProps {
    children: ReactElement | ReactNode;
    type?: AnimationType | 'none';
    ref?: any;
    step?: 1 | 2 | 3 | 4 | 5
}


const App = () => {
    return (
        <Animate {...AnimateProps}>
            Zoom
        </Animate>
    )
}

```