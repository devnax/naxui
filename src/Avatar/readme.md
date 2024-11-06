### How to use

```tsx
import Avatar, {AvatarProps} from 'naxui/Avatar'

const App = () => {
    return (
        <Avatar {...AvatarProps} />
    )
}
```


### Props
You can use the html `img` props and and theme `css, aliases props` and also below props.

| Name     | desciption             |
| -------- | ---------------------- |
| size     | `number` Avatar size   |
| src      | `string` - image       |
| children | `ReactElement` svgIcon |