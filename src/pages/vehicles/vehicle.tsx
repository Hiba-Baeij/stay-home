import React from 'react'

import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Chip, CircularProgress, IconButton, Pagination, Stack, TextField, Tooltip, Typography } from '@mui/material';
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
const DEFAULT_ROWS_PER_PAGE = 5;

export default function Vehicle() {
    const [selected, setSelected] = React.useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [page, setPage] = React.useState(1);
    const vehicles = useSelector<RootState>(state => state.vehicle.vehicles) as TypeVehicle[];
    const swal = withReactContent(Swal)
    // const { paginate, pagination } = usePagination()
    const { isLoading } = useQuery(['vehicle'], VehicleApi.fetchVehicle, {
        onSuccess: (data: { response: TypeVehicle[]; }) => {
            dispatch(vehicleActions.setVehicle(data.response))
        },
    })

    function getDetails(item: TypeVehicle) {
        dispatch(vehicleActions.setVehicleDialog(true))
        VehicleApi.getVehicleDetails(item.id as string).then((data: { response: TypeVehicle }) => {
            dispatch(vehicleActions.setVehicleFormDto(data.response))
        })
    }



    const deleteVehicle = (id: string) => {
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
                VehicleApi.DeleteVehicle([id]).then(() => {
                    dispatch(vehicleActions.deleteVehicle([id]))
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
                    <TextField size="small" label='ابحث عن المركبات' title='shop' sx={{ width: '300px' }} name='shopSearch'></TextField>
                    <VehcileDialog />

                </div>
            </div>

            {
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
            }

        </Box>
    )
}

