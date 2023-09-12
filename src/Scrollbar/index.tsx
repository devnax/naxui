'use client'
import React, { ComponentPropsWithoutRef, ReactNode, UIEvent } from 'react'
import BrowserScrollbar from 'react-browser-scrollbar'

export type ScrollbarProps = ComponentPropsWithoutRef<"div"> & {
    children: ReactNode;
    darkMode?: boolean;
    autoHide?: boolean;
    thumbSize?: number;
    onScrollEnd?: (e: UIEvent<HTMLDivElement>) => void;
    onScrollStop?: (e: UIEvent<HTMLDivElement>) => void;
    onScrollStart?: (e: UIEvent<HTMLDivElement>) => void;
}

const _Scrollbar = ({ children, ...props }: ScrollbarProps, ref: React.Ref<any>) => {
    return (
        <BrowserScrollbar ref={ref} {...props}>{children}</BrowserScrollbar>
    )
}

const Scrollbar = React.forwardRef(_Scrollbar) as typeof _Scrollbar
export default Scrollbar 