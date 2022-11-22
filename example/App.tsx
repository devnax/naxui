import React, { useState, useEffect, useRef, useMemo } from 'react';
import Container from '../src/Container'
import ChipView from './components/Chip'
import AvatarView from './components/Avatar'
import TypographyView from './components/Typography'
import ButtonView from './components/Button'
import Stack from '../src/Stack';
import Button from '../src/Button';
import Box from '../src/Box';
import CardView from './components/Card'

import { Link, Routes, Route, Navigate, useQuery } from 'react-pagex'
import Scrollbar from 'react-browser-scrollbar'

const Root = () => {

   const [path, setPath] = useState('/')

   return (
      <Stack >
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
         <Box flex={1} height={window.innerHeight} >
            <Scrollbar>
               <Container size="md">
                  <Routes
                     onError={() => {

                     }}
                  >
                     <Route path='/' render={TypographyView} />
                     <Route path='/avatar' render={AvatarView} />
                     <Route path='/chip' render={ChipView} />
                     <Route path='/button' render={ButtonView} />
                     <Route path='/card' render={CardView} />
                  </Routes>

               </Container>
            </Scrollbar>
         </Box>
      </Stack>
   )
}

export default Root