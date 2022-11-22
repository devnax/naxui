import React from 'react';
import Avatar from '../../src/Avatar'
import Stack from '../../src/Stack'
import Box from '../../src/Box';
import Typography from '../../src/Typography';
import ButtonBase from '../../src/base/BaseButton'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AccessIcon from '@mui/icons-material/AccessTimeFilled';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import UserIcon from '@mui/icons-material/PersonOutlineOutlined';

import Button from '../../src/Button'
import Input from '../../src/Input'

const Root = () => {
   return (
      <Stack flexColumn size="md" p={2} my={7} border="1px solid" borderColor="grey.3" radius={2}>
         <Typography variant='button' color="grey.10" textTransform="uppercase" mb={2}>Button</Typography>
         <Box my={1} >
            <Typography variant='button' color="grey.7" textTransform="capitalize" mb={2}>sizes</Typography>
            <Stack alignItems="center" mt={1} >
               <Box mx={1} >
                  <Input
                     startIcon={<UserIcon />}
                     endIcon={<SearchOutlinedIcon />}
                     autoFocus
                     placeholder="First Name"
                  />
               </Box>
               <Box mx={1} >
                  <Input
                     startIcon={<UserIcon />}
                     endIcon={<SearchOutlinedIcon />}
                     variant="outlined"
                     placeholder="Last Name"
                     multiline

                  />
               </Box>

            </Stack>
         </Box>
         <Box my={1} >
            <Typography variant='button' color="grey.7" textTransform="capitalize" mb={2}>sizes</Typography>
            <Stack alignItems="center" mt={1} >

               <Box mx={1} >
                  <Button
                     startIcon={<AddRoundedIcon />}
                     color="primary"
                     size="small"
                  >
                     Add Member
                  </Button>
               </Box>
               <Box mx={1} >
                  <Button
                     startIcon={<AddRoundedIcon />}
                     color="primary"
                  >
                     Create Course
                  </Button>
               </Box>
               <Box mx={1} >
                  <Button
                     startIcon={<AddRoundedIcon />}
                     color="primary"
                     size="large"
                  >
                     New Book
                  </Button>
               </Box>
            </Stack>
         </Box>


         <Box my={1} >
            <Typography variant='button' color="grey.7" textTransform="capitalize" mb={2}>Outlined</Typography>
            <Stack alignItems="center" mt={1} >
               <Box mx={1} >
                  <Button
                     startIcon={<AddRoundedIcon />}
                     color="primary"
                     size="small"
                     variant='outlined'
                  >
                     Add Member
                  </Button>
               </Box>
               <Box mx={1} >
                  <Button
                     startIcon={<AddRoundedIcon />}
                     color="primary"
                     variant='outlined'
                  >
                     Create Course
                  </Button>
               </Box>
               <Box mx={1} >
                  <Button
                     startIcon={<AddRoundedIcon />}
                     color="primary"
                     size="large"
                     variant='outlined'
                  >
                     New Book
                  </Button>
               </Box>
            </Stack>
         </Box>


         <Box my={1} >
            <Typography variant='button' color="grey.7" textTransform="capitalize" mb={2}>Text</Typography>
            <Stack alignItems="center" mt={1} >
               <Box mx={1} >
                  <Button
                     startIcon={<AddRoundedIcon />}
                     color="primary"
                     size="small"
                     variant='text'
                  >
                     Add Member
                  </Button>
               </Box>
               <Box mx={1} >
                  <Button
                     startIcon={<AddRoundedIcon />}
                     color="primary"
                     variant='text'
                  >
                     Create Course
                  </Button>
               </Box>
               <Box mx={1} >
                  <Button
                     startIcon={<AddRoundedIcon />}
                     color="primary"
                     size="large"
                     variant='text'
                  >
                     New Book
                  </Button>
               </Box>
            </Stack>
         </Box>
      </Stack >
   )
}

export default Root