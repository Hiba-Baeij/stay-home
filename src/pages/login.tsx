import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Login from '@/assets/svg/login.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoginUser } from "@/global/auth"
import { theme } from '@/theme';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const initialForm = {
        email: '',
        password: '',
    }
    const { handleSubmit, control } = useForm({
        defaultValues: { ...initialForm }
    });
    const onSubmit = (data: any) => {
        setIsLoading(true);
        console.log(data);
        LoginUser({
            email: data.email,
            password: data.password,
        }).then(() => { navigate('/'); setIsLoading(true) }).catch(() => setIsLoading(true))
    }

    return (

        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={false}
                md={7}
                sx={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: { lg: 'flex', sm: 'none', xs: 'none' },
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >
                <img src={Login} ></img>
            </Grid>
            <Grid item xs={12} sm={12} lg={5} md={12} component={Paper} elevation={6} square color='secondary.purpule'>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon color='secondary' />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ mt: 2, fontWeight: 'bold' }} color='primary'>
                        تسجيل الدخول
                    </Typography>
                    {/* <Box sx={{ mt: 1 }}> */}
                    <form onSubmit={handleSubmit(onSubmit)} className='mt-1'>
                        <Controller rules={{ required: 'البريد الالكتروني مطلوب' }} name='email' control={control} render={({ field, fieldState }) =>
                            <TextField {...field} margin="normal" autoFocus fullWidth helperText={fieldState.error?.message} error={!!fieldState.error} name='email' id='email' label='البريد الالكتروني' />} />

                        <Controller rules={{ required: 'كلمة المرور مطلوبة' }} name='password' control={control} render={({ field, fieldState }) =>
                            <TextField {...field} name='password' id='password' margin="normal" autoFocus fullWidth label='كلمة المرور' error={!!fieldState.error}
                                helperText={fieldState.error?.message} type="password" />} />


                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label='تذكرني'
                            sx={{ color: theme.palette.secondary['dark'] }}
                        />
                        {
                            isLoading ?
                                <LoadingButton loading fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, height: '35px' }}></LoadingButton>
                                : <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    color="primary"
                                >
                                    تسجيل الدخول
                                </Button>

                        }

                    </form>

                    <Grid container>
                        <Grid item xs>
                            <Link href="/resetPassword" variant="body2">
                                هل نسيت كلمة المرور؟
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"ليس لديك حساب؟ أنشئ الان "}
                            </Link>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                    {/* </Box> */}
                </Box>
                <Box sx={{ paddingRight: '30px', width: '100%', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                    <Button variant='text'><Link href="/" color="secondary"><ArrowBackIcon />رجوع الى الرئيسية </Link> </Button>
                </Box>
            </Grid>
        </Grid >

    );
}