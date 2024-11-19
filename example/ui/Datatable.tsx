import React from 'react'
import Section from '../Layout/Section'
import Stack from '../../src/Stack'
import Datatable from '../../src/Datatable'
import DeleteIcon from 'naxui-icons/round/Delete'


const rows = [
    { id: 1, name: "Najrul Ahmed", email: "najrul@gmail.com" },
    { id: 2, name: "Jubayer", email: "jubayer@gmail.com" },
    { id: 3, name: "Jhon Deo", email: "jhon@gmail.com" },
    { id: 4, name: "Saad Ahmed", email: "saad@gmail.com" },
    { id: 5, name: "Mohammad Waqiu", email: "waqui@gmail.com" },
]

const Tb = () => {
    return (
        <Stack gap={2}>
            <Datatable
                rows={rows as any}
                columns={[
                    { label: "Name", field: "name" },
                    { label: "Email", field: "email" },
                ]}
                tabs={[
                    { label: "All" },
                    { label: "Actives" },
                    { label: "Deactives" }
                ]}
                rowAction={(row) => {
                    return [
                        { label: "Delete", icon: <DeleteIcon /> }
                    ]
                }}
            />
        </Stack>
    )
}

const Tables = () => {
    return (
        <Stack gap={4}>
            <Section title="Colors" gap={4}>
                <Tb
                />
            </Section>
        </Stack>
    )
}

export default Tables