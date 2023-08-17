import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Checkbox, IconButton, Pagination, Stack, Tooltip, DialogContent, TextField, Divider, Toolbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@mui/material/LinearProgress';
import { SettingApi } from '@/api/setting/endpoints';
import { settingActions } from '@/store/setting';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { LoadingButton } from '@mui/lab';
import Upload from '@/components/shared/Upload';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { IMAGE_URL } from '@/../app.config';
import VehicleType from './VehicleType';
import { usePagination } from '@/global/usePagination';
import { getImageUrl } from '@/global/auth';


interface initialDto {
    name: string,
    id: string,
    imageFile: null,
    imageUrl: string
}
export default function Categories() {
    const [selected, setSelected] = React.useState<string[]>([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState('');
    const [imageFile, setImageFile] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const swal = withReactContent(Swal)

    const [dto, setDto] = React.useState({
        id: '',
        name: '',
        imageFile: null,
        imageUrl: ''
    });
    const dispatch = useDispatch<AppDispatch>()
    const { paginate, pagination, setPagination } = usePagination(6, 1)
    const categories = useSelector<RootState>(state => state.setting.categories) as initialDto[];

    function getDetails(item: initialDto) {
        setIsOpen(true);
        setDto(item)
        setImageUrl(IMAGE_URL + item.imageUrl)
    }

    function addMoreCategory() {
        setIsLoading(true);
        console.log(dto);
        SettingApi.UpsertCategory({ ...dto, id: dto.id == '' ? null : dto.id, imageFile: imageFile }).then(() => {
            dispatch(settingActions.UpsertCategory(dto))
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
            SettingApi.fetchCategory()
        }).catch(() => setIsLoading(false))

    }
    function resetForm() {
        setDto({ name: '', id: '', imageUrl: '', imageFile: null })
        setImageUrl('')
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
    const removeCategory = () => {
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
                SettingApi.DeleteCategory(selected).then(() => {
                    dispatch(settingActions.deleteCategory(selected))
                    toast('تمت الحذف الصنف بنجاح', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                        theme: "light",
                        type: 'success'
                    })
                    setSelected([])
                }
                )
            }
        })
    }

    return (

        <div className='grid grid-cols-2 gap-5'>

            <Box className='col-span-2 md:col-span-1' sx={{ width: '100%' }}>
                <TableContainer component={Paper} sx={{
                    width: '100%'
                }}>
                    <Box
                        sx={{
                            p: 2,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <h2>التصنيفات</h2>

                        <Button variant='contained' onClick={() => setIsOpen(true)}>اضافة صنف</Button>

                        <Dialog open={isOpen}>
                            <DialogTitle>
                                {
                                    dto.id ? 'تعديل صنف' : 'اضافة صنف'
                                }
                            </DialogTitle>

                            <DialogContent className='flex flex-col min-w-[35rem] p-2 gap-4'>
                                <TextField name='name' id='category-name' label='اسم الصنف' value={dto.name} onChange={handleInputChange} />
                                <label htmlFor="imageCategory" className='pb-4'>صورة الصنف </label>
                                <Upload name='imageFile' onChangeUrl={(e) => { setImageUrl(e); }} url={imageUrl} onChange={(file: File | null) => setImageFile(file)}></Upload>

                            </DialogContent>
                            <Divider />
                            <DialogActions sx={{ justifyContent: 'space-between', padding: '15px' }}>
                                <div className='flex justify-end items-end gap-4'>

                                    {
                                        isLoading ?
                                            <LoadingButton sx={{ height: '36px' }} loading variant='contained'></LoadingButton>
                                            :
                                            <Button variant='contained' onClick={addMoreCategory}>
                                                {
                                                    dto.id ? 'تعديل الصنف' : 'اضافة الصنف'
                                                }
                                            </Button>
                                    }
                                    <Button variant='outlined' onClick={() => { setIsOpen(false); resetForm() }}>الغاء</Button>
                                </div>

                            </DialogActions>
                        </Dialog>

                    </Box>


                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">

                                    <IconButton disabled={selected.length == 0} onClick={removeCategory}>
                                        <DeleteIcon />
                                    </IconButton>

                                </TableCell>

                                <TableCell >الصورة</TableCell>
                                <TableCell align="center">الاسم</TableCell>
                                {/* <TableCell align="center">التاريخ</TableCell> */}
                                <TableCell align="center">تفاصيل</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories ? paginate(categories).map((row: initialDto, index: number) => {
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
                                        <TableCell component="th" scope="row">
                                            <img width={35} src={getImageUrl(row.imageUrl)} alt="image category" className='rounded-full object-cover' />
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
                        {/* {page} */}
                        <Pagination count={pagination.totalPages}
                            page={pagination.pageIndex}
                            onChange={(event, page) => setPagination({ ...pagination, pageIndex: page })} />
                    </Stack>
                </TableContainer>
            </Box>
            <Box className='col-span-2 md:col-span-1' sx={{ width: '100%' }}>

                <VehicleType />
            </Box>

        </div>



    )
}