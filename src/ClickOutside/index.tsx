'use client'
import React, { cloneElement, Children, useEffect, useRef, ReactElement } from 'react';

export type ClickOutsideProps = {
    children: ReactElement;
    onClickOutside: () => void
}

const _ClickOutside = ({ children, onClickOutside }: ClickOutsideProps, ref: React.Ref<any>) => {
    const _ref: any = ref || useRef()

    const handler = (e: any) => {
        if (!_ref?.current.contains(e.target)) {
            onClickOutside()
        }
    }

    useEffect(() => {
        if (_ref?.current) {
            setTimeout(() => {
                document.addEventListener("click", handler)
            }, 10);
        }
        return () => {
            document.removeEventListener("click", handler)
        }
    }, [])

    if (!children || Array.isArray(children)) throw new Error("Invalid children")

    const first: any = Children.toArray(children).shift();
    return <>
        {cloneElement(first, {
            ref: _ref
        })}
    </>

}

const ClickOutside = React.forwardRef(_ClickOutside) as typeof _ClickOutside
export default ClickOutside