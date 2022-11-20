import React from 'react'
import useProps from '../hooks/useProps'
import { HTMLAttributes } from "react";
import { UsePropsType } from "../hooks/useProps/types";

export type ContainerProps = Omit<UsePropsType<HTMLAttributes<HTMLElement>>, "size"> & {
   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
}

const Container = ({ children, component, size, ..._props }: ContainerProps) => {
   const { props } = useProps({
      mx: 'auto',
      ..._props,
      baseClass: "nui-container",
      maxw: (size && `breakpoints.${size}`) || "breakpoints.lg",
   })

   return React.createElement(component || 'div', props, children)
}

export default Container