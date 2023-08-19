import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Checkbox, Chip, DialogContent, Divider, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, OutlinedInput, Pagination, Select, Stack, TextField, Toolbar, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@mui/material/LinearProgress';
import { SettingApi } from '@/api/setting/endpoints';
import { settingActions } from '@/store/setting';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { LoadingButton } from '@mui/lab';
import { Area } from "@/store/setting"
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { usePagination } from '@/global/usePagination';


export default function Areas() {
    const [selected, setSelected] = React.useState<string[]>([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const swal = withReactContent(Swal)
    const [dto, setDto] = React.useState<Area>({
        id: '',
        name: '',
        cityId: '',
    });
    const dispatch = useDispatch<AppDispatch>()
    const { paginate, pagination, setPagination } = usePagination(6, 1)
    const areas = useSelector<RootState>(state => state.setting.areas) as Area[];
    const cities = useSelector<RootState>(state => state.setting.cities) as { name: string, id: string }[];

    const getCityName = (id: string) => cities?.find((c) => c.id === id)?.name;
    const { handleSubmit, control, reset } = useForm<Area>({
        defaultValues: {
            id: '',
            name: '',
            cityId: '',
        }
    });
    function getDetails(item: Area) {
        setIsOpen(true);
        setDto(item);
        reset({ ...item })
    }

    const onSubmit = (data: Area) => {
        setIsLoading(true);
        console.log(data);
        SettingApi.UpsertArea({ ...data }).then((res) => {
            dispatch(settingActions.UpsertArea(res.response))
            toast(dto.id ? 'تم التعديل بنجاح' : 'تمت الاضافة بنجاح', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
                type: 'success'
            })
            setIsLoading(false);
            setIsOpen(false)
            resetForm()
        }).catch(() => setIsLoading(false))

    }

    const resetForm = () => {
        reset({
            id: '',
            name: '',
            cityId: '',
        });
        setIsOpen(false)
    }


    const handleClick = (id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };
    const removeArea = () => {
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
                SettingApi.DeleteArea(selected).then(() => {
                    dispatch(settingActions.deleteArea(selected))
                    toast('تمت الحذف المنطقة بنجاح', {
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


        <TableContainer component={Paper} sx={{
            width: '100%'
        }}>
            <Box sx={{
                p: 2,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h2>المناطق</h2>
                <Button variant='contained' onClick={() => setIsOpen(true)}>اضافة منطقة</Button>

                <Dialog open={isOpen}>
                    <DialogTitle>
                        {
                            dto.id ? 'تعديل منطقة' : 'اضافة منطقة'
                        }
                    </DialogTitle>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>

                            <Controller rules={{ required: 'اسم المنطقة مطلوب' }} name='name' control={control} render={({ field, fieldState }) =>
                                <TextField id='area-name' label='اسم المنطقة' error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    fullWidth
                                    {...field} name='name'

                                />
                            }
                            />


                            <Controller rules={{ required: 'يرجى اختيار المدينة' }} name='cityId' control={control} render={({ field, fieldState }) =>
                                <FormControl error={!!fieldState.error}>
                                    <InputLabel id="city-id-label">اسم المدينة</InputLabel>
                                    <Select
                                        {...field}
                                        name='cityId'
                                        labelId="city-id-label"
                                        label=" اسم المدينة"
                                    >
                                        {
                                            cities.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)
                                        }

                                    </Select>
                                    <FormHelperText>
                                        {fieldState.error?.message}
                                    </FormHelperText>
                                </FormControl>
                            } />

                        </DialogContent>
                        <Divider />
                        <DialogActions sx={{ justifyContent: 'space-between', padding: '15px' }}>
                            <div className='flex justify-end items-end gap-4'>

                                {
                                    isLoading ?
                                        <LoadingButton loading variant='contained' sx={{ height: '36px' }}></LoadingButton>
                                        :
                                        <Button variant='contained' type="submit">
                                            {
                                                dto.id ? 'تعديل منطقة' : 'اضافة منطقة'
                                            }
                                        </Button>

                                }
                                <Button variant='outlined' onClick={() => resetForm()}>الغاء</Button>
                            </div>

                        </DialogActions>
                    </form>

                </Dialog>
            </Box>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            {/* <Checkbox
                                        color="primary"
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    /> */}



                            <IconButton disabled={selected.length == 0} onClick={removeArea}>
                                <DeleteIcon />
                            </IconButton>


                        </TableCell>
                        <TableCell align="center">الاسم</TableCell>
                        <TableCell align="center">المدينة</TableCell>
                        <TableCell align="center">تفاصيل</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {areas ? paginate(areas).map((row: Area, index: number) => {
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}

                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onChange={() => handleClick(row.id ? row.id : '')}

                                        color="primary"
                                    />
                                </TableCell>

                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{getCityName(row.cityId)}</TableCell>
                                <TableCell align="center">
                                    <MoreVertIcon onClick={() => getDetails(row)} />
                                </TableCell>
                            </TableRow>
                        )
                    }
                    ) : null
                    }
                </TableBody>
            </Table>
            <Stack spacing={2} sx={{ padding: "20px", display: 'flex ', justifyContent: 'center', alignItems: 'center' }}>
                {/* {page} */}
                <Pagination count={pagination.totalPages}
                    page={pagination.pageIndex}
                    onChange={(event, page) => setPagination({ ...pagination, pageIndex: page })} />
            </Stack>
        </TableContainer>


    )
}

