### How to use

```tsx
import Table, {TableProps} from 'naxui/Table'
import Table from 'naxui/Table'
import TableHead from 'naxui/TableHead'
import TableBody from 'naxui/TableBody'
import TableRow from 'naxui/TableRow'
import TableCell from 'naxui/TableCell'

const App = () => {
    return (
        <Table {...TableProps}>
          <TableHead>
            <TableRow>
              <TableCell th>
                <Checkbox />
              </TableCell>
              <TableCell th>ID</TableCell>
              <TableCell th>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox checked />
              </TableCell>
              <TableCell>#1</TableCell>
              <TableCell>Najrul Ahmed</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    )
}
```


### Props
You can use the html `table` props and and theme `css, aliases props` and also below props.

