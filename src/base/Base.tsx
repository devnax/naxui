import React, { ComponentType, forwardRef } from 'react'
import useProps from '../hooks/useProps'
import { HTMLAttributes } from "react";
import { UsePropsType } from "../hooks/useProps/types";

export type BaseProps = UsePropsType<HTMLAttributes<HTMLElement>> & {
   baseClass: string;
   component: keyof HTMLElementTagNameMap | ComponentType
}

const Base = forwardRef(({ children, component, className, baseClass, ..._props }: BaseProps, ref) => {
   const { props } = useProps({
      ..._props,
      baseClass,
      ref
   })
   return React.createElement(component, props, children)
})

export default Base