import { Avatar, Box, Button, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, TextField, Divider, Select, FormControl, InputLabel, FormHelperText, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { OrderDetails } from '@/api/order/dto';
import { useQuery } from '@tanstack/react-query';
import { OrderApi } from '@/api/order/endpoints';
import order, { orderActions } from '@/store/order';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { ProductApi } from '@/api/Product/endpoints';
import { Product } from '@/api/Product/dto';
import { productActions } from '@/store/product';
import moment from 'moment';

export default function orderDetails() {
    let { id } = useParams();
    const navigation = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const shopId = queryParams.get('shopId')
    const dispatch = useDispatch<AppDispatch>();
    const orderDto = useSelector<RootState>(state => state.order.orderDto) as OrderDetails;
    const products = useSelector<RootState>(state => state.product.products) as Product[];
    const customerNames = useSelector<RootState>(state => state.customer.customerNames) as { fullName: string, id: string }[];

    const { handleSubmit, control, setValue, reset } = useForm<OrderDetails>({
        defaultValues: { ...new OrderDetails() }
    });


    useQuery({
        queryKey: ["orderDetails"],
        queryFn: () => OrderApi.getOrderDetails(id as string),
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
    const getProductName = (id: string) => products.find(ele => ele.id === id)?.name;
    return (
        <div>
            <div className='flex justify-between items-center w-full gap-5 '>

                <div className='flex justify-start items-center gap-3'>

                    <ShoppingCartIcon></ShoppingCartIcon>
                    <h2 className='text-lg font-bold'> تفاصيل الطلب </h2>

                </div>
                <Box gap={2} display='flex' sx={{ marginY: '20px' }}>

                    {/* <Button variant='contained' type="submit">تم التوصيل </Button> */}

                    <Button color='error' variant='outlined'>حذف</Button>

                    <Button color='secondary' variant='outlined' onClick={() => navigation('/orders')}>تراجع</Button>
                </Box>
            </div>
            <div className='grid grid-cols-4 gap-5'>
                <div className='col-span-3'>
                    <Card>
                        <form>
                            <CardContent>
                                <h2 className='mb-6'>معلومات الطلب</h2>
                                <div className='grid grid-cols-2 gap-8'>
                                    <div className='col-span-1'>
                                        <Controller name='customerId' control={control} render={({ field, fieldState }) =>
                                            // <TextField error={!!fieldState.error}
                                            //     helperText={fieldState.error?.message}
                                            //     {...field} name='customerId' id='customer-name' label='اسم الزبون'
                                            //     fullWidth
                                            // />
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

                                    </div>
                                    {
                                        orderDto.scheduleDate ?
                                            <div className='col-span-1'>
                                                <Controller name='scheduleDate' control={control} render={({ field, fieldState }) =>
                                                    <TextField error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        type='date'
                                                        {...field} name='scheduleDate' id='date-order' label='تاريخ الطلب'
                                                        fullWidth
                                                    />
                                                }
                                                />

                                            </div> : null
                                    }
                                    <div className='col-span-1'>
                                        <Controller name='coast' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                type='number'
                                                helperText={fieldState.error?.message}
                                                {...field} name='coast' id='cost' label='تكلفة الطلب'
                                                fullWidth
                                            />
                                        }
                                        />

                                    </div>
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

                                    </div>
                                    <div className='col-span-1'>
                                        <Controller name='source' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='source' id='source' label=' المصدر'
                                                fullWidth
                                            />
                                        }
                                        />

                                    </div>
                                    <div className='col-span-1'>
                                        <Controller name='destination' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='destination' id='destination' label='الوجهة'
                                                fullWidth
                                            />
                                        }
                                        />

                                    </div>
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
                                        orderDto.weight !== 0 ?
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
                <div className='col-span-1'>
                    <Card>

                        <CardContent>
                            <h2 className='mb-6'>سلة المشتريات</h2>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {
                                    orderDto.cart.length > 0 ? orderDto.cart.map((ele) => {
                                        return (
                                            <ListItem key={ele.productId} alignItems="flex-start" >
                                                <Avatar alt="Remy Sharp" src="/brgur.jpg" />
                                                <span className='mx-6'>{getProductName(ele.productId)}</span>
                                                <span>({ele.quantity})</span>
                                            </ListItem>
                                        )
                                    }) : <h2 className='font-bold text-lg text-center'>لايوجد منتجات</h2>
                                }
                                {/* <ListItem alignItems="flex-start">

                                    <Avatar alt="Remy Sharp" src="/pizza.jpg" />
                                    <span className='mx-6'>بيتزا</span>
                                    <span>(1)</span>

                                </ListItem> */}
                            </List>
                            <Divider />
                            <h2 className='my-4 font-bold text-center'>{orderDto.coast} ل.س</h2>
                        </CardContent>
                    </Card>

                </div>
            </div>

        </div>
    )
}
