import React, { forwardRef } from 'react'
import ButtonBase, { ButtonBaseProps } from '../base/BaseButton';

export type ButtonProps = Omit<ButtonBaseProps, 'color'> & {
   fullWidth?: boolean;
   color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
   size?: 'small' | 'medium' | 'large';
   variant?: 'filled' | 'outlined' | 'text' | "soft" | "default";
   corner?: "square" | "rounded" | "circle";
}



const Button = forwardRef((props: ButtonProps, ref) => {
   let { children, variant, color, corner, size, fullWidth, ...rest } = props
   color = color || "primary"
   const sizes: any = {
      small: {
         height: 40,
         px: 1.5,
         fontSize: 14
      },
      medium: {
         height: 44,
         px: 2.5,
      },
      large: {
         height: 48,
         px: 3.5,
         fontSize: 17
      },
   }

   const variants: any = {
      default: {
         bgColor: 'background.paper',
         color: `text`,
         shadow: "shadow.1",
      },
      filled: {
         bgColor: color,
         color: `${color}.text`,
         shadow: "shadow.1",
      },
      outlined: {
         border: `1px solid`,
         borderColor: color,
         color
      },
      text: {
         color
      },
      soft: {
         bgColor: color,
         color: `${color}.text`
      },
   }

   const corners = {
      square: { radius: 0 },
      rounded: { radius: 1.5 },
      circle: { radius: 5 },
   }


   return (
      <ButtonBase
         {...variants[variant || "filled"]}
         {...corners[corner || "rounded"]}
         {...sizes[size || "medium"]}
         width={fullWidth ? "100%" : "auto"}
         {...rest}
         ref={ref}
      >
         {children}
      </ButtonBase>
   )
})

export default Button