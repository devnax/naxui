import React from 'react'
import { TextProps } from './types'
import useProps from '../hooks/useProps'
import { ThemeReference } from '../styles/theme'

const Text = ({ children, component, variant, ..._props }: TextProps) => {

   const reference: any = ThemeReference()
   const { props } = useProps({
      ...reference[variant || 'title'],
      ..._props
   })

   if (component) {
      component = component
   } else {
      switch (variant) {
         case 'Headline1':
            component = 'h1'
            break;
         case 'Headline2':
            component = 'h2'
            break;
         case 'Headline3':
            component = 'h3'
            break;
         case 'Headline4':
            component = 'h4'
            break;
         case 'Headline5':
            component = 'h5'
            break;
         case 'Headline6':
            component = 'h6'
            break;

         default:
            component = 'p'
            break;
      }
   }
   return React.createElement(component || 'p', props, children)
}

export default Text