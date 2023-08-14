import { createTheme } from '@mui/material'
import { sharedThemeConfig } from './sharedThemeConfig';
export const lightTheme = createTheme({
    ...sharedThemeConfig,

    direction: 'rtl',
    palette: {
        primary: {
            main: "#6659B3",

        },
        secondary: {
            main: "#F6BD75",
        },
        background: {
            default: '#f9f9f9',
            paper: '#ffffff',
        },
        text: {
            primary: "#2f2f2f",
            secondary: "#777777"
        },
        divider: '#0000001f'
    },

});
