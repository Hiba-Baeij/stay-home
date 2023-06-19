import { Shop } from '@/api/shop/dto';
import { ShopApi } from '@/api/shop/endpoints';
import { AppDispatch, RootState } from '@/store';
import shop, { shopActions } from '@/store/shop';
import { Add, Close } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Upload from '../shared/Upload';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import { Area, settingActions } from '@/store/setting';
import { useQuery } from '@tanstack/react-query';
import { SettingApi } from '@/api/setting/endpoints';
// import TimePicker from "@mui/x-date-pickers"

export default function ShopComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const isOpen = useSelector<RootState>(state => state.shop.openDialogShop) as boolean;
    const shopDto = useSelector<RootState>(state => state.shop.shopDto) as Shop;
    const { handleSubmit, control, reset } = useForm({ defaultValues: { ...new Shop() } });
    const dispatch = useDispatch<AppDispatch>()
    const categories = useSelector<RootState>(state => state.setting.categories) as { name: string, id: string }[];
    const areas = useSelector<RootState>(state => state.setting.areas) as Area[];

    useQuery(['area'], SettingApi.fetchArea, {
        onSuccess: (data: { response: Area[]; }) => {
            dispatch(settingActions.setArea(data.response))
        },
    })
    useQuery(['category'], SettingApi.fetchCategory, {
        onSuccess: (data: { response: { name: string, id: string }[]; }) => {
            dispatch(settingActions.setCategory(data.response))
        },
    })
    const onSubmit = (data: Shop) => {
        if (data.id) {
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
            ShopApi.AddShop(data).then(() => {
                dispatch(shopActions.setShopDto({ ...data }))
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
    const resetForm = () => {
        reset({ ...new Shop() });
        // setImageUrl('')
        dispatch(shopActions.setShopDialog(false));
    }
    return (
        <div>
            <Button variant="contained" onClick={() => dispatch(shopActions.setShopDialog(true))}>
                إضافة متجر
                <Add></Add>
            </Button>
            <Dialog open={isOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center pl-4 ">
                        <DialogTitle>
                            {
                                shopDto.id ? 'تعديل المتجر' : 'اضافة المتجر'
                            }
                        </DialogTitle>
                        <IconButton onClick={() => { dispatch(shopActions.setShopDialog(false)); resetForm() }}><Close /></IconButton>
                    </div>
                    <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>
                        <div className='grid grid-cols-2 gap-5'>
                            <div className='col-span-2'>

                                <Controller rules={{ required: 'اسم المتجر مطلوب' }} name='name' control={control} render={({ field, fieldState }) =>
                                    <TextField error={!!fieldState.error}
                                        fullWidth
                                        helperText={fieldState.error?.message}
                                        {...field} name='name' id='employee-fullName' label='اسم المتجر'

                                    />
                                }
                                />
                            </div>
                            <div className='col-span-2'>
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
                                                areas.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                                            }

                                        </Select>
                                        <FormHelperText>
                                            {fieldState.error?.message}
                                        </FormHelperText>
                                    </FormControl>
                                } />
                            </div>
                            <div className='col-span-2'>
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
                            <div className='col-span-2'>
                                <InputLabel id="time-label">وقت الدوام</InputLabel>
                                <Controller rules={{ required: 'وقت الفتح مطلوب' }} name='workTimes' control={control} render={({ field, fieldState }) =>
                                    <FormControl fullWidth error={!!fieldState.error}>
                                        {/* <TimePicker label="وقت الفتح" /> */}
                                        <FormHelperText>
                                            {fieldState.error?.message}
                                        </FormHelperText>
                                    </FormControl>
                                } />
                                <Controller rules={{ required: 'وقت الاغلاق مطلوب' }} name='workTimes' control={control} render={({ field, fieldState }) =>
                                    <FormControl fullWidth error={!!fieldState.error}>
                                        {/* <TimePicker label="وقت الاغلاق" /> */}
                                        <FormHelperText>
                                            {fieldState.error?.message}
                                        </FormHelperText>
                                    </FormControl>
                                } />
                            </div>


                            {/* <div className='col-span-2'>
                                <label htmlFor="imageEmployee" className='pb-4'>صورة المتجر </label>
                                <Upload url={imageUrl} onChange={({ file, src }) => { setValue('imageFile', file), setImageUrl(src) }} name='image'></Upload>
                            </div> */}

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
                                            shopDto.id ? 'تعديل المتجر' : 'اضافة المتجر'
                                        }
                                    </Button>
                            }

                            <Button variant='outlined' onClick={() => { dispatch(shopActions.setShopDialog(false)); resetForm() }}>الغاء</Button>
                        </Box>
                    </DialogActions>

                </form>
            </Dialog>
        </div>
    )
}
