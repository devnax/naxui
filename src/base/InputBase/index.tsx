import React from 'react'
import { InputBaseProps } from './types'
import useProps from '../../hooks/useProps'

const InputBase = ({ children, ..._props }: InputBaseProps) => {
   const { className, props } = useProps(_props)
   return (
      <input
         {...props}
         className={className}
      />
   )
}

export default InputBase