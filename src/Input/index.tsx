import React from 'react'
import { InputProps } from './types'
import useProps from '../hooks/useProps'
import Stack from '../Stack'

const Input = ({ children, multiline, cols, rows, ..._props }: InputProps) => {
   const { props } = useProps({
      p: 1.5,
      fontSize: 16,
      radius: .9,
      border: '1px solid',
      borderColor: '#444',
      outline: 'none',
      ...multiline && {
         cols: (cols || 2) - 2,
         rows: rows,
      },
      ..._props
   })

   return <Stack>
      {React.createElement(multiline ? 'textarea' : 'input', props, children)}
   </Stack>
}

export default Input