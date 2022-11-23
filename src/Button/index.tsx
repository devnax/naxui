import React, { forwardRef } from 'react'
import ButtonBase, { ButtonBaseProps } from '../base/BaseButton';
import useVariants, { useCornerVariants, ColorVariantType, useColorVariants } from '../hooks/useVariants'

export type ButtonProps = Omit<ButtonBaseProps, 'color'> & {
   fullWidth?: boolean;
   color?: ColorVariantType;
   size?: 'small' | 'medium' | 'large';
   variant?: 'filled' | 'outlined' | "normal";
   corner?: "square" | "rounded" | "circle";
}



const Button = forwardRef((props: ButtonProps, ref) => {
   let { children, variant, color, corner, size, fullWidth, ...rest } = props
   color = color || "primary"

   const sizes: any = useVariants(size || "medium", {
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
   })

   const colors = useColorVariants(color)
   const corners = useCornerVariants(corner || "rounded")

   const _colors = variant === 'outlined' ? {
      border: "1px solid",
      borderColor: colors.main,
      color: colors.main
   } : {
      bgColor: colors.color,
      color: colors.text
   }

   return (
      <ButtonBase
         {...corners}
         {...sizes}
         {..._colors}
         width={fullWidth ? "100%" : "auto"}
         sx={{
            '&:hover': {
               bgColor: colors.light
            }
         }}
         {...rest}
         ref={ref}
      >
         {children}
      </ButtonBase>
   )
})

export default Button