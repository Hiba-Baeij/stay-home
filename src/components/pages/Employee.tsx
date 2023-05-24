import React, { useState } from 'react'
import { Button, FormControl, FormHelperText, InputLabel, TextField, Select, MenuItem, Table } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import Upload from '../shared/Upload';
import { AddEmployee } from '@/api/employee/dto';

export default function DialogEmployee() {

    const { handleSubmit, control, setValue } = useForm<Omit<AddEmployee, 'imageUrl'>>({
        defaultValues: { ...new AddEmployee() }
    });
    const onSubmit = (data: any) => console.log(data);
    const [imageUrl, setImageUrl] = useState('');
    // const saveData = () => {
    //     console.log("save data and more");
    // }
    // const closeDialog = () => {
    //     props.isOpenDialog = false
    // }
    // const resetDialog = () => {
    //     console.log("reset dialog");
    // }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                        {...field} name='phoneNumber' id='employee-phoneNumber' label='اسم الموظف'
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

                <Controller rules={{ required: ' تاريخ الميلاد مطلوب' }} name='birthDate' control={control} render={({ field, fieldState }) =>
                    <TextField type='date' label='تاريح الميللاد ' />
                }
                />
                <div className='col-span-2'>
                    <label htmlFor="imageEmployee" className='pb-4'>صورة الموظف </label>
                    <Upload url={imageUrl} onChange={({ file, src }) => { setValue('imageFile', file), setImageUrl(src) }} name='image'></Upload>
                </div>
            </div>

        </form>

    )
}
