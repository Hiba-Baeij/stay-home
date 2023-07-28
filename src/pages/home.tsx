
import { Box, Button, Card, Typography } from '@mui/material'
import { BsPlus } from "react-icons/bs";
import Statistics from "@/components/pages/home/Statistics";
import HomeIcon from '@mui/icons-material/Home';

export default function Home() {




    return (

        <Box>
            <div className='flex justify-start items-center w-full gap-5 my-5'>
                <HomeIcon />
                <h2 className='text-lg font-bold'>الصفحة الرئيسية</h2>

            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
                <Box className="col-span-12">
                    <Statistics></Statistics>
                </Box>
                <Card className='col-span-12 md:col-span-8'>
                    <div className="p-4">

                        <Typography variant="h6" fontWeight={'bold'}>Yearly Finincial</Typography>
                        <Typography variant="body1" color='GrayText' >Lorem ipsum dolor sit amet.</Typography>

                    </div>
                    {/* <AreaDemo></AreaDemo> */}
                </Card>
                <div className="col-span-12 md:col-span-4" >

                    {/* <UsersCard></UsersCard> */}
                </div>

            </div>

        </Box>

    );
}

