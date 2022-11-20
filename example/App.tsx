import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createTransition } from '../src/hooks/Transition'
import Animation from './Animation'
import ButtonBase from '../src/base/ButtonBase'
import Stack from '../src/Stack'
import Box from '../src/Box'
import Container from '../src/Container'
import Text from '../src/Text'
import Input from '../src/Input'
import Chip from '../src/Chip'
import Avatar from '../src/Avatar'
import CheckBox from '../src/CheckBox'
import FaceIcon from '@mui/icons-material/Face';
import Typography from './components/Typography'


const Root = () => {

   return (
      <Container size="md">

         <Typography />
         <Stack
            radius={1}
            direction="column"

         >

            <Box>
               <Input
                  cols={22}
                  rows={5}
                  max={12}
                  placeholder='Write Text'
               />
            </Box>
            <Stack
               alignItems="center"
               direction="row"
            >
               <Box>
                  <Chip
                     variant='outlined'
                     size='small'
                     color="success"
                     avatar="https://mui.com/static/images/avatar/1.jpg"
                     avatarSize={3}
                     startIcon={<FaceIcon />}
                     endIcon={<FaceIcon />}
                  >
                     Chip Filled
                  </Chip>
               </Box>
               <Box mx={1} >
                  <Avatar
                     src="https://mui.com/static/images/avatar/1.jpg"
                     variant="circular"
                  // size={5}
                  />
               </Box>
               <Box>
                  <CheckBox />
               </Box>
            </Stack>

         </Stack>
      </Container >
   )
}

export default Root