import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiPaper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { Divider, IconButton, Slide, styled, useScrollTrigger } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BarChartIcon from '@mui/icons-material/BarChart';
import Login from "@/pages/login"
import Home from "@/pages/home"
import Customer from "@/pages/customers/customer"
import Employee from "@/pages/employees/employee"
import Shop from "@/pages/shops/shop"
import Order from "@/pages/orders/order"
import Rating from "@/pages/ratings/rating"
import Setting from "@/pages/settings/setting"
import Driver from "@/pages/drivers/driver"
import Notifiation from "@/pages/notifications/notifiation"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge, Button } from '@mui/material';
import FullScreen from './FullScreen';
import Dashboard from './Dashboard';
import Vehicle from '@/pages/vehicles/vehicle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useNavigate } from "react-router-dom"
const drawerWidth = 240;
export const sidebarList = [
    {
        name: "الرئيسية",
        path: "/",
        icon: HomeIcon,
        component: Home,
        layout: Dashboard
    },
    {
        name: "الموظفين",
        path: "/employees",
        icon: PersonIcon,
        component: Employee,
        layout: Dashboard
    },
    {
        name: "الزبائن",
        path: "/customers",
        icon: PersonIcon,
        component: Customer,
        layout: Dashboard
    },

    {
        name: "السائقين",
        path: "/drivers",
        icon: StoreIcon,
        component: Driver,
        layout: Dashboard
    },
    {
        name: "المتاجر",
        path: "/shops",
        icon: ShoppingCartIcon,
        component: Shop,
        layout: Dashboard
    },
    {
        name: "الطلبات",
        path: "/orders",
        icon: ShoppingCartIcon,
        component: Order,
        layout: Dashboard
    },
    {
        name: "المركبات",
        path: "/vehicles",
        icon: LocalShippingIcon,
        component: Vehicle,
        layout: Dashboard
    },

    {
        name: "تقييمات",
        path: "/ratings",
        icon: BarChartIcon,
        component: Rating,
        layout: Dashboard
    },
    {
        name: "الاشعارات",
        path: "/notifications",
        icon: NotificationsNoneIcon,
        component: Notifiation,
        layout: Dashboard
    },

    {
        name: "الاعدادات",
        path: "/settings",
        icon: SettingsIcon,
        component: Setting,
        layout: Dashboard
    },


]
interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

function HideOnScroll(props: React.PropsWithChildren & any) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });
export default function sidebar(props: React.PropsWithChildren & any) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const theme = useTheme();
    const navigation = useNavigate();
    const colorMode = React.useContext(ColorModeContext);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    function LogOut() {
        localStorage.removeItem('user-data')
        navigation('/login')
    }

    const drawer = (

        <Box>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2
            }}>
                <Typography fontWeight={'bold'} fontSize={24} >Stay Home</Typography>
                {/* <img alt='logo' width={'56'} src='/Asset 1.svg'></img> */}
            </Toolbar>
            <Divider />

            <List>
                {sidebarList.map((item, index) => (
                    <NavLink
                        to={{ pathname: item.path }}
                        end
                        key={item.path}
                    >
                        {({ isActive }) => {
                            return (
                                <ListItem sx={{ padding: '4px' }}>
                                    <ListItemButton
                                        sx={({ palette }: any) => ({
                                            py: 0.8,
                                            px: 2,
                                            borderRadius: "0.5rem",
                                            color: isActive ? "white" : '',
                                            "&.Mui-selected , &.Mui-selected:hover": {
                                                backgroundColor: palette.primary.main,
                                            },
                                        })}
                                        selected={isActive}
                                    >
                                        <ListItemIcon
                                            sx={({ palette }) => ({
                                                color: isActive ? "white" : '',
                                            })}
                                        >
                                            <item.icon />
                                        </ListItemIcon>
                                        <ListItemText>{item.name}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            );
                        }}
                    </NavLink>
                ))}
                <Divider sx={{ marginTop: '5rem' }} />

                <ListItem sx={{ padding: '0px' }}>
                    <ListItemButton
                        sx={({ palette }: any) => ({
                            py: 0.8,
                            px: 2,
                            borderRadius: "0.5rem",
                            color: palette.grey["700"],
                            "&.Mui-selected , &.Mui-selected:hover": {
                                backgroundColor: palette.primary.main,
                            },
                        })}
                        onClick={LogOut}

                    >
                        <ListItemIcon
                            sx={({ palette }) => ({
                                color: palette.grey["700"]
                            })}
                        >
                            < LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'تسجيل الخروج'} />
                    </ListItemButton>
                </ListItem>

            </List>

        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;


    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar
                    sx={{
                        background: (teme) => teme.palette.background.paper,
                        width: { md: `calc(100% - ${drawerWidth}px)` },
                        ml: { md: `${drawerWidth}px` },
                        borderLeft: 0
                    }}
                >
                    <Toolbar>
                        <Box display={"flex"} justifyContent="space-between" width={"100%"}>
                            <IconButton
                                sx={{
                                    display: {
                                        xs: "block",
                                        md: "none",
                                    },
                                }}
                                onClick={() => setMobileOpen(true)}
                            >
                                <MenuIcon></MenuIcon>
                            </IconButton>
                            <div className='w-full flex justify-end items-center'>

                                <div>

                                    {/* <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Dashboard
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >

                                <MenuItem>

                                    <NavLink to='/login'>
                                        <ListItemIcon>
                                            <LoginIcon></LoginIcon>
                                        </ListItemIcon>
                                        Login
                                    </NavLink>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <LogoutIcon></LogoutIcon>
                                    </ListItemIcon>
                                    <NavLink to='/login'>

                                        Logout
                                    </NavLink>
                                </MenuItem>
                            </Menu> */}

                                    <IconButton>
                                        <Badge badgeContent={4} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>

                                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
                                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                    </IconButton>
                                </div>

                            </div>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >

                <Drawer
                    dir="rtl"
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    anchor="right"
                    PaperProps={{ style: { left: "unset", right: 0 } }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={({ palette }) => ({
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    })}
                >
                    {drawer}
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={({ palette }) => ({
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    })}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 1,
                    width: {
                        md: `calc(100% - ${drawerWidth}px)`,
                        xs: `100%`,
                    },
                }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
}
