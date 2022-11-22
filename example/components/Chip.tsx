import React from 'react';
import Avatar from '../../src/Avatar'
import Stack from '../../src/Stack'
import Box from '../../src/Box';
import Typography from '../../src/Typography';
import Chip from '../../src/Chip';

const Root = () => {
   return (
      <Stack flexColumn size="md" p={2} my={7} border="1px solid" borderColor="grey.3" radius={2}>
         <Typography variant='button' color="grey.5" textTransform="uppercase" mb={2}>Chip</Typography>
         <Box my={1} >
            <Typography variant='subtitle' color="grey.4" textTransform="capitalize" mb={2}>variant</Typography>
            <Stack>
               <Chip variant="filled" mr={1}>
                  filled
               </Chip>
               <Chip variant="outlined">
                  outlined
               </Chip>
            </Stack>
         </Box>
         <Box my={1} >
            <Typography variant='subtitle' color="grey.4" textTransform="capitalize" mb={2}>Color</Typography>
            <Stack>
               <Chip variant="filled" color='primary' mr={1}>
                  primary
               </Chip>
               <Chip variant="outlined" color='primary' mr={1}>
                  primary
               </Chip>
            </Stack>
         </Box>
         <Box my={1} >
            <Typography variant='subtitle' color="grey.4" textTransform="capitalize" mb={2}>Size</Typography>
            <Stack>
               <Chip variant="filled" size='small' mr={1}>
                  small
               </Chip>
               <Chip variant="outlined" size='medium' mr={1}>
                  medium
               </Chip>
            </Stack>
         </Box>
      </Stack>
   )
}

export default Root