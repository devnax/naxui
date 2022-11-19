import React from 'react'
import useProps from '../hooks/useProps'
import { HTMLAttributes } from "react";
import { UsePropsType } from "../hooks/useProps/types";
export type BoxProps = UsePropsType<HTMLAttributes<HTMLElement>>

const Box = ({ children, component, className, ..._props }: BoxProps) => {
   const { props } = useProps({
      ..._props,
      baseClass: "nui-box"
   })
   return React.createElement(component || 'div', props, children)
}

export default Box