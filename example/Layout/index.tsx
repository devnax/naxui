import 'react-app-polyfill/ie11';
import * as React from 'react';
import DarkModeIcon from 'naxui-icons/round/DarkMode';
import LightModeIcon from 'naxui-icons/round/LightMode';
import Stack from '../../src/Stack'
import ViewBox from '../../src/ViewBox'
import IconButton from '../../src/IconButton'
import Text from '../../src/Text'
import List from '../../src/List'
import ListItem from '../../src/ListItem'
import menu from './menus'
import ThemeProvider from '../../src/ThemeProvider'
import CheckIcon from 'naxui-icons/round/CheckCircle'
import { useTheme, useBreakpointPropsType } from 'naxui-manager';


const ThemeBox = () => {
    const theme = useTheme()
    return (
        <Stack>
            <IconButton
                onClick={() => {
                    theme.change(theme.name === 'light' ? "dark" : "light")
                }}
            >
                {theme.name === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </Stack>
    )
}


const Layout = () => {
    const [theme, setTheme] = React.useState("dark")
    const [, dispatch] = React.useState(0)
    const currentMenuIndex = parseInt(localStorage.getItem("currentMenuIndex") || "0")
    const currentMenu = menu[currentMenuIndex]
    const Render: any = currentMenu?.render || (() => <></>)

    React.useEffect(() => {
        const ele = document.getElementById(`menu-${currentMenuIndex}`)
        if (ele) {
            ele.scrollIntoView()
        }
    }, [])

    return (
        <ThemeProvider resetCss theme={theme} onChange={t => setTheme(t)}>
            <Stack height="100vh" flexRow bgcolor="background.primary">
                <ViewBox
                    width={250}
                    height="100%"
                    bgcolor="background.secondary"
                    endContent={<ThemeBox />}
                >
                    <Text p={1} variant='text' fontWeight={600} mb={2} color="text.primary">Components</Text>
                    <List p={1} variant="alpha">
                        {
                            menu.map((m, idx) => <ListItem
                                key={m.label}
                                id={`menu-${idx}`}
                                onClick={() => {
                                    localStorage.setItem("currentMenuIndex", idx.toString())
                                    dispatch(Math.random())
                                }}
                                selected={currentMenuIndex === idx}
                                endIcon={<CheckIcon color={m.done ? "success" : "success.alpha"} fontSize={20} />}
                            >
                                {m.label}
                            </ListItem>)
                        }
                    </List>
                </ViewBox>
                <Stack flex={1} height="100%" p={2} overflow="auto">
                    <Render />
                </Stack>
            </Stack>
        </ThemeProvider>
    );
};


export default Layout