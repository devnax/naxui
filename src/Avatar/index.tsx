import { forwardRef, HTMLAttributes } from 'react'
import React from 'react'
import useProps from '../hooks/useProps'
import { UsePropsType } from "../hooks/useProps/types";

export type AvatarProps = UsePropsType<HTMLAttributes<HTMLImageElement>> & {
   variant?: 'circular' | 'rounded' | 'square';
   src: string
}

const Avatar = forwardRef(({ children, size, variant, src, ..._props }: AvatarProps, ref) => {
   const { props } = useProps({
      size: size || 5,
      radius: size || 5,
      userSelect: 'none',
      ..._props,
      baseClass: "nui-Avatar",
      ref
   })

   return <img {...props} src={src} />
})

export default Avatar