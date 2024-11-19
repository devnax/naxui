'use client'
import React from 'react'
import Stack from '../Stack'
import { DatatableFilter, DatatablePropsWithState } from '.'
import Tabs from '../Tabs'
import Tab from '../Tab'
import Select from '../Select'
import Option from '../Option'
import Input from '../Input'
import IconSearch from 'naxui-icons/round/Search'


const FilterBox = (props: DatatablePropsWithState) => {
   let {
      tabs,
      filters,
      onSearch,
      onTabChange,
      disableSearch,
      slotProps,
      state,
      update,
   } = props

   let selected = state.selectedIds
   let checked = state.selectAll || !!selected.length

   if (checked) return <></>

   return (
      <Stack
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         zIndex={1}
         radius={1}
         mb={1}
         height={50}
         width="100%"
      >
         <Stack gap={2.4} flexRow>
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
            {
               filters && <Stack flexRow gap={2} px={2}>
                  {
                     Object.keys(filters).map(name => {
                        const items: DatatableFilter[] = (filters as any)[name]
                        return (
                           <Select
                              key={name}
                              placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
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

            {!disableSearch && <Input
               endIcon={<IconSearch />}
               p={1}
               placeholder='Search...'
               {...slotProps?.search}
               value={state.search}
               onChange={(e: any) => {
                  update({ search: e.target.value })
                  onSearch && onSearch(e.target.value, state)
               }}
            />}
         </Stack>
      </Stack>
   )
}

export default FilterBox