import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Login from '@/assets/svg/login.svg';
import { theme } from '@/theme';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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


export default function signin() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (

        <Grid container component="main">
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
                    alignItems: 'center'
                }}
            >
                <img src={Login}></img>
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
                        انشاء حساب
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="الاسم"
                            name="fullName"
                            autoComplete="fullName"
                            autoFocus
                        />


                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="بريد الالكتروني"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="كلمة المرور"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phonenumber"
                            label="رقم الموبايل"
                            type="phonenumber"
                            id="phonenumber"
                            autoComplete="current-phonenumber"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="primary"
                        >
                            ارسال
                        </Button>
                        <Grid container
                            display="flex"
                            justifyContent="between"
                            alignItems="center" rowSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                <Link href="/login" variant="body2">
                                    {"ان لديك حساب؟ سجل الان "}
                                </Link>
                            </Grid>
                            <Grid item xs={6} display="flex" justifyContent="end"
                                alignItems="center" >
                                <Button variant='text'><Link href="/" color="secondary"><ArrowBackIcon />رجوع الى الرئيسية </Link> </Button>
                            </Grid>

                        </Grid>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>

            </Grid>
        </Grid>

    );
}