'use client'
import React, { ReactElement, useState } from 'react'
import { TableColumnProps } from '../TableCell'
import { IconButtonProps } from '../IconButton'
import { InputProps } from '../Input'
import ViewBox from '../ViewBox'
import { Tag, useInterface } from 'naxui-manager';
import SelectedBox from './SelectedBox'
import TableArea from './Table'
import FilterBox from './FilterBox'
import TablePagination, { TablePaginationProps } from '../TablePagination'
import Stack from '../Stack'
import { TableProps } from '../Table'


export type ColumnType = (Omit<TableColumnProps, "children"> & { label: string, field?: string })
export type DataTableDefaultRow = { id: number, [key: string | number]: any }
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

export type DatatableProps = {
    rows: DataTableDefaultRow[];
    columns: ColumnType[];
    tabs?: TabsProps[];
    defaultActiveTab?: string;
    rowAction?: (props: { row: DataTableDefaultRow | null, state: State }) => RowActionType[];
    renderRow?: (row: DataTableDefaultRow, state: State) => DataTableDefaultRow;
    disableRow?: (row: DataTableDefaultRow, state: State) => boolean | void;
    totalCount?: number;
    page?: number;
    perpages?: number[];
    getState?: (state: State) => void;
    onSearch?: (text: string, state: State) => void;
    onTabChange?: (tab: string, state: State) => void;
    filters?: { [key: string]: DatatableFilter[] }
    fixedHeader?: boolean;
    disablePagination?: boolean;
    disableSearch?: boolean;
    disableSelect?: boolean;
    slotProps?: {
        search?: Omit<InputProps, "value" | "onChange">;
        table?: Omit<TableProps, 'children'>;
        pagination?: TablePaginationProps;
    }
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
    let [_props] = useInterface<any>("Datatable", props, {})
    let {
        rows,
        tabs,
        defaultActiveTab,
        totalCount,
        page,
        perpages,
        getState,

        fixedHeader,
        disablePagination,
        slotProps,
    } = _props

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
            ref={ref as any}
            height="100%"
            sx={{
                '& thead': fixedHeader ? {
                    position: "sticky",
                    top: 0,
                    bgcolor: "background.primary",
                    zIndex: 1
                } : {},
            }}
            startContent={(
                <Tag
                    baseClass='datatable-header'
                    sxr={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <SelectedBox {..._props} update={update} state={state} />
                    <FilterBox {..._props} update={update} state={state} />
                </Tag>
            )}
        >
            <TableArea
                {..._props}
                update={update}
                state={state}
            />
            <Stack
                p={1}
                alignItems="flex-end"
            >
                {!disablePagination && <TablePagination
                    {...slotProps?.pagination}
                    total={totalCount || rows.length}
                    page={state.paginationState.page}
                    perpages={perpages}
                    onChange={(state: any) => {
                        update({ paginationState: state })
                    }}
                />}
            </Stack>
        </ViewBox>
    )
}

const DataTable = React.forwardRef(_DataTable) as typeof _DataTable
export default DataTable