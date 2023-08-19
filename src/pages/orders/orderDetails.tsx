import { Avatar, Box, Button, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, TextField, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { OrderDetails } from '@/api/order/dto';

export default function orderDetails() {
    const navigation = useNavigate();
    const { handleSubmit, control, setValue, reset } = useForm<OrderDetails>({
        defaultValues: { ...new OrderDetails() }
    });
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
                                        <Controller rules={{ required: 'اسم الزبون مطلوب' }} name='customerId' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='customerId' id='customer-name' label='اسم الزبون'

                                            />
                                        }
                                        />

                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: 'تاريخ الطلب مطلوب' }} name='scheduleDate' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                type='date'
                                                {...field} name='scheduleDate' id='date-order' label='تاريخ الطلب'

                                            />
                                        }
                                        />

                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: ' التكلفة مطلوبة' }} name='coast' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                type='number'
                                                helperText={fieldState.error?.message}
                                                {...field} name='coast' id='cost' label='التكلفة'

                                            />
                                        }
                                        />

                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: ' المصدر مطلوب' }} name='source' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='source' id='source' label=' المصدر'

                                            />
                                        }
                                        />

                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: ' الوجهة مطلوبة' }} name='destination' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='destination' id='destination' label='الوجهة'

                                            />
                                        }
                                        />

                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: ' الملاحظة مطلوبة' }} name='note' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='note' id='note' label=' الملاحظة'

                                            />
                                        }
                                        />

                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: ' الوزن مطلوب' }} name='weight' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='weight' id='weight' label='الوزن'
                                                type='number'

                                            />
                                        }
                                        />

                                    </div>
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
                                <ListItem alignItems="flex-start" >
                                    <Avatar alt="Remy Sharp" src="/brgur.jpg" />
                                    <span className='mx-6'>برغر</span>
                                    <span>(2)</span>


                                </ListItem>
                                <ListItem alignItems="flex-start">

                                    <Avatar alt="Remy Sharp" src="/pizza.jpg" />
                                    <span className='mx-6'>بيتزا</span>
                                    <span>(1)</span>

                                </ListItem>
                            </List>
                            <Divider />
                            <h2 className='my-4 font-bold text-center'>50000 ل.س</h2>
                        </CardContent>
                    </Card>

                </div>
            </div>

        </div>
    )
}
