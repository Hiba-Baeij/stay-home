import { Theme } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'
export const sharedThemeConfig: Partial<Theme> = {
    components: {

        MuiButton: {

            styleOverrides: {
                root: () => ({
                    borderRadius: '0.5rem',
                })
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: (t) => ({
                    borderRadius: '0.5rem',
                    backgroundColor: t.ownerState.variant === 'outlined' ? t.theme.palette.background.default : 'transparent',
                })
            }
        },
        MuiAppBar: {
            defaultProps: {
                variant: 'outlined',
                elevation: 0,
            },
            styleOverrides: {

            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
                variant: 'outlined'
            },

            styleOverrides: {
                root: () => ({
                    borderRadius: '0.6rem',

                })
            }
        },

    },
    // typography: {
    //     fontFamily: ['"poppins"', '"almarai"'].join(","),
    //   } 
}