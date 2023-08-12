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
    value?: string | number;
    onChange?: (item: OptionProps) => void;
    menuProps?: Omit<MenuProps, 'children' | 'target'>;
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
                baseClass='select-input'
                endIcon={<Stack flexDirection="row" component="span" > {(target ? <UpIcon /> : <DownIcon />)}</Stack>}
                readOnly
                value={value}
                cursor="pointer"
                userSelect="none"
                startIcon={selectedProps.startIcon}
                focused={!!target}
                {...inputProps}
                containerProps={{
                    cursor: "pointer",
                    userSelect: "none",
                    ...(inputProps.containerProps || {}),
                    onClick: toggleMenu,
                }}
                containerRef={conRef}
                ref={ref}
            />
            <Menu
                baseClass='select-menu'
                target={target}
                placement="bottom"
                width={conRef && (conRef?.current as any)?.clientWidth}
                mt={.5}
                {...menuProps}
                onClickOutside={toggleMenu}
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