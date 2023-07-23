'use client'
import React, { ReactElement, useMemo, cloneElement, useState, Children, forwardRef, useRef } from 'react'
import Input, { InputProps } from '../Input'
import List from '../List'
import Menu, { MenuProps } from '../Menu'
import Stack from '../Stack'
import { OptionProps } from '../Option'
import DownIcon from 'naxui-icons/round/KeyboardArrowDown';
import UpIcon from 'naxui-icons/round/KeyboardArrowUp';


export type SelectProps = InputProps & {
    value?: any;
    onChange?: (item: OptionProps) => void;
    menuProps?: Omit<MenuProps, 'children'>;
    children: ReactElement<OptionProps> | ReactElement<OptionProps>[]
}

const Select = ({ onChange, value, menuProps, children, ...inputProps }: SelectProps, ref: React.Ref<any>) => {
    const [target, setTarget] = useState<any>()
    const conRef = useRef()
    const { childs, selectedProps } = useMemo(() => {
        let sProps: any = {}
        const c = Children.map(children, (child: any) => {
            let selected = child.props.value === value
            if (selected) {
                sProps = child.props
            }
            return cloneElement(child, {
                selected,
                onClick: () => {
                    onChange && onChange(child.props.value)
                }
            })
        })
        return {
            childs: c,
            selectedProps: sProps as OptionProps
        }
    }, [children, value])

    return (
        <>
            <Input
                baseClass='select-input'
                endIcon={<Stack flexDirection="row" component="span" > {(target ? <UpIcon /> : <DownIcon />)}</Stack>}
                readOnly
                value={value}
                cursor="pointer"
                userSelect="none"
                startIcon={selectedProps.startIcon}
                focused={!!target}
                containerRef={conRef}
                containerProps={{
                    cursor: "pointer",
                    userSelect: "none",
                    onClick: () => {
                        setTarget(conRef.current)
                    }
                }}
                {...inputProps}
                onFocus={(e: any) => {
                    setTarget(conRef.current)
                    inputProps.onFocus && inputProps.onFocus(e)
                }}
                onBlur={(e) => {
                    setTarget(null)
                    inputProps.onBlur && inputProps.onBlur(e)
                }}
                ref={ref}
            />
            <Menu
                baseClass='select-menu'
                target={target}
                placement="bottom"
                width={target?.clientWidth || 0}
                transition="fadeInUp"
                mt={.5}
                {...menuProps}
            >
                <List
                    sx={{
                        '& > *': {
                            mb: 0
                        }
                    }}
                >
                    {childs}
                </List>
            </Menu>
        </>
    )
}

export default forwardRef(Select) as typeof Select