### How to use

```tsx
import Menu, {MenuProps} from 'naxui/Menu'

const App = () => {
    return (
        <Menu {...MenuProps}>
        ...
        </Menu>
    )
}
```


### Menu Props
You can use the `StackProps` props and and theme `css, aliases props` and also below props.

| Name           | desciption        |
| -------------- | ----------------- |
| target         | `HTMLElement`     |
| placement      | `top              | top-left | top-right  | bottom   | bottom-left | bottom-right | right  | right-top  | right-bottom      | left                 | left-top | left-bottom` |
| transition     | `"grow"           | "fade"   | "fadeDown" | "fadeUp" | "fadeRight" | "fadeLeft"   | "zoom" | "zoomOver" | "collapsVerticle" | "collapsHorizental"` |
| animateProps   | `AnimateBoxProps` |
| zIndex         | `number`          |
| onOpen         | `() => void`      |
| onClose        | `() => void`      |
| onClickOutside | `() => void`      |