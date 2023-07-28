import { Days, Shop, WorkTimes } from '@/api/shop/dto';
import { ShopApi } from '@/api/shop/endpoints';
import { AppDispatch, RootState } from '@/store';
import { shopActions } from '@/store/shop';
import Product from '@/components/pages/product/ProductList';
import { IMAGE_URL } from '@/../app.config';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Box, Button, Card, CardContent, CardHeader, CardMedia, FormHelperText, InputLabel, LinearProgress, TextField, Typography } from '@mui/material';
import { FormControl, MenuItem, Select } from '@mui/material';
import { Area } from '@/store/setting';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Upload from '@/components/shared/Upload';
import AddProduct from '@/components/pages/product/AddProduct';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';

export default function shopDetails() {
    let { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [days, setDays] = useState<Days>(new Days());
    const [day, setDay] = React.useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigate();
    const swal = withReactContent(Swal);
    const areas = useSelector<RootState>(state => state.setting.areas) as Area[];
    const categories = useSelector<RootState>(state => state.setting.categories) as { name: string, id: string }[];
    const loadingProduct = useSelector<RootState>(state => state.product.isLoading) as boolean;
    const { handleSubmit, control, reset } = useForm({ defaultValues: { ...new Shop() } })
    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "workTimes", // unique name for your Field Array
    });
    useQuery({
        queryKey: ["shopDetails"],
        queryFn: () => ShopApi.getShopDetails(id as string),
        onSuccess: (data: { response: Shop }) => {
            dispatch(shopActions.setShopDto(data.response))
            reset({ ...data.response })
            setImageUrl(IMAGE_URL + data.response.imageUrl)
        },
    })
    const deleteShop = () => {
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
                ShopApi.DeleteShop([id as string]).then(() => {
                    dispatch(shopActions.deleteShop([id as string]))
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
                    navigation('/shops')
                }
                )
            }
        })

    }

    const handleChange = (event: any) => {
        console.log(event.target.value);

        setDay(event.target.value);
    };

    const resetForm = () => {
        reset({ ...new Shop() });
        setImageUrl('')
    }
    const onSubmit = (data: Shop) => {
        setIsLoading(true)
        ShopApi.ModifyShop(data).then((res) => {
            dispatch(shopActions.modifyShop({ ...res.response }))
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
            navigation('/shops')
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
    return (
        <div className=' p-3 pt-0'>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='flex justify-between items-center w-full gap-5 my-5'>

                    <div className='flex justify-start items-center gap-3'>

                        <StoreIcon></StoreIcon>
                        <h2 className='text-lg font-bold'> تفاصيل / المتجر </h2>
                    </div>
                    <div className='flex justify-center items-center gap-3'>
                        {

                            isLoading ? <LoadingButton loading variant='contained'></LoadingButton>
                                : <Button variant='contained' type='submit'>تعديل</Button>
                        }
                        <Button variant='outlined' color='error' onClick={() => deleteShop}>حذف</Button>
                        <Button variant='outlined' color='secondary' onClick={() => navigation('/shops')}>تراجع</Button>

                    </div>
                </div>
                <Card sx={{ padding: '10px' }}>

                    <CardContent>
                        <div className='grid grid-cols-6 gap-5'>
                            <div className='col-span-6 md:col-span-4'>
                                <div className='grid grid-cols-4 gap-5'>
                                    <div className='col-span-4 md:col-span-2'>
                                        <Controller rules={{ required: 'اسم المتجر مطلوب' }} name='name' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error} fullWidth
                                                helperText={fieldState.error?.message}
                                                {...field} name='name' id='shop-name' label='اسم المتجر'

                                            />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-4 md:col-span-2'>
                                        <Controller rules={{ required: 'يرجى اختيار المنطقة' }} name='areaId' control={control} render={({ field, fieldState }) =>
                                            <FormControl fullWidth error={!!fieldState.error}>
                                                <InputLabel id="area-id-label">اسم المنطقة</InputLabel>
                                                <Select
                                                    fullWidth
                                                    {...field}
                                                    name='areaId'
                                                    labelId="area-id-label"
                                                    label=" اسم المنطقة"
                                                >
                                                    {

                                                        areas.map((ar) => <MenuItem key={ar.id} value={ar.id ? ar.id : ''}>{ar.name}</MenuItem>)
                                                    }

                                                </Select>
                                                <FormHelperText>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        } />
                                    </div>
                                    <div className='col-span-4 md:col-span-2'>
                                        <Controller rules={{ required: 'يرجى اختيار التصنيف' }} name='categoryId' control={control} render={({ field, fieldState }) =>
                                            <FormControl fullWidth error={!!fieldState.error}>
                                                <InputLabel id="city-id-label">اسم التصنيف</InputLabel>
                                                <Select
                                                    {...field}
                                                    name='cityId'
                                                    labelId="city-id-label"
                                                    label=" اسم التصنيف"
                                                >
                                                    {
                                                        categories.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)
                                                    }

                                                </Select>
                                                <FormHelperText>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        } />
                                    </div>
                                    <div className='col-span-4'>
                                        <div className='mb-5 flex justify-between items-center'>
                                            <InputLabel id="time-label">اوقات الدوام</InputLabel>
                                            <Button onClick={() => append({ ...new WorkTimes() })}>
                                                <ControlPointIcon color='success'></ControlPointIcon>
                                            </Button>
                                        </div>
                                        {fields.map((item, index) =>
                                        (
                                            <div className='grid grid-cols-3 gap-5 mt-3' key={item.id}>

                                                <div className='md:col-span-1 col-span-3'>



                                                    <label> اليوم :</label>
                                                    <Controller rules={{ required: ' اليوم مطلوب' }} name={`workTimes.${index}.dayOfWeek`} control={control} render={({ field, fieldState }) =>
                                                        <FormControl fullWidth error={!!fieldState.error}>

                                                            <Select
                                                                fullWidth
                                                                {...field}
                                                                name={`workTimes.${index}.dayOfWeek`}
                                                                labelId={`workTimes.${index}.dayOfWeek`}
                                                                sx={{ marginTop: '10px' }}
                                                                onChange={handleChange}
                                                                value={day}
                                                            >
                                                                {

                                                                    days.days.map((day) => <MenuItem key={day.id} value={day.id}>{day.id}</MenuItem>)
                                                                }

                                                            </Select>
                                                            <FormHelperText>
                                                                {fieldState.error?.message}
                                                            </FormHelperText>
                                                        </FormControl>
                                                    } />


                                                </div>
                                                <div className='md:col-span-1 col-span-3'>
                                                    <label>وقت البدء :</label>
                                                    <Controller rules={{ required: 'وقت الفتح مطلوب' }} name={`workTimes.${index}.startTime.ticks`} control={control} render={({ field, fieldState }) =>
                                                        <TextField error={!!fieldState.error} fullWidth
                                                            helperText={fieldState.error?.message}
                                                            {...field} name={`workTimes.${index}.startTime.ticks`} id={`workTimes_startTime_${index}`}
                                                            type='time'
                                                            inputProps={{
                                                                step: "2"
                                                            }}
                                                            sx={{ marginTop: '10px' }}

                                                        />

                                                    } />
                                                </div>
                                                <div className='md:col-span-1 col-span-3 flex justify-between items-center gap-4'>

                                                    <div>

                                                        <label>وقت الاغلاق :</label>


                                                        <Controller rules={{ required: 'وقت الاغلاق مطلوب' }} name={`workTimes.${index}.endTime.ticks`} control={control} render={({ field, fieldState }) =>

                                                            <TextField error={!!fieldState.error} fullWidth
                                                                helperText={fieldState.error?.message}
                                                                {...field}
                                                                inputProps={{
                                                                    step: "2"
                                                                }}
                                                                type='time'
                                                                name={`workTimes.${index}.endTime.ticks`} id={`workTimes_endTime_${index}`}
                                                                sx={{ marginTop: '10px' }}
                                                            />

                                                        } />
                                                    </div>

                                                    <button type="button" onClick={() => remove(index)} className='mt-7 ml-4'>
                                                        <DeleteOutlineIcon color='error'></DeleteOutlineIcon>
                                                    </button>


                                                </div>

                                            </div>

                                        )

                                        )}
                                    </div>

                                </div>
                            </div>
                            <div className='col-span-6 md:col-span-2'>
                                <Controller rules={{ required: 'يرجى رفع صورة' }}
                                    control={control} name='imageFile' render={({ field, fieldState }) =>

                                        <FormControl error={!!fieldState.error} fullWidth>
                                            <Upload {...field} url={imageUrl} onChangeUrl={setImageUrl} name='image' label='صورة المتجر'></Upload>
                                            <FormHelperText>
                                                {fieldState.error?.message}
                                            </FormHelperText>
                                        </FormControl>
                                    }
                                />
                            </div>

                        </div>
                    </CardContent>
                </Card>
                <Card sx={{ marginTop: '25px' }}>
                    {
                        loadingProduct ?
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box> : null
                    }
                    <div className='flex justify-between items-center mx-6 my-4'>

                        <h2 className=' text-lg'>المنتجات</h2>
                        <AddProduct shopId={id as string} />
                    </div>
                    <Product shopId={id as string} />
                </Card>

            </form>

        </div>
    )
}

