'use client'
import React from 'react'
import TableHead from '../TableHead'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import { DatatablePropsWithState } from '.'
import Checkbox from '../Checkbox'
import IconButton from '../IconButton'
import Text from '../Text'
import Stack from '../Stack'
import IntermidiatIcon from 'naxui-icons/round/IndeterminateCheckBox'


const TableHeadRender = ({ columns, rows, rowAction, disableRow, state, update }: DatatablePropsWithState) => {
    if (!columns.length) return <></>
    let selected = state.selectedIds
    let checked = state.selectAll || !!selected.length

    return (
        <TableHead position="relative">
            <TableRow bgcolor="color.paper" borderBottom={1} >
                <TableCell th width={40}>
                    {
                        (checked) && <Stack
                            bgcolor="color.paper"
                            position='absolute'
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            p={1}
                        >
                            <Stack pl={4}>
                                <Text fontWeight={600}>Selected: {selected.length}</Text>
                            </Stack>
                            <Stack
                                flexRow
                                gap={8}
                            >
                                {rowAction && rowAction({ row: null, state }).map(({ label, icon, ...bprops }) => {
                                    return (
                                        <IconButton
                                            key={label}
                                            size={28}
                                            variant="text"
                                            sx={{
                                                '& svg': {
                                                    fontSize: 20
                                                }
                                            }}

                                            {...bprops}
                                        >
                                            {icon}
                                        </IconButton>
                                    )
                                })}
                            </Stack>
                        </Stack>
                    }
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
                </TableCell>
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
