import { Avatar, Box, Button, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, TextField, Divider } from '@mui/material';
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function orderDetails() {
    return (
        <div>
            <div className='flex justify-between items-center w-full gap-5 '>

                <div className='flex justify-start items-center gap-3'>

                    <ShoppingCartIcon></ShoppingCartIcon>
                    <h2 className='text-lg font-bold'> تفاصيل الطلب </h2>

                </div>
                <Box gap={2} display='flex' sx={{ marginY: '20px' }}>

                    <Button variant='contained' type="submit">تم التوصيل </Button>

                    <Button color='error' variant='outlined'>حذف</Button>

                    <Button color='secondary' variant='outlined' >تراجع</Button>
                </Box>
            </div>
            <div className='grid grid-cols-4 gap-5'>
                <div className='col-span-3'>
                    <Card>

                        <CardContent>
                            <h2 className='mb-6'>معلومات الطلب</h2>
                            <div className='grid grid-cols-2 gap-8'>
                                <div className='col-span-1'>
                                    <TextField fullWidth
                                        name='customer' id='customer' label='اسم الزبون'
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <TextField fullWidth
                                        type='date'
                                        name='customer' id='customer' label='تاريخ الطلب'
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <TextField fullWidth
                                        name='customer' id='customer' label='التكلفة'
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <TextField fullWidth
                                        name='customer' id='customer' label=' المصدر'
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <TextField fullWidth
                                        name='customer' id='customer' label='الوجهة'
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <TextField fullWidth
                                        name='customer' id='customer' label=' الملاحظة'
                                    />
                                </div>
                                <div className='col-span-1'>
                                    <TextField fullWidth
                                        type='number'
                                        name='customer' id='customer' label='الوزن'
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className='col-span-1'>
                    <Card>

                        <CardContent>
                            <h2 className='mb-6'>سلة المشتريات</h2>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start" >
                                    {/* <ListItemAvatar> */}
                                    <Avatar alt="Remy Sharp" src="/brgur.jpg" />
                                    {/* </ListItemAvatar> */}
                                    <span className='mx-6'>برغر</span>
                                    <span>(2)</span>


                                </ListItem>
                                <ListItem alignItems="flex-start">

                                    {/* <ListItemAvatar> */}
                                    <Avatar alt="Remy Sharp" src="/pizza.jpg" />
                                    {/* </ListItemAvatar> */}
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
