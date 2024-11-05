import React from 'react'
import Section from '../Layout/Section'
import Stack from '../../src/Stack'
import Table, { TableProps } from '../../src/Table'
import TableHead from '../../src/TableHead'
import TableFooter from '../../src/TableFooter'
import TableBody from '../../src/TableBody'
import TableRow from '../../src/TableRow'
import TableCell from '../../src/TableCell'
import TablePagination from '../../src/TablePagination'

const data = [
    { name: "Najrul Ahmed", email: "najrul@gmail.com" },
    { name: "Jubayer", email: "jubayer@gmail.com" },
    { name: "Jhon Deo", email: "jhon@gmail.com" },
    { name: "Saad Ahmed", email: "saad@gmail.com" },
    { name: "Mohammad Waqiu", email: "waqui@gmail.com" },
]

const Tb = (props: TableProps) => {
    return (
        <Stack gap={2}>
            <Table {...props}>
                <TableHead >
                    <TableRow>
                        <TableCell th>Id</TableCell>
                        <TableCell th>Name</TableCell>
                        <TableCell th>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((d, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{d.name}</TableCell>
                                    <TableCell>{d.email}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell th>Id</TableCell>
                        <TableCell th>Name</TableCell>
                        <TableCell th>Email</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <Stack
                flexRow
                justifyContent="flex-end"
            >
                <TablePagination
                    total={5000}
                    page={2}
                />
            </Stack>
        </Stack>
    )
}

const Tables = () => {
    return (
        <Stack gap={4}>
            <Section title="Colors" gap={4}>
                <Tb
                    color="brand"
                    variant="alpha"
                />
                <Tb
                    color="brand"
                    evenColor
                />
            </Section>
            <Section title="Border" gap={4}>
                <Tb
                />
                <Tb
                    borderType='box'
                />
            </Section>
        </Stack>
    )
}

export default Tables