import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { changeTheme, getTheme, ThemeProvider } from 'naxui-manager';
import Box from './src/Box'
import Button from './src/Button'
import ArrowIcon from 'naxui-icons/round/ArrowForward'
import Checkbox from './src/Checkbox'
import Radio from './src/Radio'
import Label from './src/Label'
import Table from './src/Table'
import TableHead from './src/TableHead'
import TableBody from './src/TableBody'
import TableRow from './src/TableRow'
import TableCell from './src/TableCell'
import Input from './src/Input'
import List from './src/List'
import ListItem from './src/ListItem'
import Paper from './src/Paper'
import Select from './src/Select'
import SearchIcon from 'naxui-icons/round/Search'
import HomeIcon from 'naxui-icons/round/Home'
import AboutIcon from 'naxui-icons/round/Info'
import ServiceIcon from 'naxui-icons/round/Place'
import ContactIcon from 'naxui-icons/round/Email'
import Option from './src/Option';

const App = () => {
  const [c, setC] = React.useState("B")
  const [dense, setDense] = React.useState(false)
  const [activeList, setActiveList] = React.useState("home")
  const [selectVal, setSelectVal] = React.useState("home")

  return (
    <ThemeProvider>
      <Box m={2} p={3} width={300}>
        <Select value={selectVal} onChange={(val) => {
          setSelectVal(val)
        }}>
          <Option value="home" startIcon={<HomeIcon />}>Home</Option>
          <Option value="about" startIcon={<AboutIcon />}>About</Option>
          <Option value="service" startIcon={<ServiceIcon />}>Service</Option>
          <Option value="contact" startIcon={<ContactIcon />}>Contact</Option>
        </Select>
      </Box>
      <Paper m={2} p={3} width={300}>
        <List >
          <ListItem onClick={() => setActiveList("home")} selected={activeList === "home"} startIcon={<HomeIcon />} endIcon={<>200</>}>Home</ListItem>
          <ListItem onClick={() => setActiveList("about")} selected={activeList === "about"} startIcon={<AboutIcon />} subtitle="Visit about page" endIcon={<>20</>}>About</ListItem>
          <ListItem onClick={() => setActiveList("services")} selected={activeList === "services"} startIcon={<ServiceIcon />} endIcon={<>13+</>}>Services</ListItem>
          <ListItem onClick={() => setActiveList("contact")} selected={activeList === "contact"} startIcon={<ContactIcon />} endIcon={<>5+</>}>Contact</ListItem>
        </List>
      </Paper>
      <Box
        p={3}
      >
        <Input
          startIcon={<SearchIcon />}
        />
      </Box>
      <Box p={3} >
        <Button onClick={() => setDense(!dense)}>Toggle Table Size</Button>
        <Table dense={dense}>
          <TableHead>
            <TableRow>
              <TableCell th>
                <Checkbox />
              </TableCell>
              <TableCell th>ID</TableCell>
              <TableCell th>Name</TableCell>
              <TableCell th>Email</TableCell>
              <TableCell th>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Checkbox checked />
              </TableCell>
              <TableCell>#1</TableCell>
              <TableCell>Najrul Ahmed</TableCell>
              <TableCell>najrul@gmail.com</TableCell>
              <TableCell>01838188585</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>#2</TableCell>
              <TableCell>Devnax</TableCell>
              <TableCell>devnaxrul@gmail.com</TableCell>
              <TableCell>01869514159</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>#3</TableCell>
              <TableCell>Juayer</TableCell>
              <TableCell>juayer@gmail.com</TableCell>
              <TableCell>01837478374</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box
        p={2}
      >
        <Label>
          <Radio
            name="well"
            value={"A"}
            checked={c === "A"}
            onChange={(e) => {
              setC("A")
            }}
          />
          Agree our terms & condition
        </Label>
        <Label>
          <Radio
            name="well"
            value={"B"}
            checked={c == "B"}
            onChange={() => {
              setC("B")
            }}
          />
          Agree our terms & condition
        </Label>
        <Button
          startIcon={<HomeIcon />}
          endIcon={<ArrowIcon />}
          onClick={() => {
            const theme = getTheme()
            changeTheme(theme.name === 'default' ? "default-dark" : "default")
          }}
        >Welcome</Button>
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
