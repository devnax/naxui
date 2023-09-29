import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'naxui-manager';
import List from '../src/List'
import ListItem from '../src/ListItem'
import Text from '../src/Text';
import Stack from '../src/Stack';
import components from './config'

const App = () => {
  let keys = Object.keys(components)
  const [active, setActive] = React.useState(keys[keys.length - 1])
  return (
    <ThemeProvider>
      <Stack height="100vh" flexRow >
        <Stack width={250} bgcolor="color.paper" p={1} height="100%" >
          <Text variant='text' fontWeight={600} mb={2}>Components</Text>
          <List>
            {
              keys.map(c => <ListItem
                key={c}
                onClick={() => setActive(c)}
                selected={c === active}
              >{c}</ListItem>)
            }
          </List>
        </Stack>
        <Stack flex={1} height="100%" p={2}>
          {components[active]}
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

const root = createRoot(document.getElementById('root') as any)
root.render(<App />);
