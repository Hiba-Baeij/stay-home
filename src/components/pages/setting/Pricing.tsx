import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Checkbox, Chip, DialogContent, Divider, IconButton, Pagination, Stack, TextField, Toolbar, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@mui/material/LinearProgress';
import { SettingApi } from '@/api/setting/endpoints';
import { Area, Pricing as PricingDto, settingActions } from '@/store/setting';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { usePagination } from '@/global/usePagination';
import { Controller, useForm } from 'react-hook-form';

export default function Pricing() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const swal = withReactContent(Swal)
    const [dto, setDto] = React.useState<{ id: string, price: number, kmBetween: number }>({ id: "", price: 0, kmBetween: 0 });
    const dispatch = useDispatch<AppDispatch>()
    const { paginate, pagination, setPagination } = usePagination(6, 1)
    const pricing = useSelector<RootState>(state => state.setting.pricing) as [];
    const areas = useSelector<RootState>(state => state.setting.areas) as Area[];
    const getAreaName = (id: string) => areas.find(ele => ele.id === id)?.name
    const { handleSubmit, control, setValue, reset } = useForm<{ id: string, price: number, kmBetween: number }>({
        defaultValues: { id: "", price: 0, kmBetween: 0 }
    });
    function getDetails(item: PricingDto) {
        setIsOpen(true);

        setValue('id', item.id)
        setValue('price', item.price)
        setValue('kmBetween', item.kmBetween)
    }

    function onSubmit(data: { id: string, price: number, kmBetween: number }) {
        setIsLoading(true);
        console.log(dto);
        SettingApi.ModifyAreaPricing(data).then((res) => {
            dispatch(settingActions.modifyAreaPricing(res.response))
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
            setIsLoading(false);
            setIsOpen(false)
            setValue('id', '')
            setValue('price', 0)
            setValue('kmBetween', 0)
        }).catch(() => setIsLoading(false))

    }





    return (


        <TableContainer component={Paper} sx={{
            width: '100%'
        }}>

            <Dialog open={isOpen}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogTitle>
                        تعديل التسعير
                    </DialogTitle>

                    <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>
                        <Controller rules={{ required: 'السعر مطلوب' }} name='price' control={control} render={({ field, fieldState }) =>
                            <TextField error={!!fieldState.error} fullWidth
                                helperText={fieldState.error?.message}
                                {...field} name='price' id='price' label='السعر'

                            />
                        }
                        />
                        <Controller rules={{ required: 'المسافة بين المنطقتين مطلوبة' }} name='kmBetween' control={control} render={({ field, fieldState }) =>
                            <TextField error={!!fieldState.error} fullWidth
                                helperText={fieldState.error?.message}
                                {...field} name='kmBetween' id='kmBetween' label='المسافة بين المنطقتين'

                            />
                        }
                        />

                    </DialogContent>
                    <Divider />
                    <DialogActions sx={{ justifyContent: 'space-between', padding: '15px' }}>
                        <div className='flex justify-end items-end gap-4'>

                            {
                                isLoading ?
                                    <LoadingButton sx={{ height: '36px' }} loading variant='contained'></LoadingButton>
                                    :
                                    <Button variant='contained' type="submit">

                                        تعديل

                                    </Button>
                            }
                            <Button variant='outlined' onClick={() => { setIsOpen(false); }}>الغاء</Button>
                        </div>

                    </DialogActions>
                </form>

            </Dialog>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>

                        <TableCell align="center">اسم المنطقة الاولى</TableCell>
                        <TableCell align="center">اسم المنطقة الثانية</TableCell>
                        <TableCell align="center">السعر</TableCell>
                        <TableCell align="center">مسافة بالكيلومتر</TableCell>
                        <TableCell align="center">تفاصيل</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {pricing ? paginate(pricing).map((row: PricingDto) => {
                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.id}

                            >


                                <TableCell align="center">{getAreaName(row.area1Name)}</TableCell>
                                <TableCell align="center">{getAreaName(row.area2Name)}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.kmBetween}</TableCell>
                                {/* <TableCell align="center">{new Date().toLocaleDateString()}</TableCell> */}
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

                <Pagination count={pagination.totalPages}
                    page={pagination.pageIndex}
                    onChange={(event, page) => setPagination({ ...pagination, pageIndex: page })} />
            </Stack>
        </TableContainer>


    )
}
