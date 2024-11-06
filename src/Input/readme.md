
### How to use

```tsx
import Input, {InputProps} from 'naxui/Input'

const App = () => {
    return (
        <Input {...InputProps} />
    )
}
```

### Props
You can use the html `input` props and and theme `css, aliases props` and also below props.

| Name           | desciption                         |
| -------------- | ---------------------------------- |
| startIcon      | `ReactElement` input start icon    |
| endIcon        | `ReactElement` input end icon      |
| focused        | `boolean`                          |
| autoFocused    | `boolean`                          |
| containerProps | `StackProps` input container props |
| containerRef   | `Ref` input container ref          |

