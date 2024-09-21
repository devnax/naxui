'use client'
import React, { useEffect, ReactElement, useMemo, cloneElement, useState, Children, forwardRef, useRef } from 'react'
import { TabProps } from '../Tab'
import { Tag, TagProps, useTransition } from 'naxui-manager'

export type ValueType = string | number
export type TabsProps = Omit<TagProps, 'onChange'> & {
    value: ValueType;
    onChange?: (value: ValueType) => void;
    children: ReactElement<TabProps> | ReactElement<TabProps>[];
    verticle?: boolean;
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
    indicatorSize = indicatorSize || 2
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ref = ref || useRef()
    const containerRef: any = useRef()
    const [trans, setTrans] = useState<any>()
    const [transRef, cls] = useTransition({
        ...trans,
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
            return cloneElement(child, {
                value: undefined,
                onClick: () => {
                    onChange && onChange(child.props.value)
                },
                classNames: [child.props.className, { "tab-selected": selected }],
                color: selected ? "primary" : "subtext"
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
                    width: prevRect?.width || 0
                },
                to: {
                    left: rect?.left || 0,
                    width: rect?.width || 0
                },
            }
            if (verticle) {
                anim = {
                    from: {
                        top: prevRect?.top || 0,
                        height: prevRect?.height || 0
                    },
                    to: {
                        top: rect?.top || 0,
                        height: rect?.height || 0
                    }
                }
            }
            setTrans(anim)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex])

    return (
        <Tag
            flexBox
            flexDirection={verticle ? "column" : "row"}
            {...props}
            position="relative"
            baseClass='tabs-root'
            ref={ref}
        >
            <Tag
                baseClass='tabs-items'
                ref={containerRef}
                flexDirection={verticle ? "column" : "row"}
            >
                {childs}
            </Tag>
            <Tag
                baseClass='tabs-indicator'
                ref={transRef}
                className={cls}
                position="absolute"
                radius={1}
                bgcolor="primary"
                width={verticle ? indicatorSize : 0}
                height={verticle ? 0 : indicatorSize}
                bottom={verticle ? "initial" : 0}
                right={verticle ? 0 : 'initial'}
                zIndex={1}
            >
            </Tag>
        </Tag>
    )
}

const Tabs = forwardRef(_Tabs) as typeof _Tabs
export default Tabs