import { Checkbox, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function TableSkeleton(props: { headers: string[] }) {
    const rowsSkeleton = ['', '', '', ''];

    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {
                        props.headers ? props.headers.map((head) => {
                            return (<TableCell key={head}>{head} </TableCell>)
                        }) : null
                    }

                </TableRow>
            </TableHead>
            <TableBody>
                {rowsSkeleton ? rowsSkeleton.map((head) => {
                    return (
                        <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                        >
                            <TableCell align="center">
                                <Skeleton width={20} height={20} variant='rectangular' />
                            </TableCell>
                            <TableCell scope="row" align="left" >
                                <Skeleton width={35} height={35} variant='circular' />
                            </TableCell>

                            <TableCell component="th" scope="row" align="left">
                                <Skeleton />
                            </TableCell>
                            <TableCell align="center">
                                <Skeleton />
                            </TableCell>
                            <TableCell align="center">
                                <Skeleton />
                            </TableCell>
                            <TableCell align="center">
                                <Skeleton />
                            </TableCell>
                            <TableCell align="center">
                                <Skeleton />
                            </TableCell>
                            <TableCell align="center">
                                <Skeleton />
                            </TableCell>
                            <TableCell align="center">
                                <Skeleton />
                            </TableCell>
                            <TableCell align="center">
                                <Skeleton />
                            </TableCell>
                        </TableRow>
                    )
                }
                ) : null
                }
            </TableBody>
        </Table>

    )
}
