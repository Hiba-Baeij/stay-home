import React, { useEffect, useState } from 'react'
import { Button, TextField, Select, MenuItem, Box, Divider, IconButton, LinearProgress } from '@mui/material'
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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useQuery } from '@tanstack/react-query';

export default function CustomerDetails() {
    let { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const swal = withReactContent(Swal)
    const customerDto = useSelector<RootState>(state => state.customer.customerDto) as CustomerDto;
    const dispatch = useDispatch<AppDispatch>()
    const { handleSubmit, control, setValue, reset } = useForm<Customer>({
        defaultValues: { ...new Customer() }
    });
    useEffect(() => {
        if (customerDto.id) {
            console.log("in Effect modify");
            setImageUrl(customerDto.imageUrl ? customerDto.imageUrl : '');
            reset({ ...customerDto })
        }
    }, [])

    const { isLoading: dataLoading } = useQuery({
        queryKey: ["customerDetails"],
        queryFn: () => CustomerApi.getCustomerDetails(id as string),
        enabled: id !== "0",
        onSuccess: (data: { response: CustomerDto }) => {
            dispatch(customerActions.setCustomerFormDto(data.response))
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

            {/* {id} */}
            <div className='flex justify-start items-center gap-3 my-5'>

                <PersonIcon></PersonIcon>
                <h2 className='text-lg font-bold'> {customerDto.id ? 'تفاصيل / الزبون' : 'اضافة الزبون'} </h2>
            </div>
            <Card>
                {
                    dataLoading && id !== '0' ?
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box> : null
                }
                {JSON.stringify(customerDto)}
                <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
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
                                            <TextField label='تاريح الميلاد ' error={!!fieldState.error}
                                                helperText={fieldState.error?.message} fullWidth
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
                                        <Controller rules={{ required: '  العنوان مطلوب' }} name='name' control={control} render={({ field, fieldState }) =>
                                            <TextField label='اسم العنوان ' error={!!fieldState.error} fullWidth
                                                helperText={fieldState.error?.message}
                                                {...field} name='addressName' id='addressName' sx={{ width: '100%' }} />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: '  رقم المنزل مطلوب' }} name='houseNumber' control={control} render={({ field, fieldState }) =>
                                            <TextField label='رقم المنزل ' error={!!fieldState.error} fullWidth
                                                helperText={fieldState.error?.message}
                                                {...field} name='houseNumber' id='houseNumber' sx={{ width: '100%' }} />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: '   الشارع مطلوب' }} name='houseNumber' control={control} render={({ field, fieldState }) =>
                                            <TextField label=' الشارع ' error={!!fieldState.error}
                                                helperText={fieldState.error?.message} fullWidth
                                                {...field} name='houseNumber' id='houseNumber' sx={{ width: '100%' }} />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>
                                        <Controller rules={{ required: '   طابق مطلوب' }} name='floor' control={control} render={({ field, fieldState }) =>
                                            <TextField label=' طابق ' error={!!fieldState.error}
                                                helperText={fieldState.error?.message} fullWidth
                                                {...field} name='floor' id='floor' sx={{ width: '100%' }} />
                                        }
                                        />
                                    </div>
                                    <div className='col-span-2'>
                                        <TextField label=' ملاحظات اضافية ' name='additional' id='additional' sx={{ width: '100%' }} />

                                    </div>
                                </div>
                            </div>

                            <div className='col-span-2'>
                                <h4 className='pb-4'>صورة الزبون </h4>
                                <Upload url={imageUrl} onChange={({ file, src }) => { setValue('imageFile', file), setImageUrl(src) }} name='image'></Upload>
                            </div>

                        </div>
                    </CardContent>
                    <CardActions>
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
                    </CardActions>

                </form>
            </Card>

        </div>


    )
}
