import React from 'react'
import { ButtonBaseProps } from './types'
import useProps from '../../hooks/useProps'

const ButtonBase = ({ children, ..._props }: ButtonBaseProps) => {
   const { props } = useProps(_props, "Button")

   return (
      <button
         {...props}
      >
         {children}
      </button>
   )
}

export default ButtonBase