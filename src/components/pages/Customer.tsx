import React from 'react'
import { Button, FormControl, FormHelperText, InputLabel, TextField, Select, MenuItem, Table } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import Divider from '@mui/material/Divider';
export default function Customer(isOpenDialog: boolean) {

    const { handleSubmit, control } = useForm();
    const onSubmit = (data: any) => console.log(data);
    const saveData = () => {
        console.log("save data and more");
    }
    const closeDialog = () => {
        isOpenDialog = false
    }
    const resetDialog = () => {
        console.log("reset dialog");
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-5 p-8'>
                <Controller rules={{ required: 'اسم الزبون مطلوب' }} name='name' control={control} render={({ field, fieldState }) =>
                    <TextField error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field} name='name' id='customer-name' label='اسم الزبون'
                    />
                }
                />
                <Controller rules={{ required: 'رقم الهاتف مطلوب' }} name='phoneNumber' control={control} render={({ field, fieldState }) =>
                    <TextField error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        {...field} name='phoneNumber' id='phone-number' label='رقم الهاتف'
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
            <Divider></Divider>
            <div className='p-3 pl-6 flex justify-start items-center gap-4'>
                <Button onClick={saveData} variant="contained" type='submit'>حفظ</Button>
                <Button color='primary' variant="outlined" onClick={resetDialog}>تهيئة</Button>
                <Button onClick={closeDialog} color='error' variant="outlined">اغلاق</Button>
            </div>
        </form>

    )
}
