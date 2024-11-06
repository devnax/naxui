'use client'
import React, { ReactElement, useState } from 'react'
import { TableColumnProps } from '../TableCell'
import { IconButtonProps } from '../IconButton'
import Stack from '../Stack'
import TablePagination from '../TablePagination'
import TableHead from './TableHead'
import Table, { TableProps } from '../Table'
import TableBody from '../TableBody'
import Row from './Row'
import Tab from '../Tab'
import Tabs from '../Tabs'
import Input, { InputProps } from '../Input'
import IconSearch from 'naxui-icons/round/Search'
import Select from '../Select'
import Option from '../Option'
import ViewBox, { ViewBoxProps } from '../ViewBox'
import { Tag, TagProps } from 'naxui-manager';


export type ColumnType = (Omit<TableColumnProps, "children"> & { label: string, field?: string })
export type DataTableDefaultRow = { [key: string | number]: any }
export type RowActionType = Omit<IconButtonProps, "children"> & {
    label: string;
    icon: ReactElement;
}
export type TabsProps = {
    label: string;
    value?: string
}
export type DatatableFilter = {
    label: string;
    value: string | number
}

export type DatatableProps = Omit<ViewBoxProps, 'children' | "header"> & {
    rows: DataTableDefaultRow[];
    columns: ColumnType[];
    tabs?: TabsProps[];
    defaultActiveTab?: string;
    rowAction?: (props: { row: DataTableDefaultRow | null, state: State }) => RowActionType[];
    renderRow?: (row: DataTableDefaultRow, state: State) => DataTableDefaultRow;
    disableRow?: (row: DataTableDefaultRow, state: State) => boolean | void;
    total_count?: number;
    page?: number;
    perpages?: number[];
    getState?: (state: State) => void;
    onSearch?: (text: string, state: State) => void;
    onTabChange?: (tab: string, state: State) => void;
    headerContent?: ReactElement;
    fixedHeader?: boolean;
    hideSearch?: boolean;
    hidePagination?: boolean;
    filters?: { [key: string]: DatatableFilter[] }

    // Props
    searchProps?: Omit<InputProps, "value" | "onChange">;
    tableProps?: TableProps;
    headerProps?: Omit<TagProps, "children">;

}

export type State = {
    selectedIds: number[];
    selectAll: boolean;
    paginationState: {
        page: number,
        perpage: number
    },
    activeTab: string;
    search: string;
}

export type DatatablePropsWithState = DatatableProps & {
    state: State,
    update: (state: Partial<State>) => void;
}

const _DataTable = (props: DatatableProps, ref: React.Ref<HTMLDivElement>) => {
    let {
        rows,
        renderRow,
        tabs,
        defaultActiveTab,
        filters,
        total_count,
        page,
        perpages,
        getState,
        onSearch,
        onTabChange,
        headerContent,
        hidePagination,
        hideSearch,
        fixedHeader,

        headerProps,
        searchProps,
        tableProps,

        ...viewboxProps
    } = props
    const [state, setState] = useState<State>({
        selectedIds: [],
        selectAll: false,
        paginationState: {
            page: page || 1,
            perpage: perpages ? perpages[0] : 30
        },
        activeTab: tabs ? (defaultActiveTab || tabs[0].value || tabs[0].label.toLowerCase()) : "",
        search: ""
    })

    const update = (s: Partial<State>) => {
        setState(o => {
            let ns = { ...o, ...s }
            getState && getState(ns)
            return ns
        })
    }

    return (
        <ViewBox
            baseClass='datatable'
            ref={ref}
            height="100%"
            {...viewboxProps}
            sxr={{
                '& thead': fixedHeader ? {
                    position: "sticky",
                    top: 0,
                    bgcolor: "background.primary",
                    zIndex: 1
                } : {},
                ...((viewboxProps as any)?.sx || {})
            }}
            header={(
                <Tag
                    flexBox
                    p={1}
                    flexRow
                    justifyContent="space-between"
                    alignItems="center"
                    {...headerProps}
                    baseClass='datatable-header'
                >
                    <Stack className='datatable-header-left-area' gap={2.4} flexRow>
                        {
                            tabs && <Tabs
                                onChange={(value: any) => {
                                    update({ activeTab: value })
                                    onTabChange && onTabChange(value, state)
                                }}
                                value={state.activeTab}
                            >
                                {
                                    tabs.map(t => <Tab key={t.label} value={t.value || t.label.toLowerCase()}>{t.label}</Tab>)
                                }
                            </Tabs>
                        }
                    </Stack>
                    <Stack className='datatable-header-filter-area' flex={1} flexRow>
                        {headerContent}
                        {
                            filters && <Stack flexRow gap={2} px={2}>
                                {
                                    Object.keys(filters).map(name => {
                                        const items: DatatableFilter[] = (filters as any)[name]
                                        return (
                                            <Select
                                                key={name}
                                                placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                                                p={1}
                                                containerProps={{
                                                    minWidth: 100
                                                }}
                                                value={(state as any)[name] || ""}
                                                onChange={(value) => {
                                                    update({ [name]: value } as any)
                                                }}
                                            >
                                                {
                                                    items.map((item) => <Option key={name + item.value} value={item.value}>
                                                        {item.label}
                                                    </Option>)
                                                }
                                            </Select>
                                        )
                                    })
                                }
                            </Stack>
                        }
                    </Stack>
                    <Stack flexRow gap={2} className='datatable-header-right-area'>
                        {!hidePagination && <TablePagination
                            total={total_count || rows.length}
                            page={state.paginationState.page}
                            perpages={perpages}
                            onChange={(state: any) => {
                                update({ paginationState: state })
                            }}
                        />}
                        {!hideSearch && <Input
                            endIcon={<IconSearch />}
                            p={1}
                            placeholder='Search...'
                            {...searchProps}
                            value={state.search}
                            onChange={(e: any) => {
                                update({ search: e.target.value })
                                onSearch && onSearch(e.target.value, state)
                            }}
                        />}
                    </Stack>
                </Tag>
            )}
        >
            <Table width="100%" dense className='datatable-table' {...tableProps}>
                <TableHead {...props} update={update} state={state} />
                <TableBody
                    sxr={{
                        '& tr:last-child td': {
                            borderBottom: 0
                        }
                    }}
                >
                    {
                        rows?.map((row, idx) => {
                            let _row = renderRow ? renderRow({ ...row }, state) : row
                            return <Row
                                key={row.id + idx}
                                rawRow={row}
                                row={_row}
                                {...props}
                                update={update}
                                state={state}
                            />
                        })
                    }
                </TableBody>
            </Table>
        </ViewBox>
    )
}

const DataTable = React.forwardRef(_DataTable) as typeof _DataTable
export default DataTable