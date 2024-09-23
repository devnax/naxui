import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './Layout';

const Root = () => {
  return <Layout />
}

const root = createRoot(document.getElementById('root') as any)
root.render(<Root />);
