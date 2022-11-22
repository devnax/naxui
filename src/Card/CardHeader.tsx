import React, { forwardRef, HTMLAttributes } from 'react'
import { UsePropsType } from "../hooks/useProps/types";
import Stack from '../Stack'

export type CardHeaderProps = UsePropsType<HTMLAttributes<HTMLElement>> & {
   spaceing?: number,
}

const CardHeader = ({ children, spaceing, ...props }: CardHeaderProps) => {


   return (
      <Stack
         alignItems='center'
         sx={{
            '& > *': {
               mr: spaceing || 1,
            },
            '&:last-child': {
               mr: 0
            }
         }}
         {...props}
      >
         {children}
      </Stack>
   )
}

export default CardHeader