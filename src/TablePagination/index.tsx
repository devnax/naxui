import Text from '../Text'
import Select, { SelectProps } from '../Select'
import Option from '../Option'
import IconButton, { IconButtonProps } from '../IconButton'
import React, { useMemo, useState } from 'react'
import PrevIcon from 'naxui-icons/round/KeyboardArrowLeft'
import NextIcon from 'naxui-icons/round/KeyboardArrowRight'
import { TagProps, Tag, useInterface, useColorTemplateColors, useColorTemplateType } from 'naxui-manager';
import { useBreakpoinPropsType } from 'naxui-manager/dist/breakpoint/useBreakpointProps'

export type TablePaginationProps = Omit<TagProps, "children"> & {
    page: number;
    total: number;
    perpages?: number[];
    color?: useBreakpoinPropsType<useColorTemplateColors>;
    variant?: useBreakpoinPropsType<useColorTemplateType>;
    onChange?: (state: { page: number, perpage: number, from: number, to: number }) => void;

    slotProps?: {
        button?: Omit<IconButtonProps, "children" | "color" | "variant">;
        select?: Omit<SelectProps, "value" | "onChange">;
    }
}

const _TablePagination = ({ page, total, onChange, ...rest }: TablePaginationProps, ref: React.Ref<any>) => {
    let [{ perpages, color, variant, slotProps, ...props }] = useInterface<any>("TablePagination", rest, {})
    color ??= "default"
    variant ??= "fill"
    perpages ??= [30, 50, 100]
    const [perpage, setPerpage] = useState(perpages[0] || 10)
    const isPerpage = perpages[0] && perpages.length >= 1

    const chunks = useMemo(() => {
        const chunks: any = [];
        let _page = 1;
        for (let from = 0; from < total; from += perpage) {
            const to = Math.min(from + perpage, total)
            chunks[_page] = { from: from + 1, to, page: _page, perpage }
            _page++
        }
        return chunks
    }, [perpage, total])

    if (!chunks.length) {
        return <></>
    }

    const current = chunks[page] || chunks[1]
    const next = chunks[page + 1]
    const prev = chunks[page - 1]
    if (!chunks[page]) {
        console.error(`Indvalid page`)
    }

    return (
        <Tag
            {...props}
            sxr={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center"
            }}
            baseClass='table-pagination'
            ref={ref}
        >
            {
                isPerpage && <Tag baseClass='table-pagination-perpage' flexBox flexRow gap={1} alignItems="center">
                    <Text fontSize="button">PER PAGE</Text>
                    <Select
                        {...slotProps?.select}
                        slotProps={{
                            ...slotProps?.select?.slotProps,
                            input: {
                                ...slotProps?.select?.slotProps?.input,
                                slotProps: {
                                    container: {
                                        minWidth: "auto"
                                    }
                                },
                                width: perpage.toString().length * 10,
                                size: "small",
                            },
                        }}
                        value={perpage}
                        onChange={(value: any) => {
                            setPerpage(value);
                            onChange && onChange(current)
                        }}
                    >
                        {perpages.map((p: number) => <Option key={p} value={p}>{p}</Option>)}
                    </Select>
                </Tag>
            }
            <Tag
                sxr={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: 'center'
                }}
            >
                <Text fontSize="button">{current?.from}-{current.to}</Text>
                <Text color="text.secondary">of</Text>
                <Text fontSize="button">{total}</Text>
            </Tag>
            <Tag baseClass='table-pagination-navigation' flexBox flexRow gap={.4} >
                <IconButton
                    {...slotProps?.button}
                    color={color}
                    variant={variant}

                    size={30}
                    disabled={!prev}
                    onClick={() => {
                        (onChange && prev) && onChange(prev)
                    }}
                >
                    <PrevIcon />
                </IconButton>
                <IconButton
                    {...slotProps?.button}
                    color={color}
                    variant={variant}
                    size={30}
                    disabled={!next}
                    onClick={() => {
                        (onChange && next) && onChange(next)
                    }}
                >
                    <NextIcon />
                </IconButton>
            </Tag>
        </Tag>
    )
}


const TablePagination = React.forwardRef(_TablePagination) as typeof _TablePagination
export default TablePagination