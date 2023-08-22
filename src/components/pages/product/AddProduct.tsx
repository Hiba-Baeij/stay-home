import { Product } from '@/api/Product/dto'
import { RootState } from '@/store'
import { productActions } from '@/store/product'
import { Add, Close } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, Radio, RadioGroup, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Upload from '@/components/shared/Upload';
import { LoadingButton } from '@mui/lab'
import { ProductApi } from '@/api/Product/endpoints'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IMAGE_URL } from '@/../app.config';

export default function AddProduct(props: { shopId: string }) {
    const [imageUrl, setImageUrl] = useState('');
    const [isAvailable, setIsAvailable] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const { control, handleSubmit, reset, setValue } = useForm<Product>({
        defaultValues: { ...new Product() }
    });
    const productDto = useSelector<RootState>(state => state.product.productDto) as Product;
    const isOpen = useSelector<RootState>(state => state.product.openDialogProduct) as boolean;
    useEffect(() => {
        if (productDto && productDto.id) {
            setImageUrl(IMAGE_URL + productDto.imageUrl);
            reset({ ...productDto })
        }
    }, [productDto])
    const onSubmitProduct = (data: Product) => {
        if (data.id) {
            setIsLoading(true)
            ProductApi.ModifyProduct({ ...data, shopId: props.shopId }).then((res) => {
                dispatch(productActions.modifyProduct({ ...res.response }))
                setIsLoading(false)
                resetForm();
                toast('تم التعديل بنجاح', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                    type: 'success'
                })
            }).catch((er: Error) => {
                setIsLoading(false);
                toast.error(er.message, {
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
        else {
            setIsLoading(true)
            ProductApi.AddProduct({ ...data, shopId: props.shopId }).then((res) => {
                console.log(res.response);

                dispatch(productActions.addProductDto(res.response))
                setIsLoading(false)
                resetForm();
                toast('تمت الاضافة بنجاح', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                    type: 'success'
                })
            }).catch(() => setIsLoading(false))
        }
    }

    const handleChange = (event: any) => {
        console.log(event.target.value);
        // console.log(newValue);
        setIsAvailable(event.target.value)
        setValue('isAvailable', event.target.value)

    };

    const resetForm = () => {
        reset({ ...new Product() });
        setImageUrl('')
        dispatch(productActions.setProductDialog(false));
        dispatch(productActions.resetForm());
    }
    return (
        <>
            <Button variant="contained" onClick={() => dispatch(productActions.setProductDialog(true))}>
                إضافة منتج
                <Add></Add>
            </Button>
            <Dialog open={isOpen}>
                <form onSubmit={handleSubmit(onSubmitProduct)}>
                    <div className="flex justify-between items-center pl-4 ">
                        <DialogTitle>
                            {
                                productDto.id ? 'تعديل المنتج' : 'اضافة منتج'
                            }
                        </DialogTitle>
                        <IconButton onClick={() => { dispatch(productActions.setProductDialog(false)); resetForm() }}><Close /></IconButton>
                    </div>
                    <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>

                        <Controller rules={{ required: 'اسم المنتج مطلوب' }} name='name' control={control} render={({ field, fieldState }) =>
                            <TextField error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                {...field} name='name' id='product-name' label='اسم المنتج'

                            />
                        }
                        />
                        <Controller rules={{ required: 'تكلفة المنتج مطلوب' }} name='cost' control={control} render={({ field, fieldState }) =>
                            <TextField error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                {...field} name='cost' id='product-cost' label='تكلفة المنتج'

                            />
                        }
                        />
                        <Controller
                            control={control} name='imageFile' render={({ field, fieldState }) =>

                                <FormControl error={!!fieldState.error} fullWidth>
                                    <Upload {...field} url={imageUrl} onChangeUrl={setImageUrl} name='imageFile' label='صورة المنتج'></Upload>
                                    <FormHelperText>
                                        {fieldState.error?.message}
                                    </FormHelperText>
                                </FormControl>
                            }
                        />
                        <div className='col-span-2'>

                            <FormLabel id="demo-radio-buttons-group-label">هل المنتج متاح ؟</FormLabel>

                            <Controller name='isAvailable' control={control} render={({ field }) => (

                                <RadioGroup
                                    {...field}
                                    aria-labelledby="isAvailable"
                                    name="isAvailable"
                                    row
                                    defaultValue={true}
                                    value={isAvailable}
                                    onChange={handleChange}

                                >
                                    <FormControlLabel value="true" control={<Radio />} label="نعم" />
                                    <FormControlLabel value="false" control={<Radio />} label="لا" />
                                </RadioGroup>
                            )

                            }
                            />


                        </div>


                    </DialogContent>
                    <Divider />
                    <DialogActions sx={{ justifyContent: 'space-between', padding: '15px' }}>
                        <Box gap={2} display='flex'>
                            {
                                isLoading ?
                                    <LoadingButton loading variant='contained'></LoadingButton>
                                    :
                                    <Button variant='contained' type="submit">
                                        {
                                            productDto.id ? 'تعديل المنتج' : 'اضافة منتج'
                                        }
                                    </Button>
                            }

                            <Button variant='outlined' onClick={() => { dispatch(productActions.setProductDialog(false)); resetForm() }}>الغاء</Button>
                        </Box>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

