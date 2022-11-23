import React from 'react';
import Avatar from '../../src/Avatar'
import Stack from '../../src/Stack'
import Box from '../../src/Box';
import Typography from '../../src/Typography';


const Root = () => {
   return (
      <Stack flexColumn size="md" p={2} my={7} border="1px solid" borderColor="grey.3" radius={2}>
         <Typography variant='button' color="grey.5" textTransform="uppercase" mb={2}>Avatar</Typography>
         <Stack>
            <Box>
               <Avatar src={'https://mui.com/static/images/avatar/1.jpg'} />

            </Box>
            <Box mx={2} >
               <Avatar radius={1} src={'https://mui.com/static/images/avatar/2.jpg'} />
            </Box>
            <Box>
               <Avatar radius={0} src={'https://mui.com/static/images/avatar/3.jpg'} />
            </Box>
         </Stack>
      </Stack >
   )
}

export default Root