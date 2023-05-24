import React, { useState } from 'react'
import { Button, FormControl, FormHelperText, InputLabel, TextField, Select, MenuItem, Table } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { Add } from '@mui/icons-material';
import Upload from '../shared/Upload';
import { AddEmployee } from '@/api/employee/dto';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export default function DialogEmployee() {

    const { handleSubmit, control, setValue } = useForm<Omit<AddEmployee, 'imageUrl'>>({
        defaultValues: { ...new AddEmployee() }
    });
    const onSubmit = (data: any) => console.log(data);
    const [phoneNumbers, setPhoneNumbers] = useState<string[]>([''])
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
    const addMorePhone = () => {
        setPhoneNumbers(prevItems => [...prevItems, ''])
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-5 '>
                <Controller rules={{ required: 'اسم الموظف مطلوب' }} name='firstName' control={control} render={({ field, fieldState }) =>
                    <TextField error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field} name='firstName' id='employee-firstName' label='اسم الموظف'
                    />
                }
                />
                <Controller rules={{ required: 'كنية الموظف مطلوب' }} name='lastName' control={control} render={({ field, fieldState }) =>
                    <TextField error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field} name='lastName' id='employee-lastName' label='كنية الموظف'
                    />
                }
                />
                <div>
                    <Button variant='text' onClick={addMorePhone}><Add></Add></Button>
                    {
                        phoneNumbers.map((ele, index) =>

                            <Controller key={index} rules={{ required: 'رقم الهاتف مطلوب' }} name='phoneNumbers' control={control} render={({ field, fieldState }) =>
                                <TextField sx={{ width: '100%', marginTop: index == 0 ? '0px' : '20px' }} error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='phoneNumber' id='phone-number' label='رقم الهاتف'
                                />
                            }
                            />
                        )

                    }

                </div>
                <Controller rules={{ required: 'المنصب مطلوب' }} name='roleName' control={control} render={({ field, fieldState }) =>
                    <TextField sx={{ marginTop: '35px' }} error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field} name='roleName' id='employee-roleName' label='المنصب الوظيفي'
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
                <Controller rules={{ required: ' العنوان مطلوب' }} name='address' control={control} render={({ field, fieldState }) =>
                    <TextField error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field} name='address' id='address' label='العنوان'
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

                {/* <Controller rules={{ required: 'يرجى اختيار المدينة' }} name='cityId' control={control} render={({ field, fieldState }) =>
                                    <FormControl className='py-4 my-5 ' sx={{ marginTop: '10px' }} error={!!fieldState.error}>
                                        <InputLabel id="brand-id-label">المدينة</InputLabel>
                                        <Select
                                            {...field}
                                            name='cityId'
                                            labelId="city-id-label"
                                            label="المدينة"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>

                                        </Select>
                                        <FormHelperText>
                                            {fieldState.error?.message}
                                        </FormHelperText>
                                    </FormControl>
                                } /> */}
            </div>

        </form>

    )
}
