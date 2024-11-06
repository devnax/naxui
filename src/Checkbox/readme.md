
### How to use

```tsx
import Checkbox, {CheckboxProps} from 'naxui/Checkbox'

const App = () => {
    return (
        <Checkbox {...CheckboxProps}>
            Click Me
        </Checkbox>
    )
}
```

### Props
You can use the html `input checkbox` props and and theme `css, aliases props` and also below props.

| Name          | desciption                                                          |
| ------------- | ------------------------------------------------------------------- |
| checkIcon     | `ReactElement` you can set custom check Icon                        |
| uncheckIcon   | `ReactElement` you can set custom uncheck Icon                      |
| checked       | `boolean` check and uncheck the checkbox                            |
| indeterminate | `boolean` indeterminate the checkbox. it will change the check icon |
| size          | `number` you can set checkbox size                                  |

