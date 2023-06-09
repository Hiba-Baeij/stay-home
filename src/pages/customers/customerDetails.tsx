import React, { useEffect, useState } from 'react'
import { Button, TextField, Select, MenuItem, Box, Divider, IconButton } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import Upload from '@/components/shared/Upload';
import { Customer, CustomerDto } from '@/api/customer/dto';
import { CustomerApi } from '@/api/customer/endpoints';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Add, Close } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { customerActions } from '@/store/customer';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useParams } from 'react-router-dom';

export default function CustomerDetails() {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let { id } = useParams();
    const isOpen = useSelector<RootState>(state => state.customer.openDialogCustomer) as boolean;
    const customerDto = useSelector<RootState>(state => state.customer.customerDto) as CustomerDto;
    const dispatch = useDispatch<AppDispatch>()
    const { handleSubmit, control, setValue, reset } = useForm<Customer>({
        defaultValues: { ...new Customer() }
    });
    useEffect(() => {
        if (customerDto.id) {
            console.log("in Effect modify");
            setImageUrl(customerDto.imageUrl ? customerDto.imageUrl : '')
        }
    }, [])
    const onSubmit = (data: CustomerDto) => {
        if (data.id) {
            // EmployeeApi.(data).then((res) => {
            //     employees.unshift(res.response)
            // })
        }
        else {
            setIsLoading(true)
            CustomerApi.AddCustomer(data).then(() => {
                customerActions.setCustomerFormDto(data)
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
            })
        }
    };
    const resetForm = () => {
        reset({ ...new Customer() });
        setImageUrl('')
        dispatch(customerActions.setCustomerDialog(false));
    }

    return (
        <div>

            {id}
            <Card>

                <CardHeader title='اضافة زبون' />
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <Controller rules={{ required: '  رقم البيت مطلوب' }} name='houseNumber' control={control} render={({ field, fieldState }) =>
                                            <TextField label='رقم البيت ' error={!!fieldState.error} fullWidth
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
                                <label htmlFor="imageEmployee" className='pb-4'>صورة الزبون </label>
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
                            <Button onClick={() => { dispatch(customerActions.setCustomerDialog(false)); resetForm() }}>الغاء</Button>
                        </Box>
                    </CardActions>

                </form>
            </Card>

        </div>


    )
}
