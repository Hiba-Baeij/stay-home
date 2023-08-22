import React, { useEffect, useState } from 'react'
import { Button, TextField, Select, MenuItem, Box, Divider, IconButton, LinearProgress, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import Upload from '@/components/shared/Upload';
import { Driver, DriverDto } from '@/api/driver/dto';
import { DriverApi } from '@/api/driver/endpoints';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate, useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useQuery } from '@tanstack/react-query';
import { driverActions } from '@/store/driver';

export default function DriverDetails() {
    let { id } = useParams();
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const swal = withReactContent(Swal)
    const driverDto = useSelector<RootState>(state => state.driver.driverDto) as DriverDto;
    const dispatch = useDispatch<AppDispatch>()
    const [imageUrl, setImageUrl] = useState('');
    const vehcilesType = useSelector<RootState>(state => state.setting.vehicles) as { name: string, id: string }[];
    const { handleSubmit, setValue, control, reset } = useForm<DriverDto>({
        defaultValues: { ...new DriverDto() }
    });


    const { isLoading: dataLoading } = useQuery({
        queryKey: ["driverDetails"],
        queryFn: () => DriverApi.getDriverDetails(id as string),
        enabled: id !== "0",
        onSuccess: (data: { response: DriverDto }) => {
            dispatch(driverActions.setDriverDto({ ...data.response, birthDate: moment(data.response.birthDate).format('YYYY-MM-DD') }))
            reset({ ...data.response, birthDate: moment(data.response.birthDate).format('YYYY-MM-DD') })
            // setValue('vehicle.imageUrl', data.response.vehicle.imageUrl)
            // setImageUrl(data.response.vehicle.imageUrl)

        },
    });

    const onSubmit = (data: DriverDto) => {
        const formattedData = {
            BirthDate: new Date(data.birthDate).toLocaleDateString(), // Assuming formatDate is a function to format the date
            PhoneNumber: data.phoneNumber,
            FullName: data.fullName,
            Password: data.password,
            Email: data.email,
            'Vehicle.ImageFile': data.vehicle.imageFile,
            'Vehicle.Color': data.vehicle.color,
            'Vehicle.Number': data.vehicle.number,
            'Vehicle.MaxCapacity': data.vehicle.maxCapacity,
            'Vehicle.Name': data.vehicle.name,
            'Vehicle.VehicleTypeId': data.vehicle.vehicleTypeId,
        } as unknown as DriverDto;;
        if (id != "0") {
            setIsLoading(true)
            DriverApi.ModifyDriver(formattedData).then((res) => {
                dispatch(driverActions.setDriverDto(res.response))
                setIsLoading(false)
                resetForm();
                toast('تم تعديل بنجاح', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                    type: 'success'
                })
                navigation('/drivers')
            }).catch(() => setIsLoading(false))
        }
        else {
            setIsLoading(true)
            DriverApi.AddDriver(formattedData).then((res) => {
                dispatch(driverActions.addDriver(res.response))
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
                navigation('/drivers')
            }).catch(() => setIsLoading(false))
        }
    };
    const resetForm = () => {
        reset({ ...new DriverDto() });

    }
    const deleteDriver = () => {
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
                DriverApi.DeleteDriver([id] as string[]).then(() => {
                    dispatch(driverActions.deleteDriver([id] as string[]))
                    toast('تم الحذف بنجاح', {
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
            <form onSubmit={handleSubmit(onSubmit)} >

                <div className='flex justify-between items-center w-full gap-5 '>

                    <div className='flex justify-start items-center gap-3'>

                        <PersonIcon></PersonIcon>
                        <h2 className='text-lg font-bold'> {driverDto.id ? 'تفاصيل / السائق' : 'اضافة السائق'} </h2>

                    </div>
                    <Box gap={2} display='flex' sx={{ marginY: '20px' }}>
                        {
                            isLoading ?
                                <LoadingButton loading variant='contained'></LoadingButton>
                                :
                                <Button variant='contained' type="submit">{driverDto.id ? 'تعديل' : 'اضافة'} </Button>
                        }
                        {
                            driverDto.id ?
                                <Button color={driverDto.isBlock ? 'error' : 'success'} variant='outlined' >{driverDto.isBlock ? 'محظور' : 'غير محظور'}</Button> : null
                        }
                        {
                            driverDto.id ?
                                <Button color='error' variant='outlined' onClick={deleteDriver}>حذف</Button> : null
                        }
                        <Button color='secondary' variant='outlined' onClick={() => { navigation('/drivers'); resetForm() }}>تراجع</Button>
                    </Box>
                </div>


                <Card>
                    {
                        dataLoading && id !== '0' ?
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box> : null
                    }



                    <CardContent>
                        <div className='grid grid-cols-4 gap-5'>
                            <div className='col-span-4'>
                                <h2>معلومات السائق</h2>
                            </div>
                            <div className='col-span-2 md:col-span-1'>

                                <Controller rules={{ required: 'اسم السائق مطلوب' }} name='fullName' control={control} render={({ field, fieldState }) =>
                                    <TextField error={!!fieldState.error} fullWidth
                                        helperText={fieldState.error?.message}
                                        {...field} name='fullName' id='driver-fullName' label='اسم السائق'

                                    />
                                }
                                />

                            </div>
                            <div className='col-span-2 md:col-span-1'>


                                <Controller rules={{ required: 'رقم الموبايل مطلوب' }} name='phoneNumber' control={control} render={({ field, fieldState }) =>
                                    <TextField error={!!fieldState.error} fullWidth
                                        helperText={fieldState.error?.message}
                                        {...field} name='phoneNumber' id='driver-phoneNumber' label='رقم الموبايل'

                                    />
                                }
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>
                                <Controller rules={{ required: ' تاريخ الميلاد مطلوب' }} name='birthDate' control={control} render={({ field, fieldState }) =>
                                    <TextField type='date' label='تاريح الميلاد ' error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        {...field} name='birthDate' id='birthDate' sx={{ width: '100%' }} />
                                }
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>

                                <Controller rules={{ required: 'كلمة المرور مطلوبة' }} name='password' control={control} render={({ field, fieldState }) =>
                                    <TextField error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        {...field} name='password' id='password' label='كلمة المرور' fullWidth

                                    />
                                }
                                />
                            </div>
                            <div className='col-span-2 md:col-span-1'>


                                <Controller rules={{ required: ' البريد الالكتروني مطلوب' }} name='email' control={control} render={({ field, fieldState }) =>
                                    <TextField error={!!fieldState.error}
                                        helperText={fieldState.error?.message} fullWidth
                                        {...field} name='email' id='email' label='البريد الالكتروني'

                                    />
                                }
                                />
                            </div>


                        </div>
                        <div className='grid grid-cols-5 gap-5 mt-8'>
                            <div className='col-span-5'>
                                <h2>معلومات المركبة</h2>
                            </div>
                            <div className='col-span-3'>
                                <div className='grid grid-cols-2 gap-5 mt-3'>

                                    <div className='col-span-1'>

                                        <Controller rules={{ required: 'يرجى اختيار نوع المركبة' }} name='vehicle.vehicleTypeId' control={control} render={({ field, fieldState }) =>
                                            <FormControl fullWidth error={!!fieldState.error}>
                                                <InputLabel id="vehcile-id-label">نوع المركبة</InputLabel>
                                                <Select
                                                    {...field}
                                                    name='vehicle.vehicleTypeId'
                                                    labelId="vehcile-id-label"
                                                    label="نوع المركبة"
                                                >
                                                    {
                                                        vehcilesType.map((t) => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)
                                                    }

                                                </Select>
                                                <FormHelperText>
                                                    {fieldState.error?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        } />
                                    </div>


                                    <div className='col-span-1'>
                                        <Controller rules={{ required: 'لون مطلوب' }} name='vehicle.color' control={control} render={({ field, fieldState }) =>
                                            <Box display={'flex'} gap={2} alignItems={'center'}>

                                                <TextField error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                    {...field} name='text' id='color' label='اللون'
                                                    fullWidth

                                                />
                                                <TextField error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                    {...field} name='text' id='color' variant='standard' sx={{ width: '40px' }} type="color" value={field.value} />
                                            </Box>
                                        }
                                        />
                                    </div>

                                    <div className='col-span-1'>


                                        <Controller rules={{ required: ' رقم المركبة مطلوب' }} name='vehicle.number' control={control} render={({ field, fieldState }) =>
                                            <TextField label='رقم المركبة' error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='vehicle.number' id='vehicle-number' sx={{ width: '100%' }} />
                                        }
                                        />
                                    </div>

                                    <div className='col-span-1'>

                                        <Controller rules={{ required: ' اسم المركبة مطلوب' }} name='vehicle.name' control={control} render={({ field, fieldState }) =>

                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                {...field} name='vehicle.name' id='vehicle-name' label='اسم المركبة' fullWidth

                                            />

                                        }
                                        />
                                    </div>
                                    <div className='col-span-1'>


                                        <Controller rules={{ required: '  سعة المركبة مطلوبة' }} name='vehicle.maxCapacity' control={control} render={({ field, fieldState }) =>
                                            <TextField error={!!fieldState.error}
                                                helperText={fieldState.error?.message} fullWidth
                                                {...field} name='vehicle.maxCapacity' id='vehicle-maxCapacity' label='سعة المركبة'

                                            />
                                        }
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className='col-span-2 '>
                                {/* {imageUrl} */}
                                {/* <Controller control={control} name='vehicle.imageFile' render={({ field, fieldState }) => <Upload  {...field} onChangeUrl={(e) => { setImageUrl(e) }} url={imageUrl}  ></Upload>}
                                /> */}

                                <Controller
                                    control={control} name='vehicle.imageFile' render={({ field, fieldState }) =>

                                        // <FormControl error={!!fieldState.error} fullWidth>
                                        <Upload {...field} url={imageUrl} onChangeUrl={setImageUrl} name='vehicle.imageFile' label='صورة المركبة'></Upload>
                                        //     <FormHelperText>
                                        //         {fieldState.error?.message}
                                        //     </FormHelperText>
                                        // </FormControl>
                                    }
                                />
                            </div>


                        </div>
                    </CardContent>
                </Card>

            </form>
        </div>


    )
}
