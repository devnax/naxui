import React from 'react'
import { StackProps } from './types'
import useProps from '../hooks/useProps'

const Stack = ({ children, component, ..._props }: StackProps) => {
   const { props } = useProps({
      display: "flex",
      ..._props
   })

   return React.createElement(component || 'div', props, children)
}

export default Stack