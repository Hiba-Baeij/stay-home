import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { navLinks } from "@/router/dashRoutes";
import { useLocation } from 'react-router-dom';
export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState('');
    const location = useLocation()
    React.useEffect(() => {
        setValue(location.pathname)
    }, [])
    return (
        <Box sx={{ width: 500, position: 'fixed', bottom: 0, display: { md: 'none' } }}>
            <Paper>

                <BottomNavigation
                    sx={{
                        overflow: 'auto'
                    }}
                    value={value}
                    onChange={(_, newValue) => {
                        setValue(newValue);
                    }}
                >
                    {
                        navLinks.map((nav) => (
                            <BottomNavigationAction value={nav.path} label={nav.name}
                                icon={

                                    <nav.icon className='text-7xl h-62 w-62' />
                                } />
                        ))
                    }
                </BottomNavigation>
            </Paper>

        </Box>
    );
}