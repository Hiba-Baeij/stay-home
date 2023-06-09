import React, { useEffect } from 'react'
import DialogEmployee from "@/components/pages/Employee"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Checkbox, Chip, IconButton, Pagination, Stack, TextField, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { EmployeeApi } from "@/api/employee/endpoints"
import { Employee as TypeEmployee } from "@/api/employee/dto"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { employeeActions } from '@/store/employee';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@mui/material/LinearProgress';
import { IMAGE_URL } from '@/../app.config';
import moment from 'moment';
const DEFAULT_ROWS_PER_PAGE = 5;

export default function Employee() {
    const [selected, setSelected] = React.useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const employeeDto = useSelector<RootState>(state => state.employee.employeeDto) as TypeEmployee;
    const employees = useSelector<RootState>(state => state.employee.employees) as TypeEmployee[];

    useEffect(() => {
        getEmployees();
    }, [])

    function getEmployees() {
        setIsLoading(true);
        EmployeeApi.fetchEmpolyee().then((data: { response: TypeEmployee[]; }) => {
            console.log(data);
            dispatch(employeeActions.setEmployee(data.response))
            setIsLoading(false)

        }).catch(() => setIsLoading(false))
    }

    function getDetails(item: TypeEmployee) {
        dispatch(employeeActions.setEmployeeDialog(true))
        EmployeeApi.getEmpolyeeDetails(item.id as string).then((data: { response: TypeEmployee }) => {
            console.log(data);
            dispatch(employeeActions.setEmployeeFormDto({ ...data.response, birthDate: moment(data.response.birthDate).format('YYYY-MM-DD') }))
        })
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = employees.map((n: any) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (id: string) => {
        // setSelected();
        console.log(id);

        // setSelected(prevVal => [...prevVal, id]);
        // console.log(selected);

        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];
        console.log(selectedIndex);

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
            console.log(newSelected);

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
        setSelected(newSelected);
        console.log(selected);
    };
    const deleteEmployee = () => {
        EmployeeApi.DeleteEmpolyee(selected).then(() => {
            dispatch(employeeActions.deleteEmployee(selected))
            toast('تمت الحذف بنجاح', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
                type: 'success'
            })
        }
        )
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {
                    isLoading ?
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box> : null
                }
                {/* {JSON.stringify(employees)} */}
                {selected}
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
                                <TableCell align="center">تفاصيل</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees ? employees.map((row: TypeEmployee, index: number) => {


                                // onClick={(event) => handleClick(event, row.id ? row.id : '')}
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}

                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onChange={() => handleClick(row.id ? row.id : '')}

                                                color="primary"
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">
                                            <img width={50} src={`${IMAGE_URL + row.imageUrl}`} alt="image employee" className='rounded-full object-cover' />
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
                                        <TableCell align="center">
                                            <MoreVertIcon onClick={() => getDetails(row)} />
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            ) : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} sx={{ padding: "20px", display: 'flex ', justifyContent: 'center', alignItems: 'center' }}>
                    {page}
                    <Pagination count={10} page={page} onChange={handleChangePage} />
                </Stack>
            </Paper>
        </Box>

    )
}

