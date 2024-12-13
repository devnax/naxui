'use client'
import React, { useEffect, ReactElement, useMemo, cloneElement, useState, Children, forwardRef, useRef } from 'react'
import { TabProps } from '../Tab'
import { Tag, TagProps, useBreakpointProps, useColorTemplateColors, useInterface, useTransition, useBreakpointPropsType } from 'naxui-manager'
import { ButtonProps } from '../Button'


type ValueType = string | number
export type TabsProps = Omit<TagProps, 'onChange'> & {
    children: ReactElement<TabProps> | ReactElement<TabProps>[];
    value?: ValueType;
    onChange?: (value: ValueType) => void;
    variant?: useBreakpointPropsType<"start-line" | "end-line" | "fill" | "outline" | "text" | "alpha">;
    color?: useBreakpointPropsType<useColorTemplateColors>;
    verticle?: useBreakpointPropsType<boolean>;
    disableTransition?: useBreakpointPropsType<boolean>;
    indicatorSize?: useBreakpointPropsType<number>;

    slotProps?: {
        content?: Omit<TagProps, "children">;
        button?: Omit<ButtonProps, "children" | "color" | "variant" | "classNames">;
    }
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

const _Tabs = ({ onChange, value, children, ...props }: TabsProps, ref: any) => {
    let [{ verticle, color, variant, indicatorSize, disableTransition, slotProps, ...rest }] = useInterface<any>("Tabs", props, {})
    const _p: any = {}
    if (variant) _p.variant = variant
    if (color) _p.color = color
    if (verticle) _p.verticle = verticle
    if (disableTransition) _p.disableTransition = disableTransition
    if (indicatorSize) _p.indicatorSize = indicatorSize
    const p: any = useBreakpointProps(_p)

    variant = p.variant ?? "end-line"
    color = p.color ?? "brand"
    verticle = p.verticle
    disableTransition = p.disableTransition
    indicatorSize = p.indicatorSize ?? 3

    ref = ref || useRef()
    const containerRef: any = useRef()
    const [trans, setTrans] = useState<any>()

    const { classname } = useTransition(!!trans, {
        variant: trans || { from: {}, to: {} },
        easing: "easeInOut",
        duration: trans ? (disableTransition ? 0 : 250) : 0
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

            let btnProps: any = {}
            if (variant === 'fill' && selected) {
                btnProps = {
                    sx: {
                        bgcolor: "transparent!importnat",
                        color: "#FFFFFF!important"
                    }
                }
            } else if (variant === 'alpha' && selected) {
                btnProps = {
                    sx: {
                        bgcolor: "transparent!importnat",
                    }
                }
            }

            delete child.props.value
            return cloneElement(child, {
                corner: "square",
                onClick: () => {
                    onChange && onChange(child.props.value)
                },
                border: 1,
                borderColor: "transparent",
                ...slotProps?.button,
                ...btnProps,
                color: selected ? color : "default",
                variant: "text",
                classNames: [child.props.classNames, { "tab-selected": selected }],
            })
        })
        return info
    }, [children, onChange, value, variant, color, verticle])

    useEffect(() => {
        let con = containerRef.current
        const conChilds = con.children
        if (conChilds && conChilds[selectedIndex]) {
            const selectedTab = con.querySelector(".tab-selected") || conChilds[0]
            const prevRect = getRect(selectedTab, con)
            const rect = getRect(conChilds[selectedIndex], con)

            let anim: any = {}
            if (verticle) {
                anim = {
                    from: {
                        top: prevRect?.top || 0,
                        height: prevRect?.height || 0,
                    },
                    to: {
                        top: rect?.top || 0,
                        height: rect?.height || 0,
                    }
                }
                if (["fill", "alpha", "outline"].includes(variant)) {
                    anim.from.width = prevRect?.width
                    anim.to.width = rect?.width
                }
            } else {
                anim = {
                    from: {
                        left: prevRect?.left || 0,
                        width: prevRect?.width || 0,
                    },
                    to: {
                        left: rect?.left || 0,
                        width: rect?.width || 0,
                    },
                }
                if (["fill", "alpha", "outline"].includes(variant)) {
                    anim.from.height = prevRect?.height || 0
                    anim.to.height = rect?.height || 0
                }
            }
            setTrans(anim)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex, variant, color, verticle])

    let indicatorProps: any = useMemo(() => {
        let _indicatorProps: any = {}
        switch (variant) {
            case "start-line":
                if (verticle) {
                    _indicatorProps = {
                        left: 0,
                        width: indicatorSize
                    }
                } else {
                    _indicatorProps = {
                        top: 0,
                        height: indicatorSize
                    }
                }
                break;
            case "end-line":
                if (verticle) {
                    _indicatorProps = {
                        right: 0,
                        width: indicatorSize
                    }
                } else {
                    _indicatorProps = {
                        bottom: 0,
                        height: indicatorSize
                    }
                }
                break;
            case "fill":
                _indicatorProps = {
                    top: 0,
                    bgcolor: color
                }
                break;
            case "outline":
                _indicatorProps = {
                    top: 0,
                    border: 1,
                    borderColor: color,
                    bgcolor: "transparent"
                }
                break;
            case "alpha":
                _indicatorProps = {
                    top: 0,
                    bgcolor: `${color}.alpha`
                }
                break;
            case "text":
                _indicatorProps = {
                    display: "none"
                }
                break;
        }
        return _indicatorProps
    }, [selectedIndex, variant, color, verticle])

    return (
        <Tag
            {...rest}
            baseClass='tabs'
            ref={ref}
            sxr={{
                position: "relative",
                zIndex: 1,
                display: "inline-block"
            }}
        >
            <Tag
                {...slotProps?.content}
                baseClass='tabs-content'
                sxr={{
                    display: verticle ? "flex" : "inline-flex",
                    flexDirection: verticle ? "column" : "row",
                }}
                ref={containerRef}
            >
                {childs}
            </Tag>
            <Tag
                baseClass='tabs-indicator'
                className={classname}
                sxr={{
                    position: "absolute",
                    zIndex: -1,
                    cursor: "pointer",
                    bgcolor: color
                }}
                {...indicatorProps}
            >
            </Tag>
        </Tag>
    )
}

const Tabs = forwardRef(_Tabs) as typeof _Tabs
export default Tabs