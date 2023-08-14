import React from 'react'
import DialogDriver from "@/components/pages/Driver"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Checkbox, Chip, IconButton, Pagination, Stack, TextField, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DriverApi } from "@/api/driver/endpoints"
import { Driver as TypeDriver } from "@/api/driver/dto"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { driverActions } from '@/store/driver';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@mui/material/LinearProgress';
import { IMAGE_URL } from '@/../app.config';
import moment from 'moment';
import PersonIcon from '@mui/icons-material/Person';
import { useQuery } from '@tanstack/react-query';
// import { usePagination } from "@/global/usePagination"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TableSkeleton from '@/components/skeletons/table';
import { usePagination } from "@/global/usePagination"
import { Add } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

export default function Driver() {
    const [selected, setSelected] = React.useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const { paginate, pagination, setPagination } = usePagination(6, 1)
    const drivers = useSelector<RootState>(state => state.driver.drivers) as TypeDriver[];
    const swal = withReactContent(Swal)
    const navigation = useNavigate();
    // const { paginate, pagination } = usePagination()
    const { isLoading } = useQuery(['driver'], DriverApi.fetchDriver, {
        onSuccess: (data: { response: TypeDriver[]; }) => {
            dispatch(driverActions.setDriver([
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "name": "Nasser Nassan",
                    "phoneNumber": "0939844573",
                    "isAvailable": true,
                    "birthDate": "2023-08-14T23:17:46.931Z",
                    "orderCount": 2
                },
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "name": "Ahmad Hader",
                    "phoneNumber": "0947484346",
                    "isAvailable": true,
                    "birthDate": "2023-08-14T23:17:46.931Z",
                    "orderCount": 3
                },
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "name": "Baraa Nayyal",
                    "phoneNumber": "0947645523",
                    "isAvailable": true,
                    "birthDate": "2023-08-14T23:17:46.931Z",
                    "orderCount": 0
                },
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "name": "Taym Khalil",
                    "phoneNumber": "09884526233",
                    "isAvailable": true,
                    "birthDate": "2023-08-14T23:17:46.931Z",
                    "orderCount": 0
                },
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "name": "Najeb Hallak",
                    "phoneNumber": "0937524326",
                    "isAvailable": true,
                    "birthDate": "2023-08-14T23:17:46.931Z",
                    "orderCount": 0
                }
            ]
            ))
        },
    })

    // function getDetails(item: TypeDriver) {
    //     dispatch(driverActions.setDriverDialog(true))
    //     DriverApi.getDriverDetails(item.id as string).then((data: { response: TypeDriver }) => {
    //         dispatch(driverActions.setDriverDto({ ...data.response, birthDate: moment(data.response.birthDate).format('YYYY-MM-DD') }))
    //     })
    // }


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = drivers.map((n: any) => n.name);
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
    const deleteDriver = () => {
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
                DriverApi.DeleteDriver(selected).then(() => {
                    dispatch(driverActions.deleteDriver(selected))
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
                    <h2 className='text-lg font-bold '>السائقين</h2>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <TextField size="small" label='ابحث عن السائق' title='employee' sx={{ width: '300px' }} name='employeeSearch'></TextField>
                    {/* onClick={() => navigation('/driver/0')} */}
                    <Link to='/driver/0'>
                        <Button variant="contained" >
                            إضافة سائق
                            <Add></Add>
                        </Button>
                    </Link>

                    {/* <DialogDriver></DialogDriver> */}
                </div>

            </div>


            <TableContainer component={Paper} sx={{
                width: '100%'
            }}>


                {
                    selected.length > 0 ?

                        (
                            <div className='flex justify-start items-center w-full px-2 mt-2'>

                                <Tooltip title="Delete">
                                    <IconButton onClick={deleteDriver}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>

                        ) : null

                }

                {
                    isLoading ? <TableSkeleton headers={['الاسم', 'رقم الموبايل', 'تاريخ الميلاد', 'عدد الطلبات المستلمة', 'حالة الاتاحة', 'حالة', 'تفاصيل']} /> :

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
                                    <TableCell align="center">تاريخ الميلاد</TableCell>
                                    <TableCell align="center">عدد الطلبات المستلمة</TableCell>
                                    <TableCell align="center">حالة الاتاحة</TableCell>
                                    <TableCell align="center">حالة </TableCell>

                                    <TableCell align="center">تفاصيل</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {drivers ? paginate(drivers).map((row: TypeDriver, index: number) => {
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
                                            {/* <TableCell component="th" scope="row" align="left">
                                                <img width={40} height={40} src={`${IMAGE_URL + row.imageUrl}`} alt="image employee" className='rounded-full object-cover' />
                                            </TableCell> */}

                                            <TableCell component="th" scope="row" align="left">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.phoneNumber}</TableCell>
                                            <TableCell align="center">{new Date(row.birthDate).toLocaleDateString()}</TableCell>
                                            <TableCell align="center">{row.orderCount} </TableCell>
                                            <TableCell align="center">{row.isAvailable ? <Chip label="متاح" color="secondary" variant='outlined' /> : <Chip label="غير متاح" color="primary" variant='outlined' />}</TableCell>
                                            <TableCell align="center">{row.isBlock ? <Chip label="محظور" color="error" variant='outlined' /> : <Chip label="غير محظور" color="primary" variant='outlined' />}</TableCell>
                                            <TableCell align="center">
                                                <MoreVertIcon onClick={() => navigation(`/drivers/${row.id}`)} />
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

