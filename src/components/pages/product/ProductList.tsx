import { Box, Button, Card, CardActions, CardContent, CardMedia, LinearProgress, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { IMAGE_URL } from '@/../app.config';
import { ProductApi } from '@/api/Product/endpoints';
import { Product } from '@/api/Product/dto';
import { useQuery } from '@tanstack/react-query';
import { productActions } from '@/store/product';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { Edit } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function product(props: { shopId: string }) {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector<RootState>(state => state.product.products) as Product[];
    const swal = withReactContent(Swal)

    const { isLoading } = useQuery({
        queryKey: ["product"],
        queryFn: () => ProductApi.fetchProduct(props.shopId as string),
        onSuccess: (data: { response: Product[] }) => {
            dispatch(productActions.setProduct(data.response))

        },
    })
    useEffect(() => {
        dispatch(productActions.setLoading(isLoading))
    }, [isLoading])


    function getByIdProduct(id: string) {
        ProductApi.getProductDetails(id).then((res) => {
            dispatch(productActions.setProductDto({ ...res.response }))
            dispatch(productActions.setProductDialog(true))

        })

    }
    const deleteEmployee = (id: string) => {
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
                ProductApi.DeleteProduct([id]).then(() => {
                    dispatch(productActions.deleteProduct([id]))
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

        <>
            {
                products.length > 0 ?

                    <div className='grid grid-cols-5 gap-5 mx-4 my-4' >

                        {
                            products.map(product =>
                            (
                                <div className='col-span-5 md:col-span-1' key={product.id}>

                                    <Card sx={{ borderRadius: '30px' }}>
                                        <CardMedia
                                            sx={{ height: "180px", borderRadius: "22px" }}
                                            component="img"
                                            image={`${IMAGE_URL + product.imageUrl}`}

                                            alt="green iguana"
                                        />
                                        <CardContent>
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
                                                    {product.name}
                                                </Typography>
                                                <Typography
                                                    className="text-gray-700"
                                                    fontWeight={600}
                                                    gutterBottom
                                                    variant="h6"
                                                    fontSize={15}
                                                    margin={0}
                                                    component="div"
                                                >
                                                    {product.cost} ل.س

                                                </Typography>
                                            </div>

                                        </CardContent>
                                        <CardActions className="gap-2" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                                            <Button variant="contained" color='primary' onClick={() => getByIdProduct(product.id)}>
                                                <Edit />
                                            </Button>
                                            <Button variant="contained" color='error' onClick={() => deleteEmployee(product.id)}>
                                                <DeleteOutlineIcon />
                                            </Button>

                                        </CardActions>
                                    </Card>
                                </div>

                            )
                            )
                        }
                    </div> :

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 20px 40px 20px' }}>

                        <h2>لايوجد منتجات</h2>

                    </Box>
            }
        </>
    )
}

