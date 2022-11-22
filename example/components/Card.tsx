import React from 'react';
import Stack from '../../src/Stack'
import Box from '../../src/Box';
import Typography from '../../src/Typography';
import Card from '../../src/Card';
import CardHeader from '../../src/Card/CardHeader';

import Avatar from '../../src/Avatar';

const Root = () => {
   return (
      <Stack flexColumn size="md" p={2} my={7} border="1px solid" borderColor="grey.3" radius={2}>
         <Typography variant='button' color="grey.5" textTransform="uppercase" mb={2}>Card</Typography>
         <Stack>
            <Card>
               <CardHeader spaceing={3} >
                  <Typography>a</Typography>
                  <Typography>4</Typography>
                  <Typography>4</Typography>
               </CardHeader>
            </Card>
         </Stack>
      </Stack >
   )
}

export default Root