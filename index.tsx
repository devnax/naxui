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
import IconButton from './src/IconButton';
import Switch from './src/Switch';
import Avatar from './src/Avatar';
import Menu from './src/Menu';
import Text from './src/Text';
import Stack from './src/Stack';
import Image from './src/Image';
import Chip from './src/Chip';
import Collaps from './src/Collaps';
import Accordion from './src/Accordion';
import CloseIcon from 'naxui-icons/round/Close'
import VerifiedUser from 'naxui-icons/filled/VerifiedUser'
import ButtonGroup from './src/ButtonGroup'

const App = () => {
  const animRef = React.useRef()
  const [c, setC] = React.useState("B")
  const [animIn, setAnimIn] = React.useState(false)
  const [collaps, setCollaps] = React.useState(false)
  const [expand, setExpand] = React.useState(1)
  const [dense, setDense] = React.useState(false)
  const [activeList, setActiveList] = React.useState("home")
  const [selectVal, setSelectVal] = React.useState("home")
  const [target, setTarget] = React.useState<any>()

  return (
    <ThemeProvider>
      <Stack direction="row" gap={15} p={3} alignItems="center">
        <ButtonGroup variant='filled' size="small">
          <Button >1</Button>
          <Button >2</Button>
          <Button >3</Button>
        </ButtonGroup>
        <ButtonGroup variant='outlined' size="medium">
          <Button >1</Button>
          <Button >2</Button>
          <Button >3</Button>
        </ButtonGroup>
        <ButtonGroup size="large">
          <Button >1</Button>
          <Button >2</Button>
          <Button >3</Button>
        </ButtonGroup>
      </Stack>
      <Box radius={1} m={3} overflow="hidden">
        <Accordion expand={expand === 1} title="My First Accordion" onChange={(is) => setExpand(is ? 1 : 0)}>
          <Text variant='h1'>First</Text>
        </Accordion>
        <Accordion expand={expand === 2} title="My First Accordion" onChange={(is) => setExpand(is ? 2 : 0)}>
          <Text variant='h1'>Second</Text>
        </Accordion>
      </Box>
      <Box p={3} >
        <Button onClick={() => setCollaps(!collaps)}>Toggle Collaps</Button>
        <Collaps in={collaps}>
          <Text variant='h1'>Hello</Text>
        </Collaps>
      </Box>
      <Stack p={3} gap={3} direction="row" alignItems="center">
        <Chip label="Primary" softness={.2} />
        <Chip label="Warning" softness={.2} color="warning" />
        <Chip label="Error" softness={.2} color="error" />
        <Chip label="Success" softness={.2} color="success" />
        <Chip label="Outlined" variant='outlined' color="error" startIcon={<VerifiedUser />} endIcon={<CloseIcon fontSize={13} />} />
      </Stack>
      <Box p={2} flexBox flexRow alignItems="center">
        <Button
          startIcon={<ContactIcon />}
          variant='outlined'
          // softness={.5}
          color="success"
          onClick={(e) => {
            setTarget(!target ? e.target : null)
          }}
        >Toggle Trans</Button>
        <Menu target={target} >
          <List >
            <ListItem onClick={() => setActiveList("home")} selected={activeList === "home"} startIcon={<HomeIcon />} endIcon={<>200</>}>Home</ListItem>
            <ListItem onClick={() => setActiveList("about")} selected={activeList === "about"} startIcon={<AboutIcon />} subtitle="Visit about page" endIcon={<>20</>}>About</ListItem>
            <ListItem onClick={() => setActiveList("services")} selected={activeList === "services"} startIcon={<ServiceIcon />} endIcon={<>13+</>}>Services</ListItem>
            <ListItem onClick={() => setActiveList("contact")} selected={activeList === "contact"} startIcon={<ContactIcon />} endIcon={<>5+</>}>Contact</ListItem>
          </List>
        </Menu>
      </Box>
      <Image
        m={2}
        radius={2}
        src="https://mui.com/static/images/avatar/1.jpg"
        errorView={<>Wrong</>}
        onError={() => {

        }}
      />
      <Box p={2}>
        <Switch
          color='success'
        />
      </Box>
      <Stack direction="row" gap={10} px={3} p={1}>
        <IconButton variant='filled' color="error">
          <HomeIcon />
        </IconButton>
        <IconButton variant='outlined' color="warning">
          <HomeIcon />
        </IconButton>
        <IconButton color="success">
          <HomeIcon />
        </IconButton>
      </Stack>
      <Stack justifyContent="center" alignItems="center" mt={6}>
        <Box m={2} p={1} width={300}>
          <Select value={selectVal} onChange={(val) => {
            setSelectVal(val)
          }}>
            <Option value="home" startIcon={<HomeIcon />}>Home</Option>
            <Option value="about" startIcon={<AboutIcon />}>About</Option>
            <Option value="service" startIcon={<ServiceIcon />}>Service</Option>
            <Option value="contact" startIcon={<ContactIcon />}>Contact</Option>
          </Select>
        </Box>
      </Stack>
      <Paper m={2} p={1} width={300}>
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
          variant="filled"
          error
          helperText='Here is some errors'
        />
      </Box>
      <Box p={3} >
        <Button onClick={() => setDense(!dense)} >Toggle Table Size</Button>
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
        <Box>
          <Button
            startIcon={<HomeIcon />}
            endIcon={<ArrowIcon />}
            onClick={() => {
              const theme = getTheme()
              changeTheme(theme.name === 'default' ? "default-dark" : "default")
            }}
          >Welcome</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
