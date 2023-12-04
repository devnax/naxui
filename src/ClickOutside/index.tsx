'use client'
import React, { cloneElement, Children, useEffect, ReactElement, useState } from 'react';

export type ClickOutsideProps = {
    children: ReactElement;
    onClickOutside: () => void
}

const ClickOutside = ({ children, onClickOutside }: ClickOutsideProps) => {
    const [enter, setEnter] = useState(false)
    const handler = () => {
        if (!enter) {
            onClickOutside()
        }
    }

    useEffect(() => {
        setTimeout(() => {
            document.addEventListener("click", handler)
        }, 10);
        return () => {
            document.removeEventListener("click", handler)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enter])

    if (!children || Array.isArray(children)) throw new Error("Invalid children")

    const first: any = Children.toArray(children).shift();
    return <>
        {cloneElement(first, {
            onMouseEnter: () => setEnter(true),
            onMouseLeave: () => setEnter(false)
        })}
    </>

}

export default ClickOutside