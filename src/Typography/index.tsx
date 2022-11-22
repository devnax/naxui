import React from 'react'
import { TypographyProps } from './types'
import useProps from '../hooks/useProps'
import { useTheme } from '../theme'

const Typography = ({ children, component, variant, ..._props }: TypographyProps) => {
   const { typography } = useTheme()

   const tcss = (typography as any)[variant] || typography.body

   const { props } = useProps({
      ...tcss,
      ..._props
   })

   let c: any = component || variant?.startsWith('h') ? variant : "p"
   return React.createElement(c, props, children)
}

export default Typography