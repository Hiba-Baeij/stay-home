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
import { settingActions } from '@/store/setting';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { usePagination } from '@/global/usePagination';

interface initialDto {
    name: string, id: string
}
export default function VehicleType() {
    const [selected, setSelected] = React.useState<string[]>([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const swal = withReactContent(Swal)
    const [dto, setDto] = React.useState({
        id: '',
        name: '',
    });
    const dispatch = useDispatch<AppDispatch>()
    const { paginate, pagination, setPagination } = usePagination(6, 1)
    const vehicles = useSelector<RootState>(state => state.setting.vehicles) as initialDto[];

    function getDetails(item: initialDto) {
        setIsOpen(true);
        setDto(item)
    }

    function addMoreVehicle() {
        setIsLoading(true);
        console.log(dto);
        SettingApi.UpsertVehicle({ ...dto, id: dto.id == '' ? null : dto.id }).then((res) => {
            dispatch(settingActions.upsertVehicle(res.response))
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
            setDto({ name: '', id: '' })
        }).catch(() => setIsLoading(false))

    }
    const handleInputChange = (e: any) => {
        console.log(e.target.value);

        const { name, value } = e.target;
        setDto({
            ...dto,
            [name]: value
        });
    };

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
    const removeVehicle = () => {
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

                SettingApi.DeleteVehicle(selected).then(() => {
                    dispatch(settingActions.deleteVehicles(selected))
                    toast('تم الحذف النوع المركبة بنجاح', {
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
                <h2>نوع المركبات</h2>
                <Button variant='contained' onClick={() => setIsOpen(true)}>اضافة نوع المركبة</Button>

                <Dialog open={isOpen}>
                    <DialogTitle>

                        {
                            dto.id ? 'تعديل نوع المركبة' : 'اضافة نوع المركبة'
                        }
                    </DialogTitle>

                    <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>
                        <TextField name='name' id='Vehicle-name' label='اسم النوع المركبة' value={dto.name} onChange={handleInputChange} />
                    </DialogContent>
                    <Divider />
                    <DialogActions sx={{ justifyContent: 'space-between', padding: '15px' }}>
                        <div className='flex justify-end items-end gap-4'>

                            {
                                isLoading ?
                                    <LoadingButton sx={{ height: '36px' }} loading variant='contained'></LoadingButton>
                                    :
                                    <Button variant='contained' onClick={addMoreVehicle}>
                                        {
                                            dto.id ? 'تعديل نوع المركبة' : 'اضافة نوع المركبة'
                                        }
                                    </Button>
                            }
                            <Button variant='outlined' onClick={() => { setIsOpen(false); setDto({ name: '', id: '' }) }}>الغاء</Button>
                        </div>

                    </DialogActions>
                </Dialog>
            </Box>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">

                            <IconButton disabled={selected.length == 0} onClick={removeVehicle}>
                                <DeleteIcon />
                            </IconButton>


                        </TableCell>
                        <TableCell align="center">الاسم</TableCell>
                        {/* <TableCell align="center">التاريخ</TableCell> */}
                        <TableCell align="center">تفاصيل</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {vehicles ? paginate(vehicles).map((row: { name: string, id: string }, index: number) => {
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
