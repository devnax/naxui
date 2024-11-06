
### How to use

```tsx
import Radio, {RadioProps} from 'naxui/Radio'

const App = () => {
    return (
        <Radio {...RadioProps}>
            Click Me
        </Radio>
    )
}
```

### Props
You can use the html `input radio` props and and theme `css, aliases props` and also below props.

| Name        | desciption                                              |
| ----------- | ------------------------------------------------------- |
| checkIcon   | `ReactElement` you can set custom check Icon            |
| uncheckIcon | `ReactElement` you can set custom uncheck Icon          |
| size        | `number` you can set radio button size                  |
| checked     | `boolean - required` check and uncheck the radio button |
| value       | `number or string - required` set the value             |

