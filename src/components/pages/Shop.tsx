import { Days, Shop, WorkTimes } from '@/api/shop/dto';
import { ShopApi } from '@/api/shop/endpoints';
import { AppDispatch, RootState } from '@/store';
import shop, { shopActions } from '@/store/shop';
import { Add, Close, Label } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, Icon, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Upload from '../shared/Upload';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton } from '@mui/lab';
import { Area, settingActions } from '@/store/setting';
import { useQuery } from '@tanstack/react-query';
import { SettingApi } from '@/api/setting/endpoints';
import { IMAGE_URL } from 'app.config';
// import TimePicker from "@mui/x-date-pickers"

export default function ShopComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const [days, setDays] = useState<Days>(new Days());
    const [day, setDay] = React.useState('');

    const [imageUrl, setImageUrl] = useState('');
    const isOpen = useSelector<RootState>(state => state.shop.openDialogShop) as boolean;
    const shopDto = useSelector<RootState>(state => state.shop.shopDto) as Shop;
    const { handleSubmit, control, reset } = useForm({ defaultValues: { ...new Shop() } });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "workTimes",
    });

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
            ShopApi.AddShop(data).then((res) => {
                dispatch(shopActions.addShopDto(res.response))
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

        setDay(event.target.value);
    };

    const resetForm = () => {
        reset({ ...new Shop() });
        setImageUrl('')
        dispatch(shopActions.setShopDialog(false));
        dispatch(shopActions.resetForm());
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

                                                areas.map((ar) => <MenuItem key={ar.id} value={ar.id ? ar.id : ''}>{ar.name}</MenuItem>)
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
                                <div className='mb-5 flex justify-between items-center'>
                                    <InputLabel id="time-label">اوقات الدوام</InputLabel>
                                    <Button onClick={() => append({ ...new WorkTimes() })}>
                                        <ControlPointIcon color='success'></ControlPointIcon>
                                    </Button>
                                </div>
                                {fields.map((item, index) =>
                                (
                                    <div className='grid grid-cols-3 gap-5 mt-3' key={item.id}>

                                        <div className='md:col-span-1 col-span-3 flex justify-center items-center'>
                                            <button type="button" onClick={() => remove(index)} className='mt-7 ml-4'>
                                                <DeleteOutlineIcon color='error'></DeleteOutlineIcon>
                                            </button>
                                            <div>

                                                <label> اليوم :</label>
                                                {/* {day} */}
                                                <Controller rules={{ required: ' اليوم مطلوب' }} name={`workTimes.${index}.dayOfWeek`} control={control} render={({ field, fieldState }) =>
                                                    <FormControl fullWidth error={!!fieldState.error}>

                                                        <Select
                                                            fullWidth
                                                            {...field}
                                                            name={`workTimes.${index}.dayOfWeek`}
                                                            labelId={`workTimes.${index}.dayOfWeek`}
                                                            sx={{ marginTop: '10px' }}

                                                        >
                                                            {

                                                                days.days.map((day) => <MenuItem key={day.value} value={day.value}>{day.title}</MenuItem>)
                                                            }

                                                        </Select>
                                                        <FormHelperText>
                                                            {fieldState.error?.message}
                                                        </FormHelperText>
                                                    </FormControl>
                                                } />

                                            </div>

                                        </div>
                                        <div className='md:col-span-1 col-span-3'>
                                            <label>وقت البدء :</label>
                                            <Controller rules={{ required: 'وقت الفتح مطلوب' }} name={`workTimes.${index}.startTime`} control={control} render={({ field, fieldState }) =>
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
                                        <div className='md:col-span-1 col-span-3'>
                                            <label>وقت الاغلاق :</label>

                                            <Controller rules={{ required: 'وقت الاغلاق مطلوب' }} name={`workTimes.${index}.endTime`} control={control} render={({ field, fieldState }) =>

                                                <TextField error={!!fieldState.error} fullWidth
                                                    helperText={fieldState.error?.message}
                                                    {...field}
                                                    type='time'
                                                    inputProps={{
                                                        step: "2"
                                                    }}
                                                    name={`workTimes.${index}.endTime.ticks`} id={`workTimes_endTime_${index}`}
                                                    sx={{ marginTop: '10px' }}
                                                />

                                            } />


                                        </div>

                                    </div>

                                )

                                )}
                            </div>


                            <div className='col-span-2'>
                                {/* rules={{ required: 'يرجى رفع صورة' }} */}
                                <Controller
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
