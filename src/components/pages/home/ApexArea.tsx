import React from 'react'
import Chart, { Props } from "react-apexcharts";
import { useTheme } from '@mui/material/styles';
export default function ApexArea() {

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
                categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
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
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100],
            color: theme.palette.primary.main,

        },
        {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41],
            color: theme.palette.secondary.main
        }
        ],


    }
    return (
        <Chart {...chartOptions}>
        </Chart>
    )
}
