import React, { useEffect, useRef } from 'react'
import ButtonBase from '../src/base/ButtonBase'
import animate from '../src/hooks/Transition/animate'
import Stack from '../src/Stack'

const pos = [
   {
      duration: 0,
      transition: "all .4s",
      left: 0,
      top: 0
   },
   {
      duration: 10000,
      transition: "all .6s",
      right: 0,
      top: 0
   },
   {
      duration: 1000,
      transition: "all 1s",
      right: 0,
      bottom: 0
   },
   {
      duration: 1000,
      transition: "all 1s",
      bottom: 0,
      left: 0
   },
   {
      duration: 1000,
      transition: "all 1s",
      top: 0,
      left: 0
   },
]


const radius = [
   {
      duration: 300,
      transition: "all .3s",
      radius: "10px"
   },
   {
      duration: 300,
      radius: "100%",
      transition: "all 0.3s",
   },
   {
      duration: 300,
      radius: "10%",
      transition: "all 0.3s",
   },
   {
      duration: 300,
      radius: "50%",
      transition: "all 0.3s",
   }
]


const Animation = () => {

   const ref = useRef()
   const run = () => {
      if (ref.current) {
         animate(ref.current, {
            infinity: true,
            keyframes: radius
         })
      }
   }
   return (
      <Stack
         m={2}
      >
         <Stack
            ref={ref}
            w={200}
            h={200}
            bgColor="#ddd"
            radius={2}
            onClick={() => run()}
         >

         </Stack>
         <Stack p={1}>
            <ButtonBase onClick={() => run()}>Play</ButtonBase>
         </Stack>

      </Stack>
   )
}

export default Animation