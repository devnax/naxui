'use client'
import { Tag, TagComponentType, TagProps } from 'naxui-manager';
import React, { forwardRef, useEffect, useRef } from 'react';

export type ClickOutsideProps<T extends TagComponentType = "div"> = TagProps<T> & {
    onClickOutside: () => void
}

const _ClickOutside = ({ children, onClickOutside, ...props }: ClickOutsideProps, ref: React.Ref<any>) => {
    const _ref: any = ref || useRef()
    const handler = (e: any) => {
        if (!_ref.current.contains(e.target)) {
            onClickOutside()
        }
    }
    useEffect(() => {
        document.addEventListener("click", handler)
        return () => {
            document.removeEventListener("click", handler)
        }
    }, [])


    return <Tag
        {...props}
        ref={_ref}
    >
        {children}
    </Tag>

}

const ClickOutside = forwardRef(_ClickOutside) as typeof _ClickOutside
export default ClickOutside