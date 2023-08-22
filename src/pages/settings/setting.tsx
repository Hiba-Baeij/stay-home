import React from 'react'
import Categories from '@/components/pages/setting/Categories'
import Cities from '@/components/pages/setting/Cities'
import Pricing from '@/components/pages/setting/Pricing'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import SettingsIcon from '@mui/icons-material/Settings';
import { Tab, Tabs, Box } from '@mui/material';
import { SettingApi } from '@/api/setting/endpoints';
import { useQuery } from '@tanstack/react-query';
import { Pricing as PricingDto } from '@/store/setting';
import { settingActions } from '../../store/setting';


function SwitchComponent(props: { value: number }) {
    switch (props.value) {
        case 0:
            return <Categories />;
        case 1:
            return <Cities />;
        default:
            return <Pricing />;
    }
}

export default function Setting() {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch<AppDispatch>()
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { isLoading } = useQuery(['pricing'], SettingApi.fetchAreaPricing, {
        onSuccess: (data: { response: PricingDto[]; }) => {
            dispatch(settingActions.setPricingArea(data.response))
        },
    })


    return (
        <Box>
            <div className='flex justify-start items-center gap-3 mt-5'>
                <SettingsIcon></SettingsIcon>
                <h2 className='text-lg font-bold '>الاعدادات</h2>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="تصنيفات والمركبات" value={0} />
                    <Tab label="مناطق والمدن" value={1} />
                    <Tab label="تسعير المناطق" value={2} />
                </Tabs>
            </Box>
            <div className='mt-4'>

                <SwitchComponent value={value} />
            </div>
        </Box>

    )
}

