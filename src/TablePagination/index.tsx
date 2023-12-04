import Text from '../Text'
import Select from '../Select'
import Option from '../Option'
import IconButton from '../IconButton'
import React, { useMemo, useState } from 'react'
import PrevIcon from 'naxui-icons/round/KeyboardArrowLeft'
import NextIcon from 'naxui-icons/round/KeyboardArrowRight'
import { TagProps, Tag } from 'naxui-manager';

export type TablePaginationProps = Omit<TagProps, "children"> & {
    page: number;
    total: number;
    perpages?: number[];
    onChange?: (state: { page: number, perpage: number, from: number, to: number }) => void;
}

const _TablePagination = ({ page, total, perpages, onChange, ...rootProps }: TablePaginationProps, ref: React.Ref<any>) => {
    perpages = perpages || [30, 50, 100]
    const [perpage, setPerpage] = useState(perpages[0] || 10)
    const isPerpage = perpages[0] && perpages.length >= 1

    const chunks = useMemo(() => {
        const chunks: any = {};
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
            flexBox
            flexRow
            gap={8}
            alignItems="center"
            {...rootProps}
            baseClass='table-pagination-root'
            ref={ref}
        >
            {
                isPerpage && <Tag baseClass='table-pagination-perpage' flexBox flexRow gap={8} alignItems="center">
                    <Text fontSize="fontsize.button">PER PAGE</Text>
                    <Select
                        className='table-pagination-perpage-select'
                        fontSize="fontsize.button"
                        containerProps={{
                            width: 70,
                            minWidth: "auto"
                        }}
                        py={.8}
                        px={.4}
                        textAlign="center"
                        menuProps={{
                            minWidth: "auto",
                        }}
                        value={perpage}
                        onChange={(value: any) => {
                            setPerpage(value);
                            onChange && onChange(current)
                        }}
                    >
                        {perpages.map(p => <Option key={p} value={p}>{p}</Option>)}
                    </Select>
                </Tag>
            }
            <Text fontSize="fontsize.button">{current?.from}-{current.to} of {total}</Text>
            <Tag baseClass='table-pagination-prev-next' flexBox flexRow gap={4} >
                <IconButton
                    color="paper"
                    size={30}
                    disabled={!prev}
                    onClick={() => {
                        (onChange && prev) && onChange(prev)
                    }}
                >
                    <PrevIcon />
                </IconButton>
                <IconButton
                    color="paper"
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