
import { createTheme } from '@mui/material'
import { sharedThemeConfig } from './sharedThemeConfig'
export const darkTheme = createTheme({
    direction: 'rtl',
    ...sharedThemeConfig,

    palette: {
        mode: 'dark',
        primary: {
            main: "#6659B3",
        },
        secondary: {
            main: "#F6BD75",
        },

        background: {
            default: '#13181F',
            paper: '#171E27',
        },
        text: {
            primary: "#ffffff",
            secondary: "#eeeeee"
        },
        divider: '#373C40'
    },


})
