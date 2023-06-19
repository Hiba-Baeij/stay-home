import React from 'react'
import { Shop as ShopType } from '@/api/shop/dto'
import { AppDispatch, RootState } from '@/store'
import { Edit } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import { IMAGE_URL } from '@/../app.config';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { shopActions } from '@/store/shop';

import withReactContent from 'sweetalert2-react-content'
import { ShopApi } from '@/api/shop/endpoints'
import { useQuery } from '@tanstack/react-query'
import StoreIcon from '@mui/icons-material/Store';
import ShopComponent from '@/components/pages/Shop'

export default function Shop() {
    const dispatch = useDispatch<AppDispatch>()
    const shops = useSelector<RootState>(state => state.shop.shops) as ShopType[];
    const swal = withReactContent(Swal);
    const { isLoading } = useQuery(['shop'], ShopApi.fetchShop, {
        onSuccess: (data: { response: ShopType[]; }) => {
            dispatch(shopActions.setShop(data.response))
        },
    })

    return (
        <Box sx={{ width: '100%', padding: '10px' }}>
            <div className='flex justify-between items-center w-full gap-5 my-5'>

                <div className='flex justify-start items-center gap-3'>

                    <StoreIcon></StoreIcon>
                    <h2 className='text-lg font-bold'>المتاجر</h2>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <TextField size="small" label='ابحث عن المتاجر' title='shop' sx={{ width: '300px' }} name='shopSearch'></TextField>
                    <ShopComponent />

                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {shops.map((shop) => (
                    <Card
                        key={shop.id}
                        sx={{ borderRadius: "24px 24px 10px 10px", padding: "6px" }}
                    >
                        {shop.imageUrl && (
                            <CardMedia
                                sx={{ height: "240px", borderRadius: "22px" }}
                                component="img"
                                image={`${IMAGE_URL + shop.imageUrl}`}

                                alt="green iguana"
                            />
                        )}

                        <CardContent className="">
                            <div className="flex justify-between items-center">

                                <Typography
                                    className="text-gray-700"
                                    fontWeight={600}
                                    gutterBottom
                                    variant="h6"
                                    fontSize={20}
                                    margin={0}
                                    component="div"
                                >
                                    {shop.name}
                                </Typography>
                            </div>

                        </CardContent>

                        <CardActions className="gap-2">
                            <Link
                                className="flex-grow"
                                to='/'
                            >
                                <Button variant="contained" fullWidth>
                                    عرض القطع (20)
                                </Button>
                            </Link>
                            {/* <Button variant="contained" onClick={() => props.onDetails(car)}>
                                <Edit></Edit>
                            </Button> */}
                        </CardActions>
                    </Card>
                ))}
            </div>
        </Box>


    )
}

