import React, { useEffect, useState } from 'react'
import { Button, TextField, Select, MenuItem, Box, Divider, IconButton } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import Upload from '../shared/Upload';
import { Employee } from '@/api/employee/dto';
import { EmployeeApi } from '@/api/employee/endpoints';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Add, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import employee, { employeeActions } from '@/store/employee';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '@mui/lab/LoadingButton';

export default function DialogEmployee() {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isOpen = useSelector<RootState>(state => state.employee.openDialogEmployee) as boolean;
    const employeeDto = useSelector<RootState>(state => state.employee.employeeDto) as Employee;
    const dispatch = useDispatch<AppDispatch>()
    const { handleSubmit, control, setValue, reset } = useForm<Employee>({
        defaultValues: { ...new Employee() }
    });
    useEffect(() => {
        if (employeeDto.id) {
            console.log("in Effect modify");
            setImageUrl(employeeDto.imageUrl)
        }
    }, [])
    const onSubmit = (data: Employee) => {
        if (data.id) {
            // EmployeeApi.(data).then((res) => {
            //     employees.unshift(res.response)
            // })
        }
        else {
            console.log(data);

            setIsLoading(true)
            EmployeeApi.AddEmpolyee(data).then(() => {
                dispatch(employeeActions.setEmployeeFormDto({ ...data }))
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
        reset({ ...new Employee() });
        setImageUrl('')
        dispatch(employeeActions.setEmployeeDialog(false));
    }

    return (
        <div>
            <Button variant="contained" onClick={() => dispatch(employeeActions.setEmployeeDialog(true))}>
                إضافة موظف
                <Add></Add>
            </Button>
            <ToastContainer />
            <Dialog open={isOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center pl-4 ">
                        <DialogTitle>إضافة موظف</DialogTitle>
                        <IconButton onClick={() => { dispatch(employeeActions.setEmployeeDialog(false)); resetForm() }}><Close /></IconButton>
                    </div>
                    <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4 '>

                        <div className='grid grid-cols-2 gap-5 '>
                            <Controller rules={{ required: 'اسم الموظف مطلوب' }} name='fullName' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='fullName' id='employee-fullName' label='اسم الموظف'

                                />
                            }
                            />
                            <Controller rules={{ required: 'رقم الموبايل مطلوب' }} name='phoneNumber' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='phoneNumber' id='employee-phoneNumber' label='رقم الموبايل'

                                />
                            }
                            />

                            <Controller rules={{ required: 'كلمة المرور مطلوبة' }} name='password' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='password' id='password' label='كلمة المرور'

                                />
                            }
                            />

                            <Controller rules={{ required: ' البريد الالكتروني مطلوب' }} name='email' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='email' id='email' label='البريد الالكتروني'

                                />
                            }
                            />
                            <div className='col-span-2'>
                                <Controller rules={{ required: ' تاريخ الميلاد مطلوب' }} name='birthDate' control={control} render={({ field, fieldState }) =>
                                    <TextField type='date' label='تاريح الميلاد ' error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        {...field} name='birthDate' id='birthDate' sx={{ width: '100%' }} />
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
                            <Button onClick={() => { dispatch(employeeActions.setEmployeeDialog(false)); resetForm() }}>الغاء</Button>
                        </Box>
                    </DialogActions>

                </form>
            </Dialog>
        </div>


    )
}
