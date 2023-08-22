import TableSkeleton from '@/components/skeletons/table';
import { orderActions } from '@/store/order';
import { Close } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { OrderApi } from '@/api/order/endpoints';
import { useQuery } from '@tanstack/react-query';
import { Order, OrderDetails, RejectOrder } from '@/api/order/dto';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePagination } from '@/global/usePagination';
import { Shop } from '@/api/shop/dto';
import { useNavigate } from 'react-router-dom';
import { FaBoxes } from 'react-icons/fa';
import { CustomerApi } from '@/api/customer/endpoints';

export default function RejectedOrder() {
    const rejectedOrders = useSelector<RootState>(state => state.order.rejectedOrders) as RejectOrder[];
    const driverNames = useSelector<RootState>(state => state.driver.driverNames) as { fullName: string, id: string }[];
    const customerNames = useSelector<RootState>(state => state.customer.customerNames) as { fullName: string, id: string }[];
    const getCustomerName = (id: string) => customerNames.find(ele => ele.id === id)?.fullName
    const getDriverName = (id: string) => driverNames.find(ele => ele.id === id)?.fullName
    const [driverId, setDriverId] = React.useState('');
    const [orderId, setOrderId] = React.useState('');
    const [selected, setSelected] = React.useState<string[]>([]);
    const navigation = useNavigate();

    const { paginate, pagination, setPagination } = usePagination(6, 1)
    const dispatch = useDispatch<AppDispatch>()

    const { isLoading } = useQuery(['rejectedOrder'], OrderApi.getAllRejectOrder, {
        onSuccess: (data: { response: RejectOrder[]; }) => {
            dispatch(orderActions.setRejectOrder(data.response))
        },
    })

    function blockCustomer(id: string) {
        CustomerApi.BlockCustomer(id).then(() => {
            toast('تم الحظر بنجاح', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
                type: 'success'
            })
        })
    }


    return (
        <div>

            <TableContainer component={Paper} sx={{
                width: '100%',

            }}>

                {
                    isLoading ? <TableSkeleton headers={['', 'اسم الزبون', 'اسم السائق', 'سبب الرفض الطلب', 'حظر الزبون']} />

                        : <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>

                                    <TableCell > اسم الزبون</TableCell>
                                    <TableCell align="center">اسم السائق</TableCell>
                                    <TableCell align="center">سبب الرفض الطلب</TableCell>
                                    <TableCell align="center">حظر الزبون</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rejectedOrders ? paginate(rejectedOrders).map((row: RejectOrder, index: number) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}

                                        >


                                            <TableCell component="th" scope="row" align="left">
                                                {getCustomerName(row.customerId)}
                                            </TableCell>

                                            <TableCell align="center">{getDriverName(row.driverId)}</TableCell>
                                            <TableCell align="center">{row.cancelReason}</TableCell>


                                            <TableCell align="center">
                                                <Button variant='outlined' color='error' onClick={() => blockCustomer(row.customerId)} >حظر</Button>
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
        </div>
    )
}
