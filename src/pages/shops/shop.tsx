import React from 'react'
import { Shop as ShopType } from '@/api/shop/dto'
import { Base } from '@/store/setting'
import { AppDispatch, RootState } from '@/store'
import { Edit } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, TextField, Typography } from '@mui/material'
import { IMAGE_URL } from '@/../app.config';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { shopActions } from '@/store/shop';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withReactContent from 'sweetalert2-react-content'
import { ShopApi } from '@/api/shop/endpoints'
import { useQuery } from '@tanstack/react-query'
import StoreIcon from '@mui/icons-material/Store';
import ShopComponent from '@/components/pages/Shop'
import CardSkeleton from '@/components/skeletons/card'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { getImageUrl } from '@/global/auth'

export default function Shop() {
    const dispatch = useDispatch<AppDispatch>()
    const shops = useSelector<RootState>(state => state.shop.shops) as ShopType[];
    const swal = withReactContent(Swal);
    const [searchItem, setSearchItem] = React.useState('');
    const { isLoading } = useQuery(['shop'], ShopApi.fetchShop, {
        onSuccess: (data: { response: ShopType[]; }) => {
            dispatch(shopActions.setShop(data.response))
        },
    })
    const categories = useSelector<RootState>(state => state.setting.categories) as Base[];

    const getCategoryName = (id: string) => categories.find(ele => ele.id === id)?.name;
    const handleSearch = (event: any) => {
        setSearchItem(event.target.value);
    };
    const filteredItems = shops.filter((item) => {
        return (item.name.toLowerCase().includes(searchItem.toLowerCase()))
    });

    const deleteShop = (id: string) => {
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
                ShopApi.DeleteShop([id]).then(() => {
                    dispatch(shopActions.deleteShop([id]))
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

    return (
        <Box sx={{ width: '100%' }}>
            <div className='flex justify-between items-center w-full gap-5 my-5'>

                <div className='flex justify-start items-center gap-3'>

                    <StoreIcon></StoreIcon>
                    <h2 className='text-lg font-bold'>المتاجر</h2>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <TextField size="small" label='ابحث عن المتاجر' value={searchItem} onChange={handleSearch} title='shop' sx={{ width: '300px' }} name='shopSearch'></TextField>
                    <ShopComponent />

                </div>
            </div>

            {
                isLoading ?
                    <div className='flex justify-center items-center h-80'>
                        <CardSkeleton />
                    </div>
                    :

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {filteredItems.map((shop, index) => (
                            <Card
                                key={shop.id}
                                sx={{ borderRadius: "10px", position: 'relative' }}
                            >
                                <div className={[shop.isOnline ? 'bg-green' : 'bg-red', 'h-5 w-5 rounded-full absolute left-5 top-5'].join(' ')} ></div>
                                {shop.imageUrl && (



                                    <CardMedia
                                        sx={{ height: "220px", borderRadius: "10px" }}
                                        component="img"
                                        image={getImageUrl(shop.imageUrl)}

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
                                        <Typography
                                            className="text-gray-700"
                                            fontWeight={300}
                                            gutterBottom
                                            variant="h6"
                                            fontSize={16}
                                            margin={0}
                                            component="div"
                                        >
                                            {getCategoryName(shop.categoryId)}
                                        </Typography>

                                    </div>

                                </CardContent>

                                <CardActions className="gap-2">
                                    <Link
                                        className="flex-grow"
                                        to={`/shop/${shop.id}`}
                                    >
                                        <Button variant="contained" fullWidth>
                                            عرض المنتجات وتفاصيل
                                        </Button>
                                    </Link>
                                    <Button variant="contained" onClick={() => deleteShop(shop.id)}>
                                        <DeleteOutlineIcon />
                                    </Button>

                                </CardActions>
                            </Card>

                        ))

                        }
                    </div>
            }


        </Box>


    )
}

