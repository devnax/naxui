### How to use

```tsx
import Button, {ButtonProps} from 'naxui/Button'

const App = () => {
    return (
        <Button {...ButtonProps}>
            Click Me
        </Button>
    )
}
```


### Props
You can use the html `button` props and and theme `css, aliases props` and also below props.

| Name      | desciption                                                 |
| --------- | ---------------------------------------------------------- |
| startIcon | `ReactElement` button start icon                           |
| endIcon   | `ReactElement` button end icon                             |
| color     | `primary, secondary, success, error, warning` button color |
| variant   | `outline, text, contained` button style variant            |
