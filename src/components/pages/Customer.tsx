import React, { useEffect, useState } from 'react'
import { Button, TextField, Select, MenuItem, Box, Divider, IconButton } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import Upload from '../shared/Upload';
import { Customer, CustomerDto } from '@/api/customer/dto';
import { CustomerApi } from '@/api/customer/endpoints';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Add, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { customerActions } from '@/store/customer';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useParams } from 'react-router-dom';

export default function DialogCustomer() {
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
            <Button variant="contained" onClick={() => dispatch(customerActions.setCustomerDialog(true))}>
                إضافة موظف
                <Add></Add>
            </Button>
            {id}
            {/* <Dialog open={isOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center pl-4 ">
                        <DialogTitle>إضافة موظف</DialogTitle>
                        <IconButton onClick={() => { dispatch(customerActions.setCustomerDialog(false)); resetForm() }}><Close /></IconButton>
                    </div>
                    <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4 '>
                        <div className='grid grid-cols-2 gap-5 '>
                            <Controller rules={{ required: 'اسم الموظف مطلوب' }} name='fullName' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='fullName' id='employee-fullName' label='اسم الموظف'
                                    value={employeeDto.fullName}
                                />
                            }
                            />
                            <Controller rules={{ required: 'رقم الموبايل مطلوب' }} name='phoneNumber' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='phoneNumber' id='employee-phoneNumber' label='رقم الموبايل'
                                    value={employeeDto.phoneNumber}
                                />
                            }
                            />

                            <Controller rules={{ required: 'كلمة المرور مطلوبة' }} name='password' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='password' id='password' label='كلمة المرور'
                                    value={employeeDto.password}
                                />
                            }
                            />

                            <Controller rules={{ required: ' البريد الالكتروني مطلوب' }} name='email' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='email' id='email' label='البريد الالكتروني'
                                    value={employeeDto.email}
                                />
                            }
                            />
                            <div className='col-span-2'>
                                <Controller rules={{ required: ' تاريخ الميلاد مطلوب' }} name='birthDate' control={control} render={({ field, fieldState }) =>
                                    <TextField type='date' label='تاريح الميلاد ' error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        {...field} name='birthDate' id='birthDate' sx={{ width: '100%' }} value={employeeDto.birthDate} />
                                }
                                />
                            </div>
                            <div className='col-span-2'>
                                <label htmlFor="imageEmployee" className='pb-4'>صورة الموظف </label>
                                <Upload url={imageUrl} onChange={({ file, src }) => { setValue('imageFile', file), setImageUrl(src) }} name='image'></Upload>
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
                                    <Button variant='contained' type="submit">إضافة موظف</Button>
                            }
                            <Button onClick={() => { dispatch(customerActions.setCustomerDialog(false)); resetForm() }}>الغاء</Button>
                        </Box>
                    </DialogActions>

                </form>
            </Dialog> */}
        </div>


    )
}
