import React, { useEffect, useState } from 'react'
import { Button, TextField, Select, MenuItem, Box, Divider, IconButton, FormControlLabel, Switch, FormControl, InputLabel, FormHelperText } from '@mui/material'
import { Controller, useForm } from "react-hook-form";
import { Vehicle } from '@/api/vehicle/dto';
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
import Upload from '@/components/shared/Upload';
import { IMAGE_URL } from '@/../app.config';
import { VehicleApi } from '@/api/vehicle/endpoints';
import { vehicleActions } from '@/store/vehicle';

export default function VehcileDialog() {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isOpen = useSelector<RootState>(state => state.vehicle.openDialogVehicle) as boolean;
    const vehcileDto = useSelector<RootState>(state => state.vehicle.vehicleDto) as Vehicle;
    const vehcilesType = useSelector<RootState>(state => state.setting.vehicles) as { name: string, id: string }[];
    const dispatch = useDispatch<AppDispatch>()
    const { handleSubmit, control, setValue, reset } = useForm<Vehicle>({
        defaultValues: { ...new Vehicle() }
    });

    useEffect(() => {
        if (vehcileDto && vehcileDto.id) {
            console.log("in Effect modify");
            setImageUrl(IMAGE_URL + vehcileDto.imageUrl);
            reset({ ...vehcileDto })
        }
    }, [vehcileDto])
    const onSubmit = (data: Vehicle) => {
        if (data.id) {
            setIsLoading(true)
            VehicleApi.ModifyVehicle(data).then((res) => {
                dispatch(vehicleActions.modifyVehicle({ ...res.response }))
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
            VehicleApi.AddVehicle(data).then(() => {
                dispatch(vehicleActions.setVehicleFormDto({ ...data }))
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
        reset({ ...new Vehicle(), id: '' });
        setImageUrl('')
        dispatch(vehicleActions.setVehicleDialog(false));
        dispatch(vehicleActions.resetForm());
    }

    return (
        <div>
            <Button variant="contained" onClick={() => dispatch(vehicleActions.setVehicleDialog(true))}>
                إضافة المركبة
                <Add></Add>
            </Button>
            <Dialog open={isOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center pl-4 ">
                        <DialogTitle>
                            {
                                vehcileDto.id ? 'تعديل المركبة' : 'اضافة المركبة'
                            }
                        </DialogTitle>
                        <IconButton onClick={() => { dispatch(vehicleActions.setVehicleDialog(true)); resetForm() }}><Close /></IconButton>
                    </div>
                    <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>

                        <div className='grid grid-cols-2 gap-5 '>
                            <Controller rules={{ required: 'اسم المركبة مطلوب' }} name='name' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='fullName' id='vechile-fullName' label='اسم المركبة'

                                />
                            }
                            />
                            <Controller rules={{ required: 'رقم المركبة مطلوب' }} name='number' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    {...field} name='number' id='vehcile-number' label='رقم المركبة'

                                />
                            }
                            />

                            <Controller rules={{ required: ' سعة المركبة مطلوبة' }} name='maxCapacity' control={control} render={({ field, fieldState }) =>
                                <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message} type='number'
                                    {...field} name='maxCapacity' id='maxCapacity' label='سعة المركبة'

                                />
                            }
                            />

                            <Controller rules={{ required: '  اللون مطلوب' }} name='color' control={control} render={({ field, fieldState }) =>
                                <Box display={'flex'} gap={2} alignItems={'center'}>

                                    <TextField error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        {...field} name='text' id='color' label='اللون'

                                    />
                                    <TextField error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        {...field} name='text' id='color' variant='standard' sx={{ width: '40px' }} type="color" value={field.value} />
                                </Box>

                            }
                            />

                            <div className='col-span-2'>
                                <Controller rules={{ required: 'يرجى اختيار التصنيف' }} name='vehicleTypeId' control={control} render={({ field, fieldState }) =>
                                    <FormControl fullWidth error={!!fieldState.error}>
                                        <InputLabel id="vehcile-id-label">اسم التصنيف</InputLabel>
                                        <Select
                                            {...field}
                                            name='vehcileId'
                                            labelId="vehcile-id-label"
                                            label=" اسم التصنيف"
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


                            <div className='col-span-2'>
                                <label htmlFor="imageVechile" className='pb-4'>صورة المركبة </label>
                                <Controller control={control} name='imageFile' render={({ field, fieldState }) => <Upload  {...field} onChangeUrl={(e) => { setImageUrl(e) }} url={imageUrl}  ></Upload>} />
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
                                            vehcileDto.id ? 'تعديل المركبة' : 'اضافة المركبة'
                                        }
                                    </Button>
                            }

                            <Button variant='outlined' onClick={() => { dispatch(vehicleActions.setVehicleDialog(true)); resetForm() }}>الغاء</Button>
                        </Box>
                    </DialogActions>

                </form>
            </Dialog>
        </div>


    )
}
