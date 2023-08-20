import React from 'react'
import Chart, { Props } from "react-apexcharts";
import { useTheme } from '@mui/material/styles';
export default function ApexArea(props: { passengerOrderCountMonthly: number[], deliveryOrderCountMonthly: number[], shippingOrderCountMonthly: number[] }) {

    const theme = useTheme()

    const chartOptions: Props = {

        type: 'area',
        height: 300,
        options: {
            theme: {
                mode: theme.palette.mode,
            },

            dataLabels: {
                enabled: false
            },
            chart: {
                id: "basic-bar",
                background: 'transparent',
                type: 'area',

                toolbar: {
                    show: false
                }
            },

            grid: {
                borderColor: theme.palette.divider
            },

            xaxis: {
                categories: ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            },
            tooltip: {
                enabled: true,
                theme: 'dark',

            },
            stroke: {
                curve: "smooth",

            }
        },

        series: [{
            name: 'عدد طلبات الشحن البضائع شهريا',
            data: props.shippingOrderCountMonthly,
            color: theme.palette.primary.main,

        },
        {
            name: 'عدد طلبات التوصيل الاغراض شهريا',
            data: props.deliveryOrderCountMonthly,
            color: theme.palette.secondary.main
        },
        {
            name: 'عدد طلبات التوصيل الأشخاص شهريا',
            data: props.passengerOrderCountMonthly,
            color: theme.palette.grey[400]
        }
        ],


    }
    return (
        <Chart {...chartOptions}>
        </Chart>
    )
}
