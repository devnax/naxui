import { forwardRef, HTMLAttributes } from 'react'
import React from 'react'
import useProps from '../hooks/useProps'
import { UsePropsType } from "../hooks/useProps/types";
import Stack from '../Stack';
import { ReactElement } from 'react';
import Typography from '../Typography';

export type ChipProps = Omit<UsePropsType<HTMLAttributes<HTMLElement>>, "size" | "color"> & {
   startIcon?: ReactElement;
   endIcon?: ReactElement;
   size?: 'medium' | 'small';
   variant?: 'filled' | 'outlined';
   color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
}


const Chip = forwardRef((p: ChipProps, ref) => {
   const { children, variant, size, color, startIcon, endIcon, ..._props } = p
   const sizes: any = {
      small: {
         height: 26,
         px: 1,
      },
      medium: {
         height: 32,
         px: 1.5,
      }
   }
   const variants: any = {
      outlined: {
         border: '1px solid',
         borderColor: color || 'background.paper',
         color: color || 'grey.6'
      },
      filled: {
         bgColor: color || 'background.paper',
         color: color ? `${color}.text` : 'grey.6'
      }
   }


   const { props } = useProps({
      textTransform: 'capitalize',
      radius: 2,
      alignItems: 'center',
      sx: {
         '& svg': {
            width: size === 'small' ? 20 : 23,
            color: variant === 'filled' ? color ? `${color}.text` : 'grey.6' : color || 'grey.6',
         },
      },
      ..._props,
      baseClass: "nui-chip",
      ref
   })

   return <Stack
      {...variants[variant || "filled"]}
      {...sizes[size || "medium"]}
      {...props}
   >
      {startIcon}
      {/* {avatar && <AvatarUI size={avatarSize || size === 'small' ? 2.3 : 3} ml={.5} src={avatar} />} */}
      <Typography
         {...size === 'small' ? { fontSize: 14, } : { fontSize: 15, }}
         variant="body"
         color={variant === 'filled' ? color ? `${color}.text` : 'grey.6' : color || 'grey.6'}
      >
         {children}
      </Typography>
      {endIcon}
   </Stack>
})

export default Chip