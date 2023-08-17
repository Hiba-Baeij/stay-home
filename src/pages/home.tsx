
import { Box, Button, Card, Typography } from '@mui/material'
import { BsPlus } from "react-icons/bs";
import Statistics from "@/components/pages/home/Statistics";
import BestShops from "@/components/pages/home/BestShops";
import ApexArea from "@/components/pages/home/ApexArea";
import HomeIcon from '@mui/icons-material/Home';

export default function Home() {




    return (

        <Box>
            <div className='flex justify-start items-center w-full gap-5 my-5'>
                <HomeIcon />
                <h2 className='text-lg font-bold'>الصفحة الرئيسية</h2>

            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <Box className='col-span-12 md:col-span-8'>
                    <Statistics></Statistics>
                    <Card className='mt-6'>
                        <div className="p-4">

                            <Typography variant="h6" fontWeight={'bold'}>عدد الطلبات الشهرية</Typography>

                        </div>
                        <ApexArea></ApexArea>
                    </Card>
                </Box>
                <Box className="col-span-12 md:col-span-4" >
                    <BestShops></BestShops>
                </Box>
                {/* <div className="col-span-12 md:col-span-4" >

                    <BestDrivers></BestDrivers>
                </div> */}

            </div>

        </Box>

    );
}

