import React, { useEffect, useState } from 'react'
import { Button, TextField, Select, MenuItem, Box, Divider, IconButton, LinearProgress, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import Upload from '@/components/shared/Upload';
import { Customer, CustomerDto } from '@/api/customer/dto';
import { CustomerApi } from '@/api/customer/endpoints';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { customerActions } from '@/store/customer';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate, useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useQuery } from '@tanstack/react-query';
import { Area } from '@/store/setting';
export default function CustomerDetails() {
    let { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const swal = withReactContent(Swal)
    const customerDto = useSelector<RootState>(state => state.customer.customerDto) as CustomerDto;
    const dispatch = useDispatch<AppDispatch>()
    const cities = useSelector<RootState>(state => state.setting.cities) as { name: string, id: string }[];
    const areas = useSelector<RootState>(state => state.setting.areas) as Area[];

    const { handleSubmit, control, setValue, reset } = useForm<CustomerDto>({
        defaultValues: { ...new CustomerDto() }
    });
    // useEffect(() => {
    //     if (customerDto.id) {
    //         console.log("in Effect modify");
    //         setImageUrl(customerDto.imageUrl ? customerDto.imageUrl : '');
    //         reset({ ...customerDto })
    //     }
    // }, [])

    const { isLoading: dataLoading } = useQuery({
        queryKey: ["customerDetails"],
        queryFn: () => CustomerApi.getCustomerDetails(id as string),
        enabled: id !== "0",
        onSuccess: (data: { response: CustomerDto }) => {
            dispatch(customerActions.setCustomerFormDto({ ...data.response, birthDate: moment(data.response.birthDate).format('YYYY-MM-DD') }))
            reset({ ...data.response, birthDate: moment(data.response.birthDate).format('YYYY-MM-DD') })

        },
    });

    const onSubmit = (data: CustomerDto) => {
        if (id != "0") {
            setIsLoading(true)
            CustomerApi.ModifyCustomer(data).then(() => {
                dispatch(customerActions.setCustomerFormDto({ ...data }))
                setIsLoading(false)
                resetForm();
                toast('تمت تعديل بنجاح', {
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
        else {
            setIsLoading(true)
            CustomerApi.AddCustomer(data).then(() => {
                dispatch(customerActions.addMoreCustomer({ ...data }))
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
    };
    const resetForm = () => {
        reset({ ...new CustomerDto() });
        setImageUrl('')
    }
    const deleteCustomer = () => {
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
                CustomerApi.DeleteCustomer([id] as string[]).then(() => {
                    dispatch(customerActions.deleteCustomer([id] as string[]))
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='p-4'>

                <div className='flex justify-between items-center w-full gap-5 '>

                    <div className='flex justify-start items-center gap-3'>

                        <PersonIcon></PersonIcon>
                        <h2 className='text-lg font-bold'> {customerDto.id ? 'تفاصيل / الزبون' : 'اضافة الزبون'} </h2>

                    </div>
                    <Box gap={2} display='flex' sx={{ marginY: '20px' }}>
                        {
                            isLoading ?
                                <LoadingButton loading variant='contained'></LoadingButton>
                                :
                                <Button variant='contained' type="submit">إضافة زبون</Button>
                        }
                        {
                            customerDto.id ?
                                <Button color={customerDto.isBlock ? 'error' : 'success'} variant='outlined' >{customerDto.isBlock ? 'محظور' : 'غير محظور'}</Button> : null
                        }
                        <Button color='error' variant='outlined' onClick={deleteCustomer}>حذف</Button>
                        <Button color='secondary' variant='outlined' onClick={() => { navigation('/customers'); resetForm() }}>تراجع</Button>
                    </Box>
                </div>


                <Card>
                    {
                        dataLoading && id !== '0' ?
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box> : null
                    }
                    {/* {JSON.stringify(customerDto)} */}
                    <CardContent>

                        <div className='grid grid-cols-5 gap-5 '>
                            <div className='col-span-3'>

                                <div className='grid grid-cols-2 gap-5 '>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: 'اسم الزبون مطلوب' }} name='fullName' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error} fullWidth
                                                helperText={fieldState.error?.message}
                                                {...field} name='fullName' id='employee-fullName' label='اسم الزبون'

                                            />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: 'رقم الموبايل مطلوب' }} name='phoneNumber' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error} fullWidth
                                                helperText={fieldState.error?.message}
                                                {...field} name='phoneNumber' id='employee-phoneNumber' label='رقم الموبايل'

                                            />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: ' تاريخ الميلاد مطلوب' }} name='birthDate' control={control} render={({ field, fieldState }) =>
                                            <TextField type='date' label='تاريح الميلاد ' error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='birthDate' id='birthDate' sx={{ width: '100%' }} />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>

                                        <Controller rules={{ required: 'كلمة المرور مطلوبة' }} name='password' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='password' id='password' label='كلمة المرور' fullWidth

                                            />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>


                                        <Controller rules={{ required: ' البريد الالكتروني مطلوب' }} name='email' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message} fullWidth
                                                {...field} name='email' id='email' label='البريد الالكتروني'

                                            />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: 'يرجى اختيار المدينة' }} name='cityId' control={control} render={({ field, fieldState }) =>
                                            <FormControl fullWidth error={!!fieldState.error}>
                                                <InputLabel id="city-id-label">اسم المدينة</InputLabel>
                                                <Select
                                                    {...field}
                                                    name='cityId'
                                                    labelId="city-id-label"
                                                    label=" اسم المدينة"
                                                >
                                                    {
                                                        cities.map((c) => <MenuItem key={c.id} value={c.id ? c.id : ''}>{c.name}</MenuItem>)
                                                    }

                                                </Select>
                                                <FormHelperText>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        } />
                                    </div>

                                    <div className='col-span-2'>
                                        تفاصيل العنوان
                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: '  العنوان مطلوب' }} name='address.name' control={control} render={({ field, fieldState }) =>
                                            <TextField label='اسم العنوان ' error={!!fieldState.error} fullWidth
                                                helperText={fieldState.error?.message}
                                                {...field} name='address.name' id='addressName' sx={{ width: '100%' }} />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: 'يرجى اختيار المنطقة' }} name='address.areaId' control={control} render={({ field, fieldState }) =>
                                            <FormControl fullWidth error={!!fieldState.error}>
                                                <InputLabel id="area-id-label">اسم المنطقة</InputLabel>
                                                <Select
                                                    fullWidth
                                                    {...field}
                                                    name='address.areaId'
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
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: '  رقم المنزل مطلوب' }} name='address.houseNumber' control={control} render={({ field, fieldState }) =>
                                            <TextField label='رقم المنزل ' error={!!fieldState.error} fullWidth
                                                helperText={fieldState.error?.message}
                                                {...field} name='houseNumber' id='houseNumber' sx={{ width: '100%' }} />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: '   الشارع مطلوب' }} name='address.street' control={control} render={({ field, fieldState }) =>
                                            <TextField label=' الشارع ' error={!!fieldState.error}
                                                helperText={fieldState.error?.message} fullWidth
                                                {...field} name='address.street' id='street' sx={{ width: '100%' }} />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: 'طابق مطلوب' }} name='address.floor' control={control} render={({ field, fieldState }) =>
                                            <TextField label=' طابق ' error={!!fieldState.error}
                                                helperText={fieldState.error?.message} fullWidth
                                                {...field} name='floor' id='floor' sx={{ width: '100%' }} />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-2'>
                                        <Controller name='address.additional' control={control} render={({ field, fieldState }) =>
                                            <TextField label=' ملاحظات اضافية ' error={!!fieldState.error}
                                                helperText={fieldState.error?.message} fullWidth
                                                {...field} name='additional' id='address.additional' sx={{ width: '100%' }} />

                                        }
                                        />

                                    </div>
                                </div>
                            </div>

                            <div className='col-span-2'>
                                <h4 className='pb-4'>صورة الزبون </h4>
                                <Controller control={control} name='imageFile' render={({ field, fieldState }) => <Upload  {...field} onChangeUrl={(e) => { setImageUrl(e) }} url={imageUrl}  ></Upload>} />
                            </div>

                        </div>
                    </CardContent>
                </Card>

            </form>
        </div>


    )
}
