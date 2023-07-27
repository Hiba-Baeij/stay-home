import React, { useMemo, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Chip, CircularProgress, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IMAGE_URL } from '@/../app.config';
import { useQuery } from '@tanstack/react-query';
import { Vehicle as TypeVehicle } from '@/api/vehicle/dto';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { vehicleActions } from '@/store/vehicle';
import { VehicleApi } from '@/api/vehicle/endpoints';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VehcileDialog from '@/components/pages/Vehicle';
import DeleteIcon from '@mui/icons-material/Delete';
import TableSkeleton from '@/components/skeletons/table';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { usePagination } from '@/global/usePagination';

export default function Vehicle() {
    const [selected, setSelected] = React.useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const { paginate, pagination, setPagination } = usePagination(6, 1)
    const [search, setsearch] = useState('')
    const vehicles = useSelector<RootState>(state => state.vehicle.vehicles) as TypeVehicle[];
    const vehiclesType = useSelector<RootState>(state => state.setting.vehicles) as { name: string, id: string }[];
    const swal = withReactContent(Swal)
    const getVechileType = (id: string) => vehiclesType.find(ele => ele.id === id)?.name
    const { isLoading } = useQuery(['vehicle'], VehicleApi.fetchVehicle, {
        onSuccess: (data: { response: TypeVehicle[]; }) => {
            dispatch(vehicleActions.setVehicle(data.response))
        },
    })


    // const filterdVehicles = useMemo(() => vehicles.filter((v) => v.name.includes(search)), [search, vehicles])

    function getDetails(item: TypeVehicle) {
        dispatch(vehicleActions.setVehicleDialog(true))
        // VehicleApi.getVehicleDetails(item.id as string).then((data: { response: TypeVehicle }) => {
        dispatch(vehicleActions.setVehicleFormDto(item))
        // })
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = vehicles.map((n: any) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];
        console.log(selectedIndex);

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
            console.log(newSelected);

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
        console.log(selected);
    };


    const deleteVehicle = () => {
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
                VehicleApi.DeleteVehicle(selected).then(() => {
                    dispatch(vehicleActions.deleteVehicle(selected))
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

                    setSelected([])
                }
                )
            }
        })

    }

    // src = "http://stayhome22-001-site1.ftempurl.com/Uploads\2023-6\58e090a8-c23a-4bff-a8e8-fa5b2a0c5fdbpexels-miguel-marmolejos-fernández-6389711.jpg"
    // src = "http://stayhome22-001-site1.ftempurl.com/Uploads\2023-6\58e090a8-c23a-4bff-a8e8-fa5b2a0c5fdbpexels-miguel-marmolejos-fernández-6389711.jpg"
    return (
        <Box sx={{ width: '100%', padding: '10px' }}>
            <div className='flex justify-between items-center w-full gap-5 my-5'>

                <div className='flex justify-start items-center gap-3'>

                    <LocalShippingIcon></LocalShippingIcon>
                    <h2 className='text-lg font-bold'>المركبات</h2>
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <TextField size="small" label='ابحث عن المركبات' value={search} onChange={(e) => setsearch(e.target.value)} title='shop' sx={{ width: '300px' }} name='shopSearch'></TextField>
                    <VehcileDialog />

                </div>
            </div>

            <TableContainer component={Paper} sx={{
                width: '100%'
            }}>

                {
                    selected.length > 0 ?
                        (
                            <div className='flex justify-start items-center w-full px-2 mt-2'>

                                <Tooltip title="Delete">
                                    <IconButton onClick={deleteVehicle}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>

                        ) : null
                }
                {
                    isLoading ? <TableSkeleton headers={['', 'الاسم', 'المدينة', 'رقم الموبايل', 'تاريخ الميلاد', 'عدد الطلبات ', 'تفاصيل']} />

                        : <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                    <TableCell>الرقم</TableCell>
                                    <TableCell>الصورة</TableCell>
                                    <TableCell align="center"> الاسم</TableCell>
                                    <TableCell align="center"> السعة</TableCell>
                                    <TableCell align="center">نوع المركبة</TableCell>
                                    <TableCell align="center"> اللون </TableCell>
                                    <TableCell align="center"> الحالة </TableCell>
                                    <TableCell align="center">تفاصيل</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vehicles ? paginate(vehicles).map((row: TypeVehicle, index: number) => {

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

                                            <TableCell component="th" scope="row" align="left">
                                                {row.number}
                                            </TableCell>

                                            <TableCell component="th" scope="row" align="left">
                                                <img width={40} height={40} src={`${IMAGE_URL + row.imageUrl}`} alt="image vehicle" className='rounded-full object-cover' />
                                            </TableCell>

                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.maxCapacity} </TableCell>
                                            <TableCell align="center">{getVechileType(row.vehicleTypeId)} </TableCell>
                                            <TableCell align="center">  <div className={`bg-[${row.color}] h-5 w-5`} /></TableCell>
                                            <TableCell align="center">{row.isAvailable ? <Chip label="متاح" color="primary" variant='outlined' /> : <Chip label="غير متاح" color="error" variant='outlined' />}</TableCell>
                                            <TableCell align="center">
                                                <MoreVertIcon sx={{ cursor: 'pointer' }} onClick={() => getDetails(row)} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                ) : null
                                }
                            </TableBody>
                        </Table>
                }

                <Stack spacing={2} sx={{ padding: "20px", display: 'flex ', justifyContent: 'center', alignItems: 'center' }}>
                    <Pagination count={pagination.totalPages}
                        page={pagination.pageIndex}
                        onChange={(event, page) => setPagination({ ...pagination, pageIndex: page })} />
                </Stack>
            </TableContainer>


            {/* {
                isLoading ?
                    <div className='flex justify-center items-center'>
                        <CircularProgress />
                    </div>
                    :

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {vehicles.map((vehicle) => (
                            <Card
                                key={vehicle.id}
                                sx={{ borderRadius: "24px 24px 10px 10px", padding: "6px" }}
                            >
                                {vehicle.imageUrl && (



                                    <CardMedia
                                        sx={{ height: "240px", borderRadius: "22px" }}
                                        component="img"
                                        image={`${IMAGE_URL + vehicle.imageUrl}`}

                                        alt="green iguana"
                                    />


                                )}

                                <CardContent className="">
                                    <div className="flex justify-between items-center">

                                        <Typography
                                            className="text-gray-700"
                                            fontWeight={600}
                                            gutterBottom
                                            variant="h6"
                                            fontSize={20}
                                            margin={0}
                                            component="div"
                                        >
                                            {vehicle.name}
                                            {vehicle.number}
                                        </Typography>
                                    </div>

                                </CardContent>

                                <CardActions className="gap-2">

                                    <Button variant="contained" fullWidth onClick={() => getDetails(vehicle)}>
                                        عرض التفاصيل
                                    </Button>

                                    <Button variant="contained" onClick={() => deleteVehicle(vehicle.id ? vehicle.id : '')}>
                                        <DeleteOutlineIcon />
                                    </Button>

                                </CardActions>
                            </Card>
                        ))}
                    </div>
            } */}

        </Box>
    )
}

