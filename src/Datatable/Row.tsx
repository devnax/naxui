'use client'
import React, { useState } from 'react'
import TableRow from '../TableRow'
import TableCell from '../TableCell'
import { DataTableDefaultRow, DatatablePropsWithState } from '.'
import Checkbox from '../Checkbox'
import IconButton from '../IconButton'
import List from '../List'
import ListItem from '../ListItem'
import ActionIcon from 'naxui-icons/round/MoreVert'
import Menu from '../Menu'


type Props = DatatablePropsWithState & {
    rawRow: DataTableDefaultRow;
    row: DataTableDefaultRow;
}

const Row = ({ rows, rawRow, row, rowAction, disableRow, columns, state, update }: Props) => {
    let selectesIds = state.selectedIds
    const selected = state.selectedIds.includes(row.id)
    let selectedColor = selected ? "primary.soft" : "transparent"
    const [target, setTarget] = useState<any>()
    const isDisable = (disableRow ? disableRow(rawRow, state) : false) || false

    return (
        <TableRow disabled={isDisable}>
            <TableCell width={40} bgcolor={selectedColor}>
                <Checkbox
                    checked={selected}
                    onChange={() => {
                        if (isDisable) return
                        let ids = [...selectesIds]
                        ids.includes(row.id) ? ids.splice(ids.indexOf(row.id), 1) : ids.push(row.id)
                        let selectedLength = 0
                        rows.forEach(r => {
                            const isDisable = (disableRow ? disableRow(r, state) : false) || false
                            if (!isDisable) selectedLength++
                        })

                        update({
                            selectAll: selectedLength === ids.length,
                            selectedIds: ids
                        })
                    }}
                />
            </TableCell>
            {
                columns.map(({ label, field, ...rest }, idx) => {
                    field = field || label
                    if (!row[field]) return <TableCell key={idx}></TableCell>
                    return (
                        <TableCell
                            key={idx}
                            textAlign="left"
                            {...rest}
                            bgcolor={selectedColor}
                        >
                            {row[field]}
                        </TableCell>
                    )
                })
            }
            <TableCell width={30} bgcolor={selectedColor} borderColor="divider">
                {rowAction && <>
                    <IconButton
                        size={28}
                        bgcolor="transparent"
                        disabled={isDisable || selected}
                        onClick={(e: any) => setTarget(e.currentTarget)}
                    >
                        <ActionIcon />
                    </IconButton>
                    <Menu target={target} onClickOutside={() => setTarget(null)}>
                        <List
                            bgcolor="background.primary"
                            sx={{
                                '& > li': {
                                    borderBottom: 1,
                                    '&:last-child': {
                                        borderBottom: 0
                                    }
                                }
                            }}
                        >
                            {rowAction({ row, state }).map(({ label, icon, onClick, ...bprops }) => {
                                return (
                                    <ListItem
                                        key={label}
                                        radius={0}
                                        {...bprops}
                                        startIcon={icon}
                                        onClick={(e) => {
                                            onClick && onClick(e)
                                            setTarget(null)
                                        }}
                                    >{label}</ListItem>
                                )
                            })}
                        </List>
                    </Menu>
                </>}
            </TableCell>
        </TableRow>
    )
}


export default Row