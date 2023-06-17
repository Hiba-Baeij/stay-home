import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Checkbox, Chip, DialogContent, Divider, IconButton, Pagination, Stack, TextField, Tooltip } from '@mui/material';
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
const DEFAULT_ROWS_PER_PAGE = 5;
interface typeProps {
    loading: boolean
}
interface initialDto {
    name: string, id: string
}
export default function Countries(props: typeProps) {
    const [selected, setSelected] = React.useState<string[]>([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [dto, setDto] = React.useState({
        id: '',
        name: '',
    });
    const dispatch = useDispatch<AppDispatch>()
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [page, setPage] = React.useState(1);
    const cities = useSelector<RootState>(state => state.setting.cities) as initialDto[];

    function getDetails(item: initialDto) {
        setIsOpen(true);
        setDto(item)
    }

    function addMoreCity() {
        setIsLoading(true);
        console.log(dto);
        SettingApi.UpsertCity({ ...dto, id: dto.id == '' ? null : dto.id }).then(() => {
            dispatch(settingActions.UpsertCity(dto))
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
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = cities.map((n: any) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
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
    const removeCity = () => {
        SettingApi.DeleteCity(selected).then(() => {
            dispatch(settingActions.deleteCity(selected))
            toast('تمت الحذف المدينة بنجاح', {
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

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {
                    props.loading ?
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box> : null
                }

                <TableContainer component={Paper} sx={{
                    width: '100%'
                }}>
                    <div className='flex justify-between items-center w-full gap-5 p-5 pb-3 '>
                        <h2>المدن</h2>
                        <Button variant='contained' onClick={() => setIsOpen(true)}>اضافة مدينة</Button>
                        {
                            selected.length > 0 ?
                                (
                                    <Tooltip title="Delete">
                                        <IconButton onClick={removeCity}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                ) : null

                        }
                        <Dialog open={isOpen}>
                            <DialogTitle>
                                {
                                    dto.id ? 'تعديل مدينة' : 'اضافة مدينة'
                                }
                            </DialogTitle>

                            <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>
                                <TextField name='name' id='city-name' label='اسم المدينة' value={dto.name} onChange={handleInputChange} />
                            </DialogContent>
                            <Divider />
                            <DialogActions sx={{ justifyContent: 'space-between', padding: '15px' }}>
                                <div className='flex justify-end items-end gap-4'>

                                    {
                                        isLoading ?
                                            <LoadingButton loading variant='contained'></LoadingButton>
                                            :
                                            <Button variant='contained' onClick={addMoreCity}>
                                                {
                                                    dto.id ? 'تعديل مدينة' : 'اضافة مدينة'
                                                }
                                            </Button>
                                    }
                                    <Button variant='outlined' onClick={() => { setIsOpen(false); setDto({ name: '', id: '' }) }}>الغاء</Button>
                                </div>

                            </DialogActions>
                        </Dialog>
                    </div>

                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">الاسم</TableCell>
                                <TableCell align="center">التاريخ</TableCell>
                                <TableCell align="center">تفاصيل</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cities ? cities.map((row: { name: string, id: string }, index: number) => {
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
                                        <TableCell align="center">{new Date().toLocaleDateString()}</TableCell>
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
                </TableContainer>
                <Stack spacing={2} sx={{ padding: "20px", display: 'flex ', justifyContent: 'center', alignItems: 'center' }}>
                    {page}
                    <Pagination count={10} page={page} onChange={handleChangePage} />
                </Stack>
            </Paper>
        </Box>

    )
}
