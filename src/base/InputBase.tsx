import React, { forwardRef, HTMLAttributes, ReactElement } from 'react'
import Base from './Base'
import { UsePropsType } from "../hooks/useProps/types";
import { useTheme } from '../theme';
import Stack, { StackProps } from '../Stack'
import Box, { BoxProps } from '../Box'

export type InputBaseProps = UsePropsType<HTMLAttributes<HTMLInputElement>> & {
   startIcon?: ReactElement;
   endIcon?: ReactElement;
   startIconProps?: BoxProps;
   endIconProps?: BoxProps;
   containerProps?: StackProps
}


const InputBase = forwardRef(({ containerProps, startIcon, endIcon, startIconProps, endIconProps, ...inputProps }: InputBaseProps, ref) => {
   const { typography } = useTheme()
   return (
      <Stack
         height={48}
         bgColor="transparent"
         px={1.5}
         radius={1.2}
         alignItems="center"
         {...typography.button}
         {...containerProps}

      >
         {startIcon && <Box component="span" display="inherit" opacity={.4} pr={1} {...startIconProps}>{startIcon}</Box>}
         <Base
            component="input"
            baseClass='nui-input'
            border="none"
            outline="none"
            color="text"
            bgColor="transparent"
            height="100%"
            width="100%"
            {...inputProps}
            ref={ref}
         />
         {endIcon && <Box component="span" display="inherit" opacity={.4} pl={1} {...endIconProps}>{endIcon}</Box>}

      </Stack>
   )
})

export default InputBase