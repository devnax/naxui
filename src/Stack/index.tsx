import React, { forwardRef } from 'react'
import useProps from '../hooks/useProps'
import { HTMLAttributes } from "react";
import { UsePropsType } from "../hooks/useProps/types";

export type StackProps = UsePropsType<HTMLAttributes<HTMLElement>>

const Stack = forwardRef(({ children, component, ..._props }: StackProps, ref) => {
   const { props } = useProps({
      display: "flex",
      ..._props,
      baseClass: "nui-stack",
      ref
   })

   return React.createElement(component || 'div', props, children)
})

export default Stack