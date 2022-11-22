import React, { forwardRef, HTMLAttributes, ReactElement } from 'react'
import Base from './Base'
import { UsePropsType } from "../hooks/useProps/types";
import { useTheme } from '../theme';

export type ButtonBaseProps = UsePropsType<HTMLAttributes<HTMLButtonElement>> & {
   startIcon?: ReactElement;
   endIcon?: ReactElement;
}


const ButtonBase = forwardRef(({ children, startIcon, endIcon, sx, ..._props }: ButtonBaseProps, ref) => {
   const { typography } = useTheme()
   return (
      <Base
         component="button"
         baseClass='nui-button'
         bgColor="transparent"
         border="none"
         height={44}
         px={2}
         radius={1.5}
         cursor="pointer"
         display="inline-flex"
         alignItems="center"
         sx={{
            gap: 4,
            userSelect: "none",
            textDecoration: "none",
            '& *:first-child': {
               ml: -.5,
            },
            ...(sx || {})
         }}
         {...typography.button}
         {..._props}
         ref={ref}
      >
         {startIcon}
         {children}
         {endIcon}
      </Base>
   )
})

export default ButtonBase