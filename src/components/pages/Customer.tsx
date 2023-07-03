import React, { useEffect, useState } from 'react'
import { Button, TextField, Select, MenuItem, Box, Divider, IconButton, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Add, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '@mui/lab/LoadingButton';
import { Customer } from '@/api/customer/dto';
import { CustomerApi } from '@/api/customer/endpoints';
import { customerActions } from '@/store/customer';

export default function DialogCustomer() {
    const [isLoading, setIsLoading] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const isOpen = useSelector<RootState>(state => state.customer.openDialogCustomer) as boolean;
    const customerDto = useSelector<RootState>(state => state.customer.customerDto) as Customer;
    const cities = useSelector<RootState>(state => state.setting.cities) as { name: string, id: string }[];
    const dispatch = useDispatch<AppDispatch>()
    const { handleSubmit, control, setValue, reset } = useForm<Customer>({
        defaultValues: { ...new Customer() }
    });

    useEffect(() => {
        console.log(customerDto);
        if (customerDto && customerDto.id) {
            console.log("in Effect modify");
            reset({ ...customerDto })
        }
    }, [customerDto])
    const onSubmit = (data: Customer) => {
        if (data.id) {
            setIsLoading(true)
            CustomerApi.ModifyCustomer(data).then((res) => {
                dispatch(customerActions.modifyCustomer(res.response))
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
            CustomerApi.AddCustomer(data).then(() => {
                dispatch(customerActions.setCustomerFormDto(data))
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
            }).catch((er: any) => {
                console.log(er);

                setIsLoading(false);
                toast.error(er.response.data.message, {
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
        reset({ ...new Customer(), id: '' });
        dispatch(customerActions.setCustomerDialog(false));
        dispatch(customerActions.resetForm());
    }
    const blockedCustomer = () => {
        setIsBlocked(!isBlocked);
        console.log(isBlocked);

        dispatch(customerActions.setBlocked(isBlocked))
    }
    return (
        <div>
            <Button variant="contained" onClick={() => dispatch(customerActions.setCustomerDialog(true))}>
                إضافة زبون
                <Add></Add>
            </Button>
            <Dialog open={isOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center pl-4 ">
                        <DialogTitle>
                            {
                                customerDto.id ? 'تعديل زبون' : 'اضافة زيون'
                            }
                        </DialogTitle>
                        <IconButton onClick={() => { dispatch(customerActions.setCustomerDialog(false)); resetForm() }}><Close /></IconButton>
                    </div>
                    <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>

                        <div className='grid grid-cols-2 gap-5 '>
                            <div className='col-span-2'>
                                <Controller rules={{ required: 'اسم الزبون مطلوب' }} name='fullName' control={control} render={({ field, fieldState }) =>
                                    <TextField error={!!fieldState.error} fullWidth
                                        helperText={fieldState.error?.message}
                                        {...field} name='fullName' id='customer-fullName' label='اسم الزبون'

                                    />
                                }
                                />
                            </div>
                            <div className='col-span-2'>
                                <Controller rules={{ required: 'رقم الموبايل مطلوب' }} name='phoneNumber' control={control} render={({ field, fieldState }) =>
                                    <TextField error={!!fieldState.error} fullWidth
                                        helperText={fieldState.error?.message}
                                        {...field} name='phoneNumber' id='customer-phoneNumber' label='رقم الموبايل'

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
                            <div className='col-span-2'>


                                <Controller rules={{ required: ' البريد الالكتروني مطلوب' }} name='email' control={control} render={({ field, fieldState }) =>
                                    <TextField error={!!fieldState.error}
                                        helperText={fieldState.error?.message} fullWidth
                                        {...field} name='email' id='email' label='البريد الالكتروني'

                                    />
                                }
                                />
                            </div>
                            <div className='col-span-2'>
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
                                            customerDto.id ? 'تعديل زبون' : 'اضافة زبون'
                                        }
                                    </Button>
                            }
                            {
                                customerDto.id ?
                                    <Button variant='outlined' color='secondary' onClick={blockedCustomer}>{customerDto.isBlock ? 'محظور' : 'غير محظور'}</Button> : null
                            }
                            <Button variant='outlined' onClick={() => { dispatch(customerActions.setCustomerDialog(false)); resetForm() }}>الغاء</Button>
                        </Box>
                    </DialogActions>

                </form>
            </Dialog>
        </div>


    )
}
