import { forwardRef, ReactChild, HTMLAttributes } from 'react'
import React from 'react'
import useProps from '../hooks/useProps'
import { UsePropsType } from "../hooks/useProps/types";
import Box from '../Box';

import CheckboxIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export type CheckboxProps = UsePropsType<HTMLAttributes<HTMLElement>> & {
   color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
   size?: 'medium' | 'small';
   checked?: boolean;
   checkedIcon?: ReactChild
}

const Checkbox = forwardRef(({ children, component, color, ..._props }: CheckboxProps, ref) => {

   const { props } = useProps({
      ..._props,
      baseClass: "nui-checkbox",
      ref
   })

   return <Box
      component="button"
      bgColor={color || 'background.paper'}
      color={color ? `${color}.text` : 'background.default'}
      border={0}
      {...props}
   >
      <CheckboxIcon />
   </Box>
})

export default Checkbox