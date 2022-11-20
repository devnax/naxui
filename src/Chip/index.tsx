import { forwardRef, HTMLAttributes } from 'react'
import React from 'react'
import useProps from '../hooks/useProps'
import { UsePropsType } from "../hooks/useProps/types";
import Stack from '../Stack';
import AvatarUI from '../Avatar';
import { ReactElement } from 'react';

export type ChipProps = Omit<UsePropsType<HTMLAttributes<HTMLElement>>, "size" | "color"> & {
   startIcon?: ReactElement;
   endIcon?: ReactElement;
   avatar?: string;
   avatarSize?: number;
   size?: 'medium' | 'small';
   variant?: 'filled' | 'outlined';
   color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
}


const Chip = forwardRef((p: ChipProps, ref) => {
   const { children, component, variant, size, color, startIcon, endIcon, avatar, avatarSize, ..._props } = p
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
         bgColor: color,
         color: `${color}.text`
      }
   }


   const { props } = useProps({
      mx: .5,
      textTransform: 'capitalize',
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Inter',
      ..._props,
      baseClass: "nui-chip",
      ref
   })

   return <Stack
      {...variants[variant || "filled"]}
      {...sizes[size || "medium"]}
      radius={2}
      alignItems="center"
      sx={{
         '& svg': {
            width: size === 'small' ? 20 : 23,
            color: variant === 'filled' ? `${color}.text` : color,
         },
      }}
   >
      {startIcon}
      {avatar && <AvatarUI size={avatarSize || size === 'small' ? 2.3 : 3} ml={.5} src={avatar} />}
      {React.createElement(component || 'span', props, children)}
      {endIcon}
   </Stack>
})

export default Chip