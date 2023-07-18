import React from 'react'
import DialogEmployee from "@/components/pages/Employee"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Checkbox, Chip, IconButton, Pagination, Stack, TextField, Tooltip, TableFooter } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { EmployeeApi } from "@/api/employee/endpoints"
import { Employee as TypeEmployee } from "@/api/employee/dto"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { employeeActions } from '@/store/employee';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IMAGE_URL } from '@/../app.config';
import moment from 'moment';
import PersonIcon from '@mui/icons-material/Person';
import { useQuery } from '@tanstack/react-query';
import { usePagination } from "@/global/usePagination"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TableSkeleton from '@/components/skeletons/table';

export default function Employee() {
    const [selected, setSelected] = React.useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const [searchItem, setSearchItem] = React.useState('');
    const [searchDate, setSearchDate] = React.useState('');
    const employees = useSelector<RootState>(state => state.employee.employees) as TypeEmployee[];
    const swal = withReactContent(Swal)
    const { paginate, pagination, setPagination } = usePagination(6, 1)
    const { isLoading } = useQuery(['employee'], EmployeeApi.fetchEmpolyee, {
        onSuccess: (data: { response: TypeEmployee[]; }) => {
            dispatch(employeeActions.setEmployee(data.response))
        },
    })

    function getDetails(item: TypeEmployee) {
        dispatch(employeeActions.setEmployeeDialog(true))
        EmployeeApi.getEmpolyeeDetails(item.id as string).then((data: { response: TypeEmployee }) => {
            dispatch(employeeActions.setEmployeeFormDto({ ...data.response, birthDate: moment(data.response.birthDate).format('YYYY-MM-DD') }))
        })
    }

    const handleSearch = (event: any) => {
        setSearchItem(event.target.value);
    };
    const handleFilerDate = (event: any) => {
        setSearchDate(event.target.value);
    };


    const filteredItems = employees.filter((item) => {
        return (item.fullName.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.email.toLowerCase().includes(searchItem.toLowerCase()) ||
            item.phoneNumber.toLowerCase().includes(searchItem.toLowerCase()))
    });


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = employees.map((n: any) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];
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
        setSelected(newSelected);
    };
    const deleteEmployee = () => {
        swal.fire({
            title: 'هل انت متأكد من الحذف؟ ',
            text: "لن تتمكن من التراجع عن هذا!",
            icon: 'warning',
            confirmButtonText: 'نعم',
            cancelButtonText: 'الغاء',
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if (result.isConfirmed) {
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
        })

    }
    return (
        <Box sx={{ width: '100%' }}>
            <div className='flex justify-between items-center w-full gap-5 my-5'>
                <div className='flex justify-center items-center gap-3'>

                    <PersonIcon></PersonIcon>
                    <h2 className='text-lg font-bold '>الموظفين</h2>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    {/* <TextField type='date' value={searchDate} onChange={handleFilerDate} size="small" label='تاريخ الميلاد' title='employee' sx={{ width: '300px' }} name='employeeSearch'></TextField> */}
                    <TextField value={searchItem} onChange={handleSearch} size="small" label='ابحث عن موظف' title='employee' sx={{ width: '300px' }} name='employeeSearch'></TextField>

                    <DialogEmployee></DialogEmployee>
                </div>

            </div>

            <TableContainer component={Paper} sx={{
                width: '100%',

            }}>


                {
                    selected.length > 0 ?

                        (
                            <div className='flex justify-start items-center w-full px-2 mt-2'>

                                <Tooltip title="Delete">
                                    <IconButton onClick={deleteEmployee}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>

                        ) : null

                }


                {
                    isLoading ? <TableSkeleton headers={['', 'الصورة', 'الاسم', 'رقم الموبايل', 'تاريخ الميلاد', 'تاريخ الطلبات المعالجة', 'عدد الطلبات المعالجة', 'البريد الالكتروني', 'الحالة', 'تفاصيل']} />

                        : <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                {filteredItems ? paginate(filteredItems).map((row: TypeEmployee, index: number) => {
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
                                                <img width={40} height={40} src={`${IMAGE_URL + row.imageUrl}`} alt="image employee" className='rounded-full object-cover' />
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="left">
                                                {row.fullName}
                                            </TableCell>
                                            <TableCell align="center">{row.phoneNumber}</TableCell>
                                            <TableCell align="center">{new Date(row.birthDate).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">{row.dateCreated ? new Date(row.dateCreated).toLocaleDateString() : ''} </TableCell>
                                            <TableCell align="center">{row.handledOrdersCount} </TableCell>
                                            <TableCell align="center">{row.email}</TableCell>
                                            <TableCell align="center">{row.isBlock ? <Chip label="محظور" color="error" variant='outlined' /> : <Chip label="غير محظور" color="primary" variant='outlined' />}</TableCell>
                                            <TableCell align="center">
                                                <MoreVertIcon sx={{ cursor: 'pointer' }} onClick={() => getDetails(row)} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                ) : null
                                }
                            </TableBody>
                        </Table>
                }
                <Stack spacing={2} sx={{ padding: "20px", display: 'flex ', justifyContent: 'center', alignItems: 'center' }}>

                    <Pagination count={pagination.totalPages}
                        page={pagination.pageIndex}
                        onChange={(event, page) => setPagination({ ...pagination, pageIndex: page })} />
                </Stack>
            </TableContainer>


        </Box>

    )
}

