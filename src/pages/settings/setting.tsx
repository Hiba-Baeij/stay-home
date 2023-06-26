import React from 'react'
import Areas from '@/components/pages/setting/Areas'
import Categories from '@/components/pages/setting/Categories'
import Cities from '@/components/pages/setting/Cities'
import { useQueries, useQuery } from '@tanstack/react-query';
import { SettingApi } from "@/api/setting/endpoints"
import { settingActions } from '@/store/setting';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import SettingsIcon from '@mui/icons-material/Settings';
import VehicleType from '@/components/pages/setting/VehicleType';

export default function Setting() {

    const dispatch = useDispatch<AppDispatch>()
    const { isLoading: loadingCity } = useQuery(['city'], SettingApi.fetchCity, {
        onSuccess: (data) => {
            dispatch(settingActions.setCity(data.response))
        },
    })
    const { isLoading: loadingCategory } = useQuery(['category'], SettingApi.fetchCategory, {
        onSuccess: (data) => {
            dispatch(settingActions.setCategory(data.response))
        },
    })
    const { isLoading: loadingArea } = useQuery(['area'], SettingApi.fetchArea, {
        onSuccess: (data) => {
            dispatch(settingActions.setArea(data.response))
        },
    })
    const { isLoading: loadingVehcile } = useQuery(['vehcile'], SettingApi.fetchVehicle, {
        onSuccess: (data) => {
            dispatch(settingActions.setVehicle(data.response))
        },
    })

    return (
        <div className='p-2'>
            <div className='flex justify-start items-center gap-3 my-5'>

                <SettingsIcon></SettingsIcon>
                <h2 className='text-lg font-bold '>الاعدادات</h2>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-1'>
                    <Cities loading={loadingCity} />
                </div>

                <div className='col-span-1'>
                    <Categories loading={loadingCategory} />
                </div>
                <div className='col-span-1'>
                    <Areas loading={loadingArea} />
                </div>
                <div className='col-span-1'>
                    <VehicleType loading={loadingVehcile} />
                </div>
            </div>
        </div>

    )
}

