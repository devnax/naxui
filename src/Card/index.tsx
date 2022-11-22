import React, { forwardRef, HTMLAttributes } from 'react'
import Paper from '../Paper'
import useProps from '../hooks/useProps'
import { UsePropsType } from "../hooks/useProps/types";

import CardHeader from './CardHeader'
import CardFooter from './CardFooter'
import CardImage from './CardImage'

export type CardProps = UsePropsType<HTMLAttributes<HTMLElement>>

const Card = forwardRef(({ children, ..._props }: CardProps, ref) => {
   const { props } = useProps({
      p: 2,
      radius: .5,
      ..._props,
      baseClass: "nui-paper",
      ref
   })

   return (
      <Paper
         {...props}
      >
         {children}
      </Paper>
   )
})

export default Card