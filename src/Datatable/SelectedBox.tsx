'use client'
import React from 'react'
import IconButton from '../IconButton'
import Stack from '../Stack'
import Text from '../Text'
import { DatatablePropsWithState } from '.'

const SelectedBox = (props: DatatablePropsWithState) => {
   let {
      state,
      rowAction
   } = props

   let selected = state.selectedIds
   let checked = state.selectAll || !!selected.length

   if (!checked) return <></>

   return (
      <Stack
         bgcolor="background.secondary"
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         zIndex={1}
         radius={1}
         mb={1}
         height={50}
         width="100%"
         px={1.5}
      >
         <Text fontWeight={600}>Selected: {selected.length}</Text>
         <Stack
            flexRow
            gap={1}
         >
            {rowAction && rowAction({ row: null, state }).map(({ label, icon, ...bprops }) => {
               return (
                  <IconButton
                     key={label}
                     variant="alpha"
                     color="brand"
                     {...bprops}
                  >
                     {icon}
                  </IconButton>
               )
            })}
         </Stack>
      </Stack>
   )
}

export default SelectedBox