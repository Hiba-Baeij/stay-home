import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#6659B3",
        },
        secondary: {
            main: "#F6BD75",

        },
        background: {
            default: '#ffffff',
        },

    },
    typography: {
        allVariants: {
            fontFamily: `'Montserrat', sans- serif`,
            textTransform: 'none',
            fontSize: 16,
        },
    },
});

export const isDarkMode = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: "#6659B3",
                },

                background: {
                    default: '#ffffff',


                },

                secondary: {
                    main: "#F6BD75",
                    purpule: '#E0E1EF',
                    dark: '#41444A'
                },
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
            }
            : {
                // palette values for dark mode
                primary: {
                    main: "#6659B3",
                },
                secondary: {
                    main: "#F6BD75",
                },
                background: {
                    default: "#0c0c0c",
                    paper: "#121212",
                },
                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
            }),
    },
});