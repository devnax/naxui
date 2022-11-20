import { forwardRef, ReactChild, HTMLAttributes } from 'react'
import React from 'react'
import useProps from '../hooks/useProps'
import { UsePropsType } from "../hooks/useProps/types";
import Box from '../Box';

import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export type CheckBoxProps = UsePropsType<HTMLAttributes<HTMLElement>> & {
   color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
   size?: 'medium' | 'small';
   checked?: boolean;
   checkedIcon?: ReactChild
}

const CheckBox = forwardRef(({ children, component, color, ..._props }: CheckBoxProps, ref) => {

   const { props } = useProps({
      ..._props,
      baseClass: "nui-CheckBox",
      ref
   })

   return <Box
      component="button"
      bgColor={color || 'background.paper'}
      color={color ? `${color}.text` : 'background.default'}
      border={0}
      {...props}
   >
      <CheckBoxIcon />
   </Box>
})

export default CheckBox