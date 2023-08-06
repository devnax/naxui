### How to use

```tsx
import IconButton, {IconButtonProps} from 'naxui/IconButton'
import HomeIcon from 'naxui-icons/round/Home'

const App = () => {
    return (
        <IconButton {...IconButtonProps}>
               <HomeIcon />
        </IconButton>
    )
}
```


### Props
You can use the html `button` props and and theme `css, aliases props` and also below props.

| Name  |  desciption |
|---|---|
|  color |  `primary, secondary, success, error, warning` Iconbutton color |
|  variant |  `outline, text, contained` Iconbutton style variant|
|  size |  `number` button size|
