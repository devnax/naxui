import React, { forwardRef, useState, useEffect, useRef } from 'react'
import InputBase, { InputBaseProps } from '../base/InputBase';
import useVariants, { useCornerVariants, useVariantBackground } from '../hooks/useVariants'

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


   const radius = useCornerVariants(corner || "rounded")
   const bg = useVariantBackground(variant || "filled")
   const sizes = useVariants(size || "medium", {
      small: {
         height: 36,
         px: 1,
         fontSize: 15
      },
      medium: {
         height: 44,
         px: 1,
         fontSize: 16
      },
      large: {
         height: 48,
         px: 1.5,
         fontSize: 17
      }
   })

   let focus_css: any = {}
   if (focused) {
      focus_css = {
         borderColor: focused ? "primary" : "transparent",
         shadow: "shadow.2"
      }
   }


   return (
      <InputBase
         containerProps={{
            border: '1px solid transparent',
            width: fullWidth ? "100%" : "auto",
            ...radius,
            ...sizes,
            ...bg,
            ...containerProps,
            sx: {
               transition: "all .2s",
               ...(containerProps?.sx || {})
            },
            ...focus_css
         }}
         fontSize={sizes.fontSize}
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