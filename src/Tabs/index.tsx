'use client'
import React, { useEffect, ReactElement, useMemo, cloneElement, useState, Children, forwardRef, useRef } from 'react'
import { TabProps } from '../Tab'
import { Tag, TagProps, useColorTemplateColors } from 'naxui-manager'
import useTransition from './useTransition'

export type ValueType = string | number
export type TabsProps = Omit<TagProps, 'onChange'> & {
    children: ReactElement<TabProps> | ReactElement<TabProps>[];
    value?: ValueType;
    onChange?: (value: ValueType) => void;
    variant?: "bottom-line" | "top-line" | "fill" | "outline" | "text" | "alpha";
    color?: useColorTemplateColors;
    verticle?: boolean;
    slotProps?: {}

    indicatorSize?: number;
}

const getRect = (ele: HTMLElement, parent: HTMLElement) => {
    const _rect: any = {};
    const parentRect = parent.getBoundingClientRect();
    const childRect = ele.getBoundingClientRect();
    _rect.top = childRect.top - parentRect.top;
    _rect.right = childRect.right - parentRect.right;
    _rect.bottom = childRect.bottom - parentRect.bottom;
    _rect.left = childRect.left - parentRect.left;
    _rect.width = childRect.width;
    _rect.height = childRect.height;
    return _rect
}

const _Tabs = ({ onChange, value, children, verticle, indicatorSize, ...props }: TabsProps, ref: any) => {
    indicatorSize ??= 2
    ref = ref || useRef()
    const containerRef: any = useRef()
    const [trans, setTrans] = useState<any>()
    const [val, setVal] = useState<ValueType | void>(value)
    const { classname } = useTransition(!!trans, {
        variant: trans || { from: {}, to: {} },
        ease: "ease",
        duration: trans ? 200 : 0
    })

    const { childs, selectedIndex } = useMemo(() => {
        let info: any = {
            childs: null,
            selectedIndex: 0
        }
        info.childs = Children.map(children, (child: any, idx: number) => {
            let selected = child.props.value === value
            if (selected) {
                info.selectedIndex = idx
            }
            delete child.props.value
            return cloneElement(child, {
                corner: "square",
                onClick: () => {
                    onChange && onChange(child.props.value)
                },
                classNames: [child.props.className, { "tab-selected": selected }],
                color: selected ? "warning" : "default",
                variant: "text"
            })
        })
        return info
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, onChange, value])


    useEffect(() => {
        let con = containerRef.current
        const conChilds = con.children
        if (conChilds && conChilds[selectedIndex]) {
            const selectedTab = con.querySelector(".tab-selected") || conChilds[0]
            const prevRect = getRect(selectedTab, con)
            const rect = getRect(conChilds[selectedIndex], con)

            let anim: any = {
                from: {
                    left: prevRect?.left || 0,
                    width: prevRect?.width || 0,
                    height: prevRect?.height || 0
                },
                to: {
                    left: rect?.left || 0,
                    width: rect?.width || 0,
                    height: rect?.height || 0,
                },
            }
            if (verticle) {
                anim = {
                    from: {
                        top: prevRect?.top || 0,
                        height: prevRect?.height || 0,
                        width: prevRect?.width || 0,


                    },
                    to: {
                        top: rect?.top || 0,
                        height: rect?.height || 0,
                        width: rect?.width || 0,

                    }
                }
            }
            setTrans(anim)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex])

    return (
        <Tag
            {...props}
            baseClass='tabs-root'
            ref={ref}
            sxr={{
                position: "relative",
                overflow: "hidden",
                zIndex: 1
            }}
        >
            <Tag
                baseClass='tabs-items'
                sxr={{
                    display: "flex",
                    flexDirection: verticle ? "column" : "row",
                    zIndex: 9999
                }}
                ref={containerRef}
            >
                {childs}
            </Tag>
            <Tag
                baseClass='tabs-indicator'
                position="absolute"
                bgcolor="brand"
                width={verticle ? indicatorSize : 0}
                height={verticle ? 0 : indicatorSize}
                bottom={verticle ? "initial" : 0}
                right={verticle ? 0 : 'initial'}
                zIndex={-1}
                className={classname}
            >
            </Tag>
        </Tag>
    )
}

const Tabs = forwardRef(_Tabs) as typeof _Tabs
export default Tabs