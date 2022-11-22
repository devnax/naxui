import React from 'react';
import Typography from '../../src/Typography'
import Stack from '../../src/Stack'

const Root = () => {
   return (
      <Stack flexColumn size="md" p={2} my={7} border="1px solid" borderColor="grey.3" radius={2}>
         <Typography variant='button' color="grey.5" textTransform="uppercase" mb={2}>Typography</Typography>
         <Typography variant='h1' mb={2}>Heading 1 Typography</Typography>
         <Typography variant='h2' mb={2}>Heading 2 Typography</Typography>
         <Typography variant='h3' mb={2}>Heading 3 Typography</Typography>
         <Typography variant='h4' mb={2}>Heading 4 Typography</Typography>
         <Typography variant='h5' mb={2}>Heading 5 Typography</Typography>
         <Typography variant='h6' mb={2}>Heading 6 Typography</Typography>
         <Typography variant='body' mb={2}>In this video, we’ll be looking at how typography scales can be used in UI design specifically. </Typography>
         <Typography variant='subtitle' >
            Typography scales are a great way to bring harmony and coherence to your design.
            In this video, we’ll be looking at how typography scales can be used in UI design specifically.
            The basic idea is that the scale allows you to create nice transitions between different weights of typefaces while also keeping some consistency throughout the whole system.
            It’s important that the typography scale is set up early on in production because it will affect all other decisions you make later on down the line. So let’s get started!
         </Typography>
      </Stack >
   )
}

export default Root