import React from 'react'
import DialogComponent from "@/components/shared/Dialog"
import SearchText from '@/components/shared/Filter';
import DialogEmployee from "@/components/pages/Employee"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Checkbox, IconButton, Pagination, Stack, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from "@tanstack/react-query";
import { EmployeeApi } from "@/api/auth/endpoints"
import { GetEmployee } from "@/api/auth/dto"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { employeeActions } from '@/store/employee';


const DEFAULT_ROWS_PER_PAGE = 5;

export default function Employee() {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    const dispatch = useDispatch<AppDispatch>()
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [page, setPage] = React.useState(0);
    const stateEmployee = useSelector<RootState>(state => state.employee.employees);
    console.log(stateEmployee);

    const { data: employees } = useQuery(['employee'], EmployeeApi.fetchEmpolyee, {
        onSuccess: (data) => {
            dispatch(employeeActions.setEmployee(data))
        }
    })

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = employees.map((n: any) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>

                <TableContainer component={Paper} sx={{
                    width: '100%'
                }}>
                    <div className='flex justify-between items-center w-full gap-5 p-5 pb-3 '>
                        <SearchText label='ابحث عن موظف' text='employee' list={employees} filterList={((e) => console.log(e)
                        )}></SearchText>

                        <DialogComponent isOpen={openDialog} setIsOpen={setOpenDialog} textDialog="اضافة موظف"
                            textBtn="اضافة موظف"
                            content={
                                <DialogEmployee isOpenDialog={openDialog} />
                            }
                        ></DialogComponent>


                    </div>
                    {
                        selected.length > 0 ?

                            (
                                <div className='flex justify-end items-center w-full px-2'>

                                    <Tooltip title="Delete">
                                        <IconButton>
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
                                <TableCell>الاسم</TableCell>
                                <TableCell align="center">رقم الموبايل</TableCell>
                                <TableCell align="center">البريد الالكتروني</TableCell>
                                <TableCell align="center">تاريخ الميلاد</TableCell>
                                <TableCell align="center">الطلبات المعالجة</TableCell>
                                <TableCell align="center">الحالة</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees ? employees.map((row: GetEmployee, index: number) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
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
                                            {row.fullName}
                                        </TableCell>
                                        <TableCell align="center">{row.phoneNumber}</TableCell>
                                        <TableCell align="center">{row.email}</TableCell>
                                        <TableCell align="center">{new Date(row.dateCreated).toLocaleDateString()}</TableCell>
                                        <TableCell align="center">{row.orderHandledCount}</TableCell>
                                        <TableCell align="center">{row.isBlocked ? 'block' : 'unblock'}</TableCell>
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

