### How to use

```tsx
import List, {ListProps} from 'naxui/List'
import ListItem, {ListItemProps} from 'naxui/List'

const App = () => {
    return (
        <List {...ListProps}>
            <ListItem {...ListItemProps}>Home</ListItem>
        </List>
    )
}
```


### List Props
You can use the html `ul` props and and theme `css, aliases props` and also below props.

| Name  | desciption |
| ----- | ---------- |
| color | `"brand"   | "accent" | "success" | "warning" | "error"` |



### ListItem Props
You can use the html `li` props and and theme `css, aliases props` and also below props.

| Name      | desciption                     |
| --------- | ------------------------------ |
| selected  | `boolean`                      |
| subtitle  | `string                        | ReactElement` |
| startIcon | `ReactElement` List start icon |
| endIcon   | `ReactElement` List end icon   |
