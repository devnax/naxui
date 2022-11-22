import React, { forwardRef, useState, useEffect, useRef } from 'react'
import InputBase, { InputBaseProps } from '../base/InputBase';

export type InputProps = InputBaseProps & {
   fullWidth?: boolean;
   size?: 'small' | 'medium' | 'large';
   variant?: 'filled' | 'outlined';
   corner?: "square" | "rounded" | "circle";
   autoFocus?: boolean;
}



const Input = forwardRef((props: InputProps, ref: any) => {
   const [focused, setFocused] = useState(false)
   ref = ref || useRef()
   let {
      variant,
      corner,
      size,
      fullWidth,
      containerProps,
      autoFocus,
      onFocus,
      onBlur,
      ...rest
   } = props

   useEffect(() => {
      if (ref.current && autoFocus) {
         setFocused(true)
         ref.current.focus()
      }
   }, [])



   const sizes: any = {
      small: {
         height: 40,
         fontSize: 14,
         px: 1
      },
      medium: {
         height: 44,
      },
      large: {
         height: 56,
         fontSize: 17
      },
   }

   const variants: any = {
      filled: {
         bgColor: 'background.paper',
      },
      outlined: {
         borderColor: "divider.light",
      }
   }

   const corners = {
      square: { radius: 0 },
      rounded: { radius: 1.5 },
      circle: { radius: 5 },
   }

   let focus_css: any = {}
   if (focused) {
      focus_css = {
         borderColor: focused ? "primary" : "transparent",
         shadow: "shadow.3"
      }
   }


   return (
      <InputBase
         containerProps={{
            border: '1px solid transparent',
            ...variants[variant || "filled"],
            ...corners[corner || "rounded"],
            ...sizes[size || "medium"],
            width: fullWidth ? "100%" : "auto",
            ...containerProps,
            sx: {
               transition: "all .3s",
               ...(containerProps?.sx || {})
            },
            ...focus_css
         }}
         onFocus={(...args) => {
            setFocused(true)
            onFocus && onFocus(...args)
         }}
         onBlur={(...args) => {
            setFocused(false)
            onBlur && onBlur(...args)
         }}
         {...rest}
         ref={ref}
      />
   )
})

export default Input