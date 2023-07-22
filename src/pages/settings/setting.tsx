import React from 'react'
import Categories from '@/components/pages/setting/Categories'
import Cities from '@/components/pages/setting/Cities'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import SettingsIcon from '@mui/icons-material/Settings';
import { Tab, Tabs, Box } from '@mui/material';


function SwitchComponent(props: { value: number }) {
    switch (props.value) {
        case 0:
            return <Categories />;
        default:
            return <Cities />;
    }
}

export default function Setting() {
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch<AppDispatch>()
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <Box>
            <div className='flex justify-start items-center gap-3 my-5 mb-2'>
                <SettingsIcon></SettingsIcon>
                <h2 className='text-lg font-bold '>الاعدادات</h2>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="تصنيفات والمركبات" value={0} />
                    <Tab label="مناطق والمدن" value={1} />
                </Tabs>
            </Box>
            <div className='mt-10'>

                <SwitchComponent value={value} />
            </div>
        </Box>

    )
}

