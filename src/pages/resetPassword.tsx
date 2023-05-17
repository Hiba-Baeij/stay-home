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
import Login from '@/assets/svg/reset-password.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function password() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (

        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <img src={Login}></img>
            </Grid>
            {/* sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} */}
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square color='secondary.purpule'>
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
                        هل نسيت كلمة المرور؟
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                            name="reset-password"
                            label="اعد ادخال كلمة المرور"
                            type="password"
                            id="reset-password"
                            autoComplete="reset-password"
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

                    </Box>
                </Box>
                <Box sx={{ paddingX: '30px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button variant='text'><Link href="/" color="primary">تسجيل الدخول </Link> </Button>
                    <Button variant='text'><Link href="/" color="secondary"><ArrowBackIcon />رجوع الى الرئيسية </Link> </Button>
                </Box>
            </Grid>
        </Grid>

    );
}