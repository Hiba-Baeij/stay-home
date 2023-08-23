import React from 'react'
import ShippingOrder from '@/components/pages/order/ShippingOrder'
import DeliveryOrder from '@/components/pages/order/DeliveryOrder'
import PassengerOrder from '@/components/pages/order/PassengerOrder'
import RejectedOrder from '@/components/pages/order/RejectedOrder'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import SettingsIcon from '@mui/icons-material/Settings';
import { Tab, Tabs, Box, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useQuery } from '@tanstack/react-query'
import { DriverApi } from '@/api/driver/endpoints'
import { driverActions } from '@/store/driver'


function SwitchComponent(props: { value: number }) {
    switch (props.value) {
        case 0:
            return <PassengerOrder />;
        case 1:
            return <ShippingOrder />;
        case 2:
            return <DeliveryOrder />;
        default:
            return <RejectedOrder />;
    }
}

export default function Setting() {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch<AppDispatch>()
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    useQuery(['availableDriver'], DriverApi.getAvailableDriver, {
        onSuccess: (data: { response: { fullName: string, id: string }[]; }) => {
            dispatch(driverActions.setDriverAvailableNames(data.response))
        },
    })

    return (
        <Box>
            <div className='flex justify-start items-center w-full gap-5 mt-5'>
                <div className='flex justify-center items-center gap-3'>

                    <ShoppingCartIcon></ShoppingCartIcon>
                    <h2 className='text-lg font-bold '>الطلبات</h2>
                </div>
                {/* <div className='flex justify-center items-center gap-3'>
                    <TextField size="small" label='ابحث عن طلب' title='order' sx={{ width: '300px' }} name='orderSearch'></TextField>
                </div> */}

            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="توصيل الاشخاص" value={0} />
                    <Tab label="توصيل البضائع" value={1} />
                    <Tab label="توصيل الاغراض" value={2} />
                    <Tab label="الطلبات المبلغ عنها" value={3} />
                </Tabs>
            </Box>
            <div className='mt-4'>

                <SwitchComponent value={value} />
            </div>
        </Box>

    )
}


