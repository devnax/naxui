import React, { useState } from 'react';
import ButtonBase from '../src/base/ButtonBase'
import Input from '../src/base/InputBase'


const Root = () => {
   const [cl, set] = useState("primary")

   return (
      <div>
         <Input
            m={7}
            p={10}
            bgcolor="background.main"
            border={0}
            radius={.5}
            fontSize={14}
            sx={{
               outline: 'none',
            }}
         />
         <ButtonBase
            p={12}
            px={3.5}
            radius={.6}
            bgcolor={cl}
            fontWeight={500}
            fontSize={16}
            cursor="pointer"
            sx={{ transition: '.1s' }}
            onClick={() => {
               set(cl === 'primary' ? "warning" : "primary")
            }}
         >Nice</ButtonBase>
      </div>
   )
}

export default Root