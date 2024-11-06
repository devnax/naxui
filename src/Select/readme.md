### How to use

```tsx
import Select, {SelectProps} from 'naxui/Select'
import Option, {OptionProps} from 'naxui/Option'

const App = () => {
    return (
        <Select {...SelectProps}>
            <Option {...optionProps}></Option>
        </Select>
    )
}
```


### Select Props
You can use the `Input` props and and theme `css, aliases props` and also below props.

| Name      | desciption                    |
| --------- | ----------------------------- |
| value     | `number                       | string` |
| onChange  | `(item: OptionProps) => void` |
| menuProps | `Menu props`                  |