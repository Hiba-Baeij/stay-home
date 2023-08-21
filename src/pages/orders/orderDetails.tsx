import { Avatar, Box, Button, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, TextField, Divider, Select, FormControl, InputLabel, FormHelperText, MenuItem, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { OrderDetails, OrderStage } from '@/api/order/dto';
import { useQuery } from '@tanstack/react-query';
import { OrderApi } from '@/api/order/endpoints';
import order, { orderActions } from '@/store/order';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { ProductApi } from '@/api/Product/endpoints';
import { Product } from '@/api/Product/dto';
import { productActions } from '@/store/product';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

export default function orderDetails() {
    let { id } = useParams();
    const navigation = useNavigate();
    const swal = withReactContent(Swal)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status')
    const shopId = queryParams.get('shopId')
    const dispatch = useDispatch<AppDispatch>();
    const orderDto = useSelector<RootState>(state => state.order.orderDto) as OrderDetails;
    const products = useSelector<RootState>(state => state.product.products) as Product[];
    const customerNames = useSelector<RootState>(state => state.customer.customerNames) as { fullName: string, id: string }[];

    const { handleSubmit, control, setValue, reset } = useForm<OrderDetails>({
        defaultValues: { ...new OrderDetails() }
    });
    if (status === 'passenger')
        useQuery({
            queryKey: ["orderDetails"],
            queryFn: () => OrderApi.getByIdPassengerOrder(id as string),
            onSuccess: (data: { response: OrderDetails }) => {
                dispatch(orderActions.setOrderDto({
                    ...data.response, date: moment(data.response.date).format('YYYY-MM-DD')
                }))
                reset({ ...data.response })
            },
        })
    else if (status === 'shipping' && shopId) {

        useQuery({
            queryKey: ["orderDetails"],
            queryFn: () => OrderApi.getByIdShippingOrder(id as string),
            onSuccess: (data: { response: OrderDetails }) => {
                dispatch(orderActions.setOrderDto({
                    ...data.response, scheduleDate: moment(data.response.scheduleDate).format('YYYY-MM-DD')
                }))
                reset({ ...data.response })
            },
        })
        useQuery({
            queryKey: ["product"],
            queryFn: () => ProductApi.fetchProduct(shopId as string),
            onSuccess: (data: { response: Product[] }) => {
                dispatch(productActions.setProduct(data.response))
            },
        })
    }
    else if (status === 'delivery')
        useQuery({
            queryKey: ["orderDetails"],
            queryFn: () => OrderApi.getByIdDeliveryOrder(id as string),
            onSuccess: (data: { response: OrderDetails }) => {
                dispatch(orderActions.setOrderDto({
                    ...data.response, date: moment(data.response.date).format('YYYY-MM-DD')
                }))
                reset({ ...data.response })
            },
        })

    const getProductName = (id: string) => products.find(ele => ele.id === id)?.name;
    const getStageOrder = () => {
        if (orderDto.currentStage === OrderStage.Confirmed) return 'معالج'
        else if (orderDto.currentStage === OrderStage.UnConfirmed) return 'غير معالج'
        else if (orderDto.currentStage === OrderStage.OnWay) return 'على الطريق'
        else if (orderDto.currentStage === OrderStage.Done) return 'تم الوصول'
        else if (orderDto.currentStage === OrderStage.InProcess) return 'قيد المعالجة'
        else if (orderDto.currentStage === OrderStage.Cancel) return 'ملغى'
        else return 'جديد'
    }
    const getStatusOrder = () => {
        if (status === 'passenger') return 'توصيل الاشخاص'
        else if (status === 'shipping') return ' توصيل البضائع'
        else return 'توصيل الاغراض'
    }

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
                OrderApi.DeleteOrder([id as string]).then(() => {
                    if (status == 'passenger')
                        dispatch(orderActions.deletePassengerOrder([id as string]))
                    else if (status == 'shipping')
                        dispatch(orderActions.deleteShippingOrder([id as string]))
                    else
                        dispatch(orderActions.deleteDeliveryOrder([id as string]))
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

                }
                )
            }

        })

    }
    const cancelOrder = () => {
        swal.fire({
            title: 'هل انت متأكد من إلغاء هذا الطلب ',
            text: "لن تتمكن من التراجع عن هذا!",
            icon: 'warning',
            confirmButtonText: 'نعم',
            cancelButtonText: 'لا',
            showCancelButton: true,
            showCloseButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                OrderApi.CancelOrder(id as string).then(() => {

                    toast('تم إلغاء الطلب بنجاح', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                        theme: "light",
                        type: 'success'
                    })
                    navigation('/orders')

                }
                )
            }

        })

    }
    return (
        <div>
            <div className='flex justify-between items-center w-full gap-5 '>

                <div className='flex justify-start items-center gap-3'>

                    <ShoppingCartIcon></ShoppingCartIcon>
                    <h2 className='text-lg font-bold'> تفاصيل الطلب </h2>

                </div>
                <Box gap={2} display='flex' sx={{ marginY: '20px' }}>

                    {/* <Button variant='contained' type="submit">تم التوصيل </Button> */}

                    <Button color='error' variant='outlined' onClick={deleteOrder}>حذف</Button>

                    <Button color='secondary' variant='outlined' onClick={() => navigation('/orders')}>تراجع</Button>
                    <Button color='primary' variant='contained' onClick={cancelOrder}>إلغاء</Button>
                </Box>
            </div>
            <div className='grid grid-cols-4 gap-5'>
                <div className='col-span-3'>
                    <Card>
                        <form>
                            <CardContent>
                                <div className='flex justify-between items-center mb-6'>

                                    <h2>معلومات الطلب</h2>
                                    <div className='flex justify-between items-center mb-6'>

                                        <div>
                                            <span>نوع الطلب:</span>
                                            <span className='mx-2'><Chip label={getStatusOrder()} color="secondary" variant='filled' /> </span>
                                        </div>
                                        <div>
                                            <span>حالة الطلب:</span>
                                            <span className='mx-2'><Chip label={getStageOrder()} color="primary" variant='filled' /> </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-8'>

                                    <div className='col-span-1'>
                                        {

                                            status === 'passenger' || status === 'delivery' ? <Controller name='customer' control={control} render={({ field, fieldState }) =>
                                                <TextField error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                    {...field} name='customer' id='customer-name' label='اسم الزبون'
                                                    fullWidth
                                                />

                                            }
                                            /> :
                                                <Controller name='customerId' control={control} render={({ field, fieldState }) =>

                                                    <FormControl fullWidth error={!!fieldState.error}>
                                                        <InputLabel id="city-id-label">اسم الزبون</InputLabel>
                                                        <Select
                                                            {...field}
                                                            name='customerId'
                                                            labelId="customer-id"
                                                            label=" اسم الزبون"
                                                        >
                                                            {
                                                                customerNames.map((c) => <MenuItem key={c.id} value={c.id}>{c.fullName}</MenuItem>)
                                                            }

                                                        </Select>
                                                        <FormHelperText>
                                                            {fieldState.error?.message}
                                                        </FormHelperText>
                                                    </FormControl>
                                                }
                                                />
                                        }

                                    </div>
                                    {
                                        status === 'passenger' ?
                                            <div className='col-span-1'>
                                                <Controller name='numberOfPassenger' control={control} render={({ field, fieldState }) =>
                                                    <TextField error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        type='number'
                                                        {...field} name='numberOfPassenger' id='numberOfPassenger-order' label='عدد الأشخاص'
                                                        fullWidth
                                                    />
                                                }
                                                />

                                            </div> : null
                                    }
                                    {
                                        status == 'shipping' ?
                                            <div className='col-span-1'>
                                                <Controller name='scheduleDate' control={control} render={({ field, fieldState }) =>
                                                    <TextField error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        type='date'
                                                        {...field} name='scheduleDate' id='scheduleDate-order' label='تاريخ الطلب المجدول'
                                                        fullWidth
                                                    />
                                                }
                                                />

                                            </div> : null
                                    }
                                    {
                                        orderDto.date ? <div>
                                            <div className='col-span-1'>
                                                <Controller name='date' control={control} render={({ field, fieldState }) =>
                                                    <TextField error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        type='date'
                                                        {...field} name='date' id='date-order' label='تاريخ الطلب'
                                                        fullWidth
                                                    />
                                                }
                                                />

                                            </div>
                                        </div> : null
                                    }
                                    <div className='col-span-1'>
                                        <Controller name='coast' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                type='number'
                                                helperText={fieldState.error?.message}
                                                {...field} name='coast' id='cost' label={status == 'passenger' ? 'تكلفة التوصيل' : 'تكلفة الطلب'}
                                                fullWidth
                                            />
                                        }
                                        />

                                    </div>
                                    {
                                        orderDto.deliveryCoast ?
                                            <div className='col-span-1'>
                                                <Controller name='deliveryCoast' control={control} render={({ field, fieldState }) =>
                                                    <TextField error={!!fieldState.error}
                                                        type='number'
                                                        helperText={fieldState.error?.message}
                                                        {...field} name='deliveryCoast' id='deliveryCoast' label='تكلفة التوصيل'
                                                        fullWidth
                                                    />
                                                }
                                                />

                                            </div> : null
                                    }
                                    {
                                        orderDto.source ?
                                            <div className='col-span-1'>
                                                <Controller name='source' control={control} render={({ field, fieldState }) =>
                                                    <TextField error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        {...field} name='source' id='source' label=' المصدر'
                                                        fullWidth
                                                    />
                                                }
                                                />
                                            </div> : null
                                    }
                                    {
                                        orderDto.destination ?
                                            <div className='col-span-1'>
                                                <Controller name='destination' control={control} render={({ field, fieldState }) =>
                                                    <TextField error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        {...field} name='destination' id='destination' label='الوجهة'
                                                        fullWidth
                                                    />
                                                }
                                                />

                                            </div> : null
                                    }
                                    <div className='col-span-1'>
                                        <Controller name='note' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='note' id='note' label=' الملاحظة'
                                                fullWidth
                                            />
                                        }
                                        />

                                    </div>
                                    {
                                        status != 'passenger' ?
                                            <div className='col-span-1'>
                                                <Controller name='weight' control={control} render={({ field, fieldState }) =>
                                                    <TextField error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        {...field} name='weight' id='weight' label='الوزن'
                                                        type='number'
                                                        fullWidth
                                                    />
                                                }
                                                />

                                            </div> : null
                                    }
                                </div>
                            </CardContent>
                        </form>
                    </Card>
                </div>
                {

                    status === 'passenger' ?
                        null
                        :
                        <div className='col-span-1'>
                            <Card>

                                <CardContent>
                                    <h2 className='mb-6'>سلة المشتريات</h2>
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        {
                                            orderDto.cart && orderDto.cart?.length > 0 ? orderDto.cart?.map((ele) => {
                                                return (
                                                    <ListItem key={ele.productId} alignItems="flex-start" >
                                                        <Avatar alt="Remy Sharp" src="/brgur.jpg" />
                                                        <span className='mx-6'>{getProductName(ele.productId)}</span>
                                                        <span>({ele.quantity})</span>
                                                    </ListItem>
                                                )
                                            }) : <h2 className='font-bold text-lg text-center mb-4'>لايوجد منتجات</h2>
                                        }
                                    </List>
                                    <Divider />
                                    <div className='flex justify-center items-center gap-5 my-4'>

                                        <span> تكلفة الطلب :</span>
                                        <h2 className=' font-bold text-center'>{orderDto.coast} ل.س</h2>
                                    </div>
                                    <div className='flex justify-center items-center gap-5'>

                                        <span >سعر التوصيل :</span>
                                        <h2 className='font-bold text-center'>{orderDto.deliveryCoast ? orderDto.deliveryCoast : 0} ل.س</h2>
                                    </div>
                                    <Divider className='py-4' />
                                    <div className='flex justify-center items-center gap-5 my-4'>

                                        <span >التكلفة الاجمالية :</span>
                                        <h2 className=' font-bold text-center'>{orderDto.deliveryCoast ? orderDto.coast + orderDto.deliveryCoast : orderDto.coast + 0} ل.س</h2>
                                    </div>

                                </CardContent>
                            </Card>

                        </div>
                }
            </div>

        </div>
    )
}
