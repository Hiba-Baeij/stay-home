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
import { Order, OrderDetails } from '@/api/order/dto';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePagination } from '@/global/usePagination';
import { Shop } from '@/api/shop/dto';
import { ShopApi } from '@/api/shop/endpoints';
import { shopActions } from '@/store/shop';
import { useNavigate } from 'react-router-dom';
import { FaBoxes } from 'react-icons/fa';
import InventoryIcon from '@mui/icons-material/Inventory';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function ShippingOrder() {
  const isOpen = useSelector<RootState>(state => state.order.openDialogOrder) as boolean;
  const shippingOrders = useSelector<RootState>(state => state.order.shippingOrders) as Order[];
  const driverAvailableNames = useSelector<RootState>(state => state.driver.driverAvailableNames) as { fullName: string, id: string }[];
  const customerNames = useSelector<RootState>(state => state.customer.customerNames) as { fullName: string, id: string }[];
  const shops = useSelector<RootState>(state => state.shop.shops) as Shop[];
  const getCustomerName = (id: string) => customerNames.find(ele => ele.id === id)?.fullName
  const getShopName = (id: string) => shops.find(ele => ele.id === id)?.name
  const [driverId, setDriverId] = React.useState('');
  const [shopId, setShopId] = React.useState('');
  const [orderId, setOrderId] = React.useState('');
  const [loadingHandle, setLoadingHandle] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const navigation = useNavigate();
  const { paginate, pagination, setPagination } = usePagination(6, 1)
  const dispatch = useDispatch<AppDispatch>()
  const swal = withReactContent(Swal)
  const { isLoading } = useQuery(['order'], OrderApi.getAllShippingOrder, {
    onSuccess: (data: { response: Order[]; }) => {
      dispatch(orderActions.setShippingOrder(data.response))
    },
  })
  useQuery(['shop'], ShopApi.fetchShop, {
    onSuccess: (data: { response: Shop[]; }) => {
      dispatch(shopActions.setShop(data.response))
    },
  })

  const handleSelectChange = (event: any) => {
    const newValue = event.target.value;
    setDriverId(newValue);
  };


  function openHandleDialog(item: Order) {
    dispatch(orderActions.setOrderDialog(true));
    setOrderId(item.id)
    setShopId(item.shopId)
  }

  function handleOrder() {
    setLoadingHandle(true)
    OrderApi.HandleOrder({ driverId: driverId, id: orderId }).then((data: { response: OrderDetails }) => {
      dispatch(orderActions.setOrderDto(data.response))
      toast('تمت المعالجة بنجاح', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",
        type: 'success'
      })
      dispatch(orderActions.setOrderDialog(false));
      setLoadingHandle(false)
      navigation(`/orderDetails/${orderId}?status=shipping&shopId=${shopId}`)

    })
  }
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
  const deleteOrder = () => {
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
        OrderApi.DeleteOrder(selected).then(() => {
          dispatch(orderActions.deleteShippingOrder(selected))
          toast('تم الحذف بنجاح', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
            type: 'success'
          })
          setSelected([])
        }
        )
      }

    })

  }


  return (
    <div> <Dialog open={isOpen}>
      <div className="flex justify-between items-center pl-4 ">
        <DialogTitle>
          معالجة الطلب
        </DialogTitle>
        <IconButton onClick={() => { dispatch(orderActions.setOrderDialog(false)); }}><Close /></IconButton>
      </div>
      <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>

        <InputLabel id="city-id-label">السائق</InputLabel>
        {/* {driverId} */}
        <Select
          name='driverId'
          labelId="driver-id-label"
          label=" اسم السائق"
          value={driverId}
          onChange={handleSelectChange}
        >
          {driverAvailableNames.map((ele) => <MenuItem key={ele.id} value={ele.id}>{ele.fullName}</MenuItem>)}

        </Select>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', padding: '15px' }}>
        <Box gap={2} display='flex'>
          {
            loadingHandle ? <LoadingButton loading variant='contained'></LoadingButton>
              :
              <Button variant='contained' type="submit" onClick={handleOrder}>
                معالجة
              </Button>
          }

          <Button variant='outlined' onClick={() => dispatch(orderActions.setOrderDialog(false))} >الغاء</Button>
        </Box>
      </DialogActions>

    </Dialog>

      <TableContainer component={Paper} sx={{
        width: '100%',

      }}>

        {
          isLoading ? <TableSkeleton headers={['', 'اسم الزبون', ' الوجهة', 'المصدر', 'اسم المتجر', 'حالة الطلب', 'وقت الطلب', 'معالجة الطلب', 'تفاصيل']} />

            : <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    {
                      selected.length > 0 ?

                        (
                          <div className='flex justify-start items-center w-full px-2 mt-2'>

                            <Tooltip title="Delete">
                              <IconButton onClick={deleteOrder}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </div>

                        ) : null

                    }
                  </TableCell>
                  <TableCell > اسم الزبون</TableCell>
                  <TableCell align="center">الوجهة</TableCell>
                  <TableCell align="center">المصدر</TableCell>
                  <TableCell align="center">اسم المتجر</TableCell>
                  <TableCell align="center">حالة الطلب</TableCell>
                  <TableCell align="center">وقت الطلب</TableCell>
                  <TableCell align="center">معالجة الطلب</TableCell>
                  <TableCell align="center">تفاصيل</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shippingOrders ? paginate(shippingOrders).map((row: Order, index: number) => {
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
                        {getCustomerName(row.customerId)}
                      </TableCell>
                      <TableCell align="center">{row.destination}</TableCell>
                      <TableCell align="center">{row.source ? row.source : '-------'} </TableCell>
                      <TableCell align="center">{row.shopId ? getShopName(row.shopId) : '-------'}</TableCell>
                      <TableCell align="center">{row.isHandled ? <Chip label="معالج" color="primary" variant='outlined' /> : <Chip label="غير معالج" color="secondary" variant='outlined' />}</TableCell>
                      <TableCell align="center">{row.isScheduled ? <Chip label="مجدول" color="primary" variant='outlined' /> : <Chip label="غير مجدول" color="secondary" variant='outlined' />}</TableCell>
                      <TableCell align="center">
                        {row.isHandled ? <InventoryIcon sx={{ cursor: 'pointer', fontSize: '18px', opacity: '0.5' }} /> : (
                          <InventoryIcon sx={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => openHandleDialog(row)} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <MoreVertIcon sx={{ cursor: 'pointer' }} onClick={() => navigation(`/orderDetails/${row.id}?status=shipping&shopId=${row.shopId}`)} />
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
