import React, { forwardRef, HTMLAttributes } from 'react'
import useProps from '../hooks/useProps'
import { UsePropsType } from "../hooks/useProps/types";

export type PaperProps = UsePropsType<HTMLAttributes<HTMLElement>>

const Paper = forwardRef(({ children, component, ..._props }: PaperProps, ref) => {
   const { props } = useProps({
      bgColor: 'background.paper',
      ..._props,
      baseClass: "nui-paper",
      ref
   })

   return React.createElement(component || 'div', props, children)
})

export default Paper