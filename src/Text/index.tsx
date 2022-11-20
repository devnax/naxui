import React from 'react'
import { TextProps } from './types'
import useProps from '../hooks/useProps'
import { useTheme } from '../theme'

const Text = ({ children, component, variant, ..._props }: TextProps) => {
   const { typography } = useTheme()

   const tcss = (typography as any)[variant] || typography.body

   const { props } = useProps({
      ...tcss,
      ..._props
   })

   let c: any = component || variant?.startsWith('h') ? variant : "p"
   return React.createElement(c, props, children)
}

export default Text