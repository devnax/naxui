'use client'
import React from 'react'
import TableHead from './TableHead'
import Table from '../Table'
import TableBody from '../TableBody'
import Row from './Row'
import { DatatablePropsWithState } from '.'

const TableArea = (props: DatatablePropsWithState) => {
   let {
      rows,
      renderRow,
      state,
      update,
      slotProps
   } = props

   return (
      <Table width="100%" border={1} {...slotProps?.table}>
         <TableHead {...props} update={update} state={state} />
         <TableBody
            sx={{
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
   )
}

export default TableArea