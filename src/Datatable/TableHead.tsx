'use client'
import React from 'react'
import TableHead from '../TableHead'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import { DatatablePropsWithState } from '.'
import Checkbox from '../Checkbox'
import IntermidiatIcon from 'naxui-icons/round/IndeterminateCheckBox'


const TableHeadRender = ({ columns, rows, disableRow, disableSelect, state, update }: DatatablePropsWithState) => {
    if (!columns.length) return <></>
    let selected = state.selectedIds
    let checked = state.selectAll || !!selected.length

    return (
        <TableHead position="relative">
            <TableRow bgcolor="default" borderBottom={1} >
                {!disableSelect && <TableCell th width={40}>
                    <Checkbox
                        checkIcon={selected.length && !state.selectAll ? <IntermidiatIcon /> : undefined}
                        checked={checked}
                        onChange={() => {
                            let ids: any = []
                            rows.forEach(row => {
                                const isDisable = (disableRow ? disableRow(row, state) : false) || false
                                if (!isDisable) {
                                    ids.push(row.id)
                                }
                            })

                            update({
                                selectedIds: state.selectAll ? [] : ids,
                                selectAll: !state.selectAll
                            })
                        }}
                    />
                </TableCell>}
                {
                    columns.map(({ label, field: _f, ...rest }, idx) => <TableCell key={idx} th textAlign="left" {...rest}>{label}</TableCell>)
                }
                <TableCell th width={30}>

                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default TableHeadRender
