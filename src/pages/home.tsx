
import { Box, Button, Card, MenuItem, Select, Typography } from '@mui/material'
import { BsPlus } from "react-icons/bs";
import Statistics from "@/components/pages/home/Statistics";
import BestShops from "@/components/pages/home/BestShops";
import ApexArea from "@/components/pages/home/ApexArea";
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { HomeApi } from '@/api/home/endpoints';
import { Home as HomeType } from '@/api/home/dto';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import home, { homeActions } from '@/store/home';

export default function Home() {
    const [year, setYear] = React.useState<number>(2023);
    const dispatch = useDispatch<AppDispatch>();
    const homeDto = useSelector<RootState>(state => state.home.homeDto) as HomeType;
    const handleSelectChange = (event: any) => {
        setYear(event.target.value);
        HomeApi.fetchHome(event.target.value).then((res) => dispatch(homeActions.setHome(res.response)))
    };

    useQuery({
        queryKey: ["home"],
        queryFn: () => HomeApi.fetchHome(year),
        onSuccess: (data: { response: HomeType }) => {
            dispatch(homeActions.setHome(data.response))
        },
    })


    return (

        <Box>
            <div className='flex justify-between items-center w-full  my-5'>
                <div className='flex justify-start items-center w-full gap-5 '>
                    <HomeIcon />
                    <h2 className='text-lg font-bold'>الصفحة الرئيسية</h2>
                </div>

                <Select size="small"
                    name='driverId'
                    labelId="driver-id-label"
                    value={year}
                    onChange={handleSelectChange}
                    fullWidth
                >
                    <MenuItem key={2023} value={2023}>2023</MenuItem>
                    <MenuItem key={2024} value={2024}>2024</MenuItem>
                    <MenuItem key={2025} value={2025}>2025</MenuItem>

                </Select>

            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <Box className='col-span-12 md:col-span-9'>
                    <Statistics customersCount={homeDto.customersCount} driversCount={homeDto.driversCount} employeesCount={homeDto.employeesCount} ordersCount={homeDto.ordersCount} shopsCount={homeDto.shopsCount}></Statistics>
                    <Card className='mt-6'>
                        <div className="p-4">

                            <Typography variant="h6" fontWeight={'bold'}>عدد الطلبات الشهرية</Typography>

                        </div>
                        <ApexArea deliveryOrderCountMonthly={homeDto.deliveryOrderCountMonthly} passengerOrderCountMonthly={homeDto.passengerOrderCountMonthly} shippingOrderCountMonthly={homeDto.shippingOrderCountMonthly}></ApexArea>
                    </Card>
                </Box>
                <Box className="col-span-12 md:col-span-3" >
                    <BestShops bestDrivers={homeDto.bestDrivers} bestShops={homeDto.bestShops}></BestShops>
                </Box>
                {/* <div className="col-span-12 md:col-span-4" >

                    <BestDrivers></BestDrivers>
                </div> */}

            </div>

        </Box>

    );
}

