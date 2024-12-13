'use client'
import { Tag, TagComponentType, TagProps, useBreakpointProps, useInterface } from 'naxui-manager';
import { useBreakpoinPropsType } from 'naxui-manager/dist/breakpoint/useBreakpointProps';
import React, { ReactNode, UIEvent, useMemo, useRef } from 'react'

export type ScrollbarProps<T extends TagComponentType = "div"> = TagProps<T> & {
    children: ReactNode;
    thumbSize?: useBreakpoinPropsType<number>;
    thumbColor?: useBreakpoinPropsType<string>;
    trackColor?: useBreakpoinPropsType<string>;
    onScrollEnd?: (e: UIEvent<HTMLDivElement>) => void;
}

const _Scrollbar = <T extends TagComponentType = "div">({ children, ...rest }: ScrollbarProps<T>, ref: React.Ref<any>) => {
    let [{ thumbSize, thumbColor, trackColor, onScroll, onScrollEnd, ...props }] = useInterface<any>("Scrollbar", rest, {})
    const _p: any = {}
    if (thumbSize) _p.thumbSize = thumbSize
    if (thumbColor) _p.thumbColor = thumbColor
    if (trackColor) _p.trackColor = trackColor
    const p: any = useBreakpointProps(_p)

    thumbSize = p.thumbSize ?? 10
    thumbColor = p.thumbColor ?? "var(--color-divider)"
    trackColor = p.trackColor ?? "var(--color-background-secondary)"

    ref = ref || useRef()

    useMemo(() => {
        ((ref as any)).scrollTo = (pos: number) => {
            (ref as any).current.scrollTo({ top: pos, behavior: 'smooth' })
        }
        (ref as any).scrollToBottom = () => {
            (ref as any).scrollTo((ref as any).current.scrollHeight)
        }
        (ref as any).scrollToTop = () => {
            (ref as any).scrollTo(0)
        }
    }, [])

    if (onScroll || onScrollEnd) {
        props.onScroll = (e: UIEvent<HTMLDivElement>) => {
            if (onScrollEnd) {
                const ele: any = e.target
                const scrollTop = ele.scrollTop
                const scrollHeight = ele.scrollHeight
                const clientHeight = ele.clientHeight
                const isScrollDown = scrollHeight - scrollTop <= clientHeight + 1
                isScrollDown && onScrollEnd(e)
            }
            onScroll && onScroll(e)
        }
    }

    return (
        <Tag
            {...props}
            ref={ref}
            baseClass='scrollbar'
            sxr={{
                height: "100%",
                width: "100%",
                overflow: "auto",
                scrollbarWidth: "thin", // Firefox specific
                scrollbarColor: `${thumbColor} ${trackColor}`, //"#888 #f4f4f4", // Thumb and track colors for Firefox
                msOverflowStyle: "scrollbar", // Internet Explorer
                "&::-webkit-scrollbar": {
                    width: thumbSize, // Width of the vertical scrollbar
                    height: thumbSize, // Height of the horizontal scrollbar
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: thumbColor, // Color of the scroll thumb
                    borderRadius: "5px", // Rounded corners
                    border: "2px solid #f4f4f4", // Space around the thumb
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: thumbColor, // Thumb color on hover
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: trackColor, // Background color of the scrollbar track
                    borderRadius: "5px", // Rounded corners
                },
            }}
        >
            {children}
        </Tag>
    )
}

const Scrollbar = React.forwardRef(_Scrollbar) as typeof _Scrollbar
export default Scrollbar 