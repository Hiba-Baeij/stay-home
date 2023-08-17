import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Checkbox, Chip, IconButton, Pagination, Stack, TextField, Tooltip, TableFooter, Divider, Dialog, DialogTitle, DialogContent, InputLabel, Select, MenuItem, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { OrderApi } from "@/api/order/endpoints"
import { Order as TypeOrder, OrderDetails } from "@/api/order/dto"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { orderActions } from '@/store/order';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Close } from '@mui/icons-material';

export default function Order() {
    const [selected, setSelected] = React.useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const [searchItem, setSearchItem] = React.useState('');
    const orders = useSelector<RootState>(state => state.order.orders) as TypeOrder[];
    const isOpen = useSelector<RootState>(state => state.order.openDialogOrder) as boolean;

    const swal = withReactContent(Swal)
    const { paginate, pagination, setPagination } = usePagination(6, 1)
    const { isLoading } = useQuery(['order'], OrderApi.fetchOrder, {
        onSuccess: (data: { response: TypeOrder[]; }) => {
            dispatch(orderActions.setOrder(data.response))
        },
    })

    function getDetails(item: TypeOrder) {
        dispatch(orderActions.setOrderDialog(true));
        OrderApi.getOrderDetails(item.id as string).then((data: { response: OrderDetails }) => {
            dispatch(orderActions.setOrderDto(data.response))
        })
    }

    const handleSearch = (event: any) => {
        setSearchItem(event.target.value);
    };



    // const filteredItems = employees.filter((item) => {
    //     return (item.fullName.toLowerCase().includes(searchItem.toLowerCase()) ||
    //         item.email.toLowerCase().includes(searchItem.toLowerCase()) ||
    //         item.phoneNumber.toLowerCase().includes(searchItem.toLowerCase()))
    // });


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = orders.map((n: any) => n.name);
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
    const array = [
        {
            id: "",
            customerId: "Majd Sallora",
            destination: "حلب, جميلية",
            isScheduled: true,
            source: "حلب, الفرقان",
            shopId: "مفروشات الفتال"
        },
        {
            id: "",
            customerId: "Aisha Biazed",
            destination: "دمشق, المزة",
            isScheduled: true,
            source: "دمشق, باب توما",
            shopId: "شوبينغ للالبسة"
        },
    ]
    // const deleteOrder = () => {
    //     swal.fire({
    //         title: 'هل انت متأكد من الحذف؟ ',
    //         text: "لن تتمكن من التراجع عن هذا!",
    //         icon: 'warning',
    //         confirmButtonText: 'نعم',
    //         cancelButtonText: 'الغاء',
    //         showCancelButton: true,
    //         showCloseButton: true
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             OrderApi.DeleteOrder(selected).then(() => {
    //                 dispatch(orderActions.deleteEmployee(selected))
    //                 toast('تمت الحذف بنجاح', {
    //                     position: "top-right",
    //                     autoClose: 5000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                     type: 'success'
    //                 })
    //             }
    //             )
    //         }
    //     })

    // }
    return (
        <Box sx={{ width: '100%' }}>
            <div className='flex justify-between items-center w-full gap-5 my-5'>
                <div className='flex justify-center items-center gap-3'>

                    <ShoppingCartIcon></ShoppingCartIcon>
                    <h2 className='text-lg font-bold '>الطلبات</h2>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <TextField value={searchItem} onChange={handleSearch} size="small" label='ابحث عن طلب' title='order' sx={{ width: '300px' }} name='orderSearch'></TextField>


                </div>

            </div>
            <Dialog open={isOpen}>
                <div className="flex justify-between items-center pl-4 ">
                    <DialogTitle>
                        معالجة الطلب
                    </DialogTitle>
                    <IconButton onClick={() => { dispatch(orderActions.setOrderDialog(false)); }}><Close /></IconButton>
                </div>
                <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>

                    <InputLabel id="city-id-label">السائق</InputLabel>
                    <Select

                        name='driverId'
                        labelId="driver-id-label"
                        label=" اسم السائق"
                    >
                        <MenuItem>Nasser Nassan</MenuItem>
                        <MenuItem>Ahmad Hader</MenuItem>
                        <MenuItem>Baraa Nayyal</MenuItem>
                        <MenuItem>Taym Khalil</MenuItem>
                        <MenuItem>Najeb Hallak</MenuItem>


                    </Select>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', padding: '15px' }}>
                    <Box gap={2} display='flex'>

                        <Button variant='contained' type="submit">
                            معالجة
                        </Button>

                        <Button variant='outlined' >الغاء</Button>
                    </Box>
                </DialogActions>

            </Dialog>

            <TableContainer component={Paper} sx={{
                width: '100%',

            }}>


                {
                    selected.length > 0 ?

                        (
                            <div className='flex justify-start items-center w-full px-2 mt-2'>

                                <Tooltip title="Delete">
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>

                        ) : null

                }


                {
                    isLoading ? <TableSkeleton headers={['', 'اسم الزبون', ' الوجهة', 'المصدر', 'حالة الطلب', 'اسم المتجر', 'تفاصيل']} />

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
                                    <TableCell > اسم الزبون</TableCell>
                                    <TableCell align="center">الوجهة</TableCell>
                                    <TableCell align="center">المصدر</TableCell>
                                    <TableCell align="center">حالة الطلب</TableCell>
                                    <TableCell align="center">اسم المتجر</TableCell>
                                    <TableCell align="center">تفاصيل</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {array ? array.map((row: TypeOrder, index: number) => {
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
                                                {row.customerId}
                                            </TableCell>
                                            <TableCell align="center">{row.destination}</TableCell>
                                            <TableCell align="center">{row.source} </TableCell>
                                            {/* <TableCell align="center">{row.isScheduled } </TableCell> */}
                                            <TableCell align="center">{row.isScheduled ? <Chip label="مجدول" color="primary" variant='outlined' /> : <Chip label="غير مجدول" color="secondary" variant='outlined' />}</TableCell>

                                            <TableCell align="center">{row.shopId}</TableCell>
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

