import React, { useState, useEffect, useRef, useMemo } from 'react';
import ButtonBase from '../src/base/ButtonBase'
import Input from '../src/base/InputBase'
import Stack from '../src/Stack'
import { createTransition } from '../src/hooks/Transition'


const Root = () => {
   const [cl, set] = useState("primary")
   const [_apply, setApply] = useState()
   const ref = useRef()


   const trans = useMemo(() => createTransition({
      ele: ref.current,
      duration: 300,
      effects: {
         initial: {
            transform: "translateZ(-10px) transLateY(0px)",
            opacity: 0
         },
         animate: {
            transform: "translateZ(0px) transLateY(0px)",
            opacity: 1,
            transition: "opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
         },
         exit: {
            transform: "scale(1.5)",
            opacity: 0,
            transition: "all .3s",
            fontSize: 16
         },
         exited: {
            // transform: "scale(1.5)",
            opacity: 0,
            display: "none"
            // fontSize: 16,
            // transition: "opacity,transform .3s",
         }
      }
   }), [])

   useEffect(() => {
      trans.setEle(ref.current as any)
   }, [])

   return (
      <Stack
         justifyContent="space-between"
         radius={1}
         direction="column"
      >
         <Stack
            radius={1}
            p={1}
            sx={{
               '& > div': {
                  borderRadius: 2,
                  p: 12,
                  bgColor: "#eee",
                  width: 300,
                  m: 3
               }
            }}
         >

            <div
               ref={ref as any}
            >Working</div>
         </Stack>
         <Stack
            radius={1}
            p={1}
         >

            <ButtonBase
               p={1}
               px={1.5}
               radius={.6}
               fontWeight={500}
               fontSize={16}
               cursor="pointer"
               sx={{ transition: '.5s' }}
               onClick={() => {
                  trans.open ? trans.exit() : trans.animate()
                  set(cl === 'primary' ? "warning" : "primary")
               }}
            >Nice</ButtonBase>
         </Stack>
      </Stack>
   )
}

export default Root