import React, { useState } from 'react';
import Stack from '../src/Stack';
import Button from '../src/Button';

import { Navigate } from 'react-pagex'
import Scrollbar from 'react-browser-scrollbar'

const Sidebar = () => {
   const [path, setPath] = useState(window.location.pathname)
   return (
      <Scrollbar style={{ width: 300, }}>
         <Stack
            height={window.innerHeight}
            borderRight='1px solid'
            borderColor="grey.3"
            direction='column'
            p={2}
         >
            <Button
               variant={path === '/' ? 'filled' : 'text'}
               width="100%"
               onClick={() => {
                  Navigate.go('/')
                  setPath(window.location.pathname)
               }}
            >
               Typography
            </Button>
            <Button
               variant={path === '/avatar' ? 'filled' : 'text'}
               onClick={() => {
                  Navigate.go('/avatar')
                  setPath(window.location.pathname)
               }}
            >
               Avatar
            </Button>
            <Button
               variant={path === '/chip' ? 'filled' : 'text'}
               onClick={() => {
                  Navigate.go('/chip')
                  setPath(window.location.pathname)
               }}
            >
               Chip
            </Button>
            <Button
               variant={path === '/button' ? 'filled' : 'text'}
               onClick={() => {
                  Navigate.go('/button')
                  setPath(window.location.pathname)
               }}
            >
               Button
            </Button>
            <Button
               variant={path === '/card' ? 'filled' : 'text'}
               onClick={() => {
                  Navigate.go('/card')
                  setPath(window.location.pathname)
               }}
            >
               Card
            </Button>
         </Stack>
      </Scrollbar>
   )
}

export default Sidebar