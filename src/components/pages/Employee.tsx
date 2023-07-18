import React, { useEffect, useState } from 'react'
import { Button, TextField, Select, MenuItem, Box, Divider, IconButton, FormControlLabel, Switch } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from '@mui/lab/LoadingButton';
import Upload from '@/components/shared/Upload';
import { IMAGE_URL } from '@/../app.config';

export default function DialogEmployee() {
    const [imageUrl, setImageUrl] = useState('');
    // const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
    const isOpen = useSelector<RootState>(state => state.employee.openDialogEmployee) as boolean;
    const employeeDto = useSelector<RootState>(state => state.employee.employeeDto) as Employee;
    const dispatch = useDispatch<AppDispatch>()
    const { handleSubmit, control, setValue, reset } = useForm<Employee>({
        defaultValues: { ...new Employee() }
    });

    useEffect(() => {
        console.log(employeeDto);
        if (employeeDto && employeeDto.id) {
            console.log("in Effect modify");
            setImageUrl(IMAGE_URL + employeeDto.imageUrl);
            reset({ ...employeeDto })
        }
    }, [employeeDto])
    const onSubmit = (data: Employee) => {
        if (data.id) {
            setIsLoading(true)
            EmployeeApi.ModifyEmpolyee(data).then((res) => {
                dispatch(employeeActions.modifyEmployee({ ...res.response }))
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
        reset({ ...new Employee(), id: '' });
        setImageUrl('')
        dispatch(employeeActions.setEmployeeDialog(false));
        dispatch(employeeActions.resetForm());
    }

    const modifyBlockEmployee = (blocked: boolean) => {
        EmployeeApi.BlockEmpolyee(employeeDto.id as string).then(() => {
            if (blocked) dispatch(employeeActions.modifyEmployee({ ...employeeDto, isBlock: true }))
            else dispatch(employeeActions.modifyEmployee({ ...employeeDto, isBlock: false }))
            dispatch(employeeActions.setEmployeeDialog(false));
            dispatch(employeeActions.resetForm());

            toast(blocked ? 'تم الحظر بنجاح' : 'تم رفع الحظر بنجاح', {
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
    // const unBlockedEmployee = () => {
    //     EmployeeApi.BlockEmpolyee(employeeDto.id as string).then(() => {
    //         dispatch(employeeActions.modifyEmployee({ ...employeeDto, isBlock: false }))
    //         dispatch(employeeActions.setEmployeeDialog(false));
    //         dispatch(employeeActions.resetForm());

    //         toast('تم رفع الحظر بنجاح', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             progress: undefined,
    //             theme: "light",
    //             type: 'success'
    //         })
    //     })
    // }

    return (
        <div>
            <Button variant="contained" onClick={() => dispatch(employeeActions.setEmployeeDialog(true))}>
                إضافة موظف
                <Add></Add>
            </Button>
            <Dialog open={isOpen} sx={{
                '&::-webkit-scrollbar': {
                    width: '12px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f5f5f5',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',
                },
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center pl-4 ">
                        <DialogTitle>
                            {
                                employeeDto.id ? 'تعديل الموظف' : 'اضافة موظف'
                            }
                        </DialogTitle>
                        <IconButton onClick={() => { dispatch(employeeActions.setEmployeeDialog(false)); resetForm() }}><Close /></IconButton>
                    </div>
                    <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>

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
                                {/* <label htmlFor="imageEmployee" className='pb-4'>صورة الموظف </label> */}
                                {/* <Upload onChange={(file: null | File) => { setImageFile(file) }} url={imageUrl} onChangeUrl={setImageUrl} name='image' label='صورة الموظف'></Upload> */}
                                <Controller control={control} name='imageFile' render={({ field, fieldState }) => <Upload  {...field} onChangeUrl={(e) => { setImageUrl(e) }} url={imageUrl}  ></Upload>}
                                />
                                {/* <Upload url={imageUrl} onChange={({ file, src }) => { setValue('imageFile', file), setImageUrl(src) }} name='image'></Upload> */}
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
                                            employeeDto.id ? 'تعديل الموظف' : 'اضافة موظف'
                                        }
                                    </Button>
                            }
                            {
                                employeeDto.id ?
                                    <>{employeeDto.isBlock ? <Button variant='outlined' color='error' onClick={() => modifyBlockEmployee(false)}>محظور</Button>
                                        : <Button variant='outlined' color='secondary' onClick={() => modifyBlockEmployee(true)}>غير محظور</Button>}</> : null
                            }
                            <Button variant='outlined' onClick={() => { dispatch(employeeActions.setEmployeeDialog(false)); resetForm() }}>الغاء</Button>
                        </Box>
                    </DialogActions>

                </form>
            </Dialog>
        </div>


    )
}
