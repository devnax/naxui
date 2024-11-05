'use client'
import React, { ReactElement, useMemo, cloneElement, useState, Children, forwardRef, useRef } from 'react'
import Input, { InputProps } from '../Input'
import List, { ListProps } from '../List'
import Menu, { MenuProps } from '../Menu'
import Stack from '../Stack'
import { OptionProps } from '../Option'
import DownIcon from 'naxui-icons/round/KeyboardArrowDown';
import UpIcon from 'naxui-icons/round/KeyboardArrowUp';
import { useColorTemplateColors, useInterface } from 'naxui-manager'

export type SelectProps = {
    color?: useColorTemplateColors;
    value?: string | number;
    onChange?: (value: string | number) => void;
    children: ReactElement<OptionProps> | ReactElement<OptionProps>[];
    slotProps?: {
        menu?: Omit<MenuProps, 'children' | 'target'>;
        input?: Omit<InputProps, "onChange" | "value">;
        list?: Omit<ListProps, "children">
    }
}

const _Select = ({ onChange, value, children, ...props }: SelectProps, ref: React.Ref<any>) => {
    let [{ slotProps, color }] = useInterface<any>("Select", props, {})
    color ??= "brand"

    const [target, setTarget] = useState<any>()
    const conRef = useRef()
    const { childs, selectedProps } = useMemo(() => {
        let sProps: any = {}
        const c = Children.map(children, (child: any) => {
            let selected = child.props.value === value
            if (selected) sProps = child.props
            return cloneElement(child, {
                value: undefined,
                selected,
                onClick: () => {
                    onChange && onChange(child.props.value)
                    setTarget(null)
                }
            })
        })
        return {
            childs: c,
            selectedProps: sProps as OptionProps
        }
    }, [children, value])

    const toggleMenu = () => setTarget(target ? null : conRef.current)

    return (
        <>
            <Input
                endIcon={<Stack flexDirection="row" component="span" > {(target ? <UpIcon /> : <DownIcon />)}</Stack>}
                readOnly
                value={typeof selectedProps.children === 'string' ? selectedProps.children : value}
                cursor="pointer"
                userSelect="none"
                startIcon={selectedProps.startIcon}
                focused={!!target}
                {...slotProps?.input}
                slotProps={{
                    container: {
                        cursor: "pointer",
                        userSelect: "none",
                        ...(slotProps?.input?.slotProps?.container || {}),
                        onClick: toggleMenu,
                    }
                }}
                containerRef={conRef}
                ref={ref}
            />
            <Menu
                target={target}
                placement="bottom"
                {...slotProps?.menu}
                slotProps={{
                    content: {
                        mt: .5,
                        width: conRef && (conRef?.current as any)?.clientWidth,
                        ...slotProps?.menu?.content
                    }
                }}
                onClickOutside={toggleMenu}
            >
                <List
                    {...slotProps?.list}
                >
                    {childs}
                </List>
            </Menu>
        </>
    )
}

const Select = forwardRef(_Select) as typeof _Select
export default Select