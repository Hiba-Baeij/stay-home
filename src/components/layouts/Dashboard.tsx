import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CssBaseline, Typography } from "@mui/material";
import Navbar from "@/components/layouts/layout/Navbar";
import BottomNavigation from "@/components/layouts/layout/BottomNavigation";
import { BsChevronCompactLeft } from 'react-icons/bs'
import DashboardNavLinks from "./layout/DashboardNavLinks";
import Logo from '@/assets/svg/logo.svg';
const drawerFullWidth = 240;
const miniSizedDrawerWidth = 88


const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: miniSizedDrawerWidth + 'px',
    [theme.breakpoints.up("sm")]: {
        width: miniSizedDrawerWidth + 'px',
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "drawerWidth" })<{ drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme, drawerWidth),
        "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function MiniDrawer(props: any) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isMobileDrawerOpen, setMobileDrawerOpen] = React.useState(false)
    const drawerWidth = React.useMemo(() => open ? drawerFullWidth : miniSizedDrawerWidth, [open])
    const handleDrawerOpen = () => {
        setOpen(true);

    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex", transition: '0.3s', flexDirection: 'column', width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }, ml: { xs: 0, md: drawerWidth + 'px' } }}>
            <CssBaseline />

            <Navbar onMobileDrawerOpen={() => setMobileDrawerOpen(true)} drawerOpen={open} drawerWidth={drawerWidth} onOpen={handleDrawerOpen} />

            <Drawer variant="permanent" open={open} drawerWidth={drawerWidth} PaperProps={{
                elevation: 0, variant: 'elevation', sx: {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderLeft: 'none',
                    borderTop: 'none',
                    borderBottom: 'none',
                    display: {
                        xs: 'none',
                        md: 'block'
                    }
                }
            }}>
                <DrawerHeader  >
                    <Box
                        display={"flex"}

                        justifyContent={open ? "space-between" : 'center'}
                        width={"100%"}
                        alignItems={"center"}
                        px={1}
                    >
                        <img width="50" src={Logo} />
                        {
                            open &&
                            <Typography fontSize={20} fontWeight={"bold"} variant="h2">
                                Stay Home
                            </Typography>
                        }
                        {
                            open &&
                            <IconButton size="small" onClick={() => open ? handleDrawerClose() : handleDrawerOpen()}>
                                {theme.direction === "rtl" ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <BsChevronCompactLeft />
                                )}
                            </IconButton>


                        }

                    </Box>
                </DrawerHeader>
                <Box>
                    <DashboardNavLinks isOpen={open} />
                </Box>
            </Drawer>

            {/* Mobile Drawer  */}
            <MuiDrawer onClose={() => setMobileDrawerOpen(false)} open={isMobileDrawerOpen}

                ModalProps={{
                    sx: {
                        zIndex: 2500
                    }
                }}

                SlideProps={{

                    sx: (t: Theme) => ({
                        backgroundColor: t.palette.background.default,
                        width: 300
                    }),
                    elevation: 0
                } as any}>
                <DrawerHeader sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <img width="48" src="/logo.png" />

                    <Typography fontSize={13} fontWeight={"bold"} variant="h2">
                        Stay Home
                    </Typography>
                </DrawerHeader>
                <DashboardNavLinks isOpen={true} />
            </MuiDrawer>

            <Box component="main" sx={{ flexGrow: 1, position: "relative", px: '24px', pb: 2, mb: { xs: '100px', md: 0 } }}>
                {props.children}
            </Box>
            {/* <BottomNavigation /> */}
        </Box >
    );
}
