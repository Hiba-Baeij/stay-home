import React from 'react'
import { Card, Typography, Box, Icon } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'
import { FaBoxes } from 'react-icons/fa'
import { HiUsers } from 'react-icons/hi2'

export default function Statistics(props: { employeesCount: number, driversCount: number, customersCount: number, shopsCount: number, ordersCount: number }) {
    interface StatItem {
        label: string,
        icon: React.ElementType,
        value: number,
        prefix: string,
        color: string
    }
    const stats: Array<StatItem> = [
        {
            label: 'عدد الموظفين',
            icon: HiUsers,
            value: props.employeesCount,
            prefix: '+',
            color: 'primary'
        },
        {
            label: 'عدد السائقين',
            icon: HiUsers,
            value: props.driversCount,
            prefix: '+',
            color: 'primary'
        },
        {
            label: 'عدد الزبائن',
            icon: HiUsers,
            value: props.customersCount,
            prefix: '+',
            color: 'primary'
        },
        {
            label: 'عدد الطلبات',
            icon: FaBoxes,
            value: props.ordersCount,
            prefix: '+',
            color: 'primary'
        },
        {
            label: 'عدد المتاجر',
            icon: FaBoxes,
            value: props.shopsCount,
            prefix: '+',
            color: 'primary'
        },
    ]

    return (
        <Card sx={{ p: 2 }}>
            {/* <Typography color='primary' fontWeight={'bold'} variant="h6">Daily Statistics</Typography> */}

            <Grid container spacing={{
                xs: 5,
                md: 0
            }} paddingY={3}>
                {
                    stats.map((s) =>
                        <Grid key={s.label} sx={{ marginX: '20px' }} display={'flex'} justifyContent={'center'}>
                            <Box display={'flex'} flexDirection={'column'} >
                                <div className="flex gap-4 justify-between items-center">
                                    <Typography variant='h6'>

                                        {s.label}
                                    </Typography>
                                    <Box borderRadius={'100%'} sx={() => ({
                                        // backgroundColor: palette.background.default,
                                        width: 40,
                                        height: 40,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        // border: `2px solid ${palette.divider}`
                                    })} >
                                        <Icon color={s.color as any} sx={{ fontSize: 24 }}>
                                            <s.icon />
                                        </Icon>
                                    </Box>
                                </div>

                                <Typography fontSize={
                                    30
                                } fontWeight={'bold'} >
                                    <span className='dark:text-gray-400 mx-1' >{s.prefix}</span>{s.value}
                                </Typography>

                            </Box>
                        </Grid>

                    )
                }

            </Grid >

        </Card >
    )
}
