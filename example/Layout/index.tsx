import 'react-app-polyfill/ie11';
import * as React from 'react';
import { ThemeProvider } from 'naxui-manager';
import DarkModeIcon from 'naxui-icons/round/DarkMode';
import LightModeIcon from 'naxui-icons/round/LightMode';
import Stack from '../../src/Stack'
import ViewBox from '../../src/ViewBox'
import IconButton from '../../src/IconButton'
import Text from '../../src/Text'
import List from '../../src/List'
import ListItem from '../../src/ListItem'
import menu from './menus'

const Layout = () => {
    const [theme, setTheme] = React.useState("light")
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
        <ThemeProvider resetCss theme={theme}>
            <Stack height="100vh" flexRow bgcolor="paper">
                <ViewBox
                    width={250}
                    p={1}
                    height="100%"
                    bgcolor="background.secondary"
                    endContent={<Stack>
                        <IconButton
                            onClick={() => {
                                setTheme(theme === 'light' ? "dark" : "light")
                            }}
                        >
                            {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                    </Stack>}
                >
                    <Text variant='text' fontWeight={600} mb={2} color="text.primary">Components</Text>
                    <List>
                        {
                            menu.map((m, idx) => <ListItem
                                key={m.label}
                                id={`menu-${idx}`}
                                onClick={() => {
                                    localStorage.setItem("currentMenuIndex", idx.toString())
                                    dispatch(Math.random())
                                }}
                                selected={currentMenuIndex === idx}
                            >{m.label}</ListItem>)
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