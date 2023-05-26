import React, { useEffect } from 'react'
import DialogEmployee from "@/components/pages/Employee"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Checkbox, Chip, IconButton, Pagination, Stack, TextField, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from "@tanstack/react-query";
import { EmployeeApi } from "@/api/employee/endpoints"
import { AddEmployee, GetEmployee } from "@/api/employee/dto"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { employeeActions } from '@/store/employee';
import { Add, Close } from '@mui/icons-material';

import { IMAGE_URL } from '@/../app.config';

const DEFAULT_ROWS_PER_PAGE = 5;

export default function Employee() {

    const [employee, setEmployee] = React.useState<GetEmployee>();
    const [selected, setSelected] = React.useState<string[]>([]);
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const dispatch = useDispatch<AppDispatch>()
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [page, setPage] = React.useState(0);
    let employees = useSelector<RootState>(state => state.employee.employees) as GetEmployee[];


    function getEmployees() {
        EmployeeApi.fetchEmpolyee().then((data: { response: GetEmployee[]; }) => {
            console.log(data);
            dispatch(employeeActions.setEmployee(data.response))

        })
    }

    useEffect(() => {
        getEmployees();
    }, [])


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = employees.map((n: any) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected([id]);
    };
    const deleteEmployee = () => {
        EmployeeApi.DeleteEmpolyee(selected).then(() =>
            employees = employees.filter(ele => !selected.includes(ele.id))
        )
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>

                <TableContainer component={Paper} sx={{
                    width: '100%'
                }}>
                    <div className='flex justify-between items-center w-full gap-5 p-5 pb-3 '>
                        <TextField label='ابحث عن موظف' title='employee' name='employeeSearch'></TextField>
                        <DialogEmployee></DialogEmployee>

                    </div>
                    {
                        selected.length > 0 ?

                            (
                                <div className='flex justify-end items-center w-full px-2'>

                                    <Tooltip title="Delete">
                                        <IconButton onClick={deleteEmployee}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                            ) : null

                    }
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>الصورة</TableCell>
                                <TableCell>الاسم</TableCell>
                                <TableCell align="center">رقم الموبايل</TableCell>
                                <TableCell align="center">تاريخ الميلاد</TableCell>
                                <TableCell align="center">تاريخ الطلبات المعالجة</TableCell>
                                <TableCell align="center">عدد الطلبات المعالجة</TableCell>
                                <TableCell align="center">البريد الالكتروني</TableCell>
                                <TableCell align="center">الحالة</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees ? employees.map((row: GetEmployee, index: number) => {
                                const isItemSelected = isSelected(row.id ? row.id : '');

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id ? row.id : '')}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                color="primary"
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">
                                            {/* {IMAGE_URL + row.imageUrl}d */}
                                            <img width={30} height={30} src={`${IMAGE_URL + row.imageUrl}`} alt="image employee" />
                                            {/* {IMAGE_URL + row.imageUrl}
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: 30,
                                                    width: 30,
                                                }}
                                                alt="The house from the offer."
                                                src={`${IMAGE_URL + row.imageUrl}`}
                                            /> */}
                                        </TableCell>

                                        <TableCell component="th" scope="row" align="left">
                                            {row.fullName}
                                        </TableCell>
                                        <TableCell align="center">{row.phoneNumber}</TableCell>
                                        <TableCell align="center">{new Date(row.birthDate).toLocaleDateString()}</TableCell>
                                        <TableCell align="center">{new Date(row.dateCreated ? row.dateCreated : '').toLocaleDateString()} </TableCell>
                                        <TableCell align="center">{row.handledOrdersCount} </TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{row.isBlock ? <Chip label="محظور" color="error" variant='outlined' /> : <Chip label="غير محظور" color="primary" variant='outlined' />}</TableCell>
                                    </TableRow>
                                )
                            }
                            ) : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} sx={{ padding: "20px", display: 'flex ', justifyContent: 'center', alignItems: 'center' }}>
                    <Pagination count={10} />
                </Stack>
            </Paper>
        </Box>

    )
}

