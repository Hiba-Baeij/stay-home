import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Avatar, Badge, Box, Paper, IconButton, InputAdornment, TextField, Tooltip, Typography, Slide } from "@mui/material";
import { IoMenu, IoMenuOutline, IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "usehooks-ts";
import { BsChevronCompactRight, BsMenuApp } from 'react-icons/bs'
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface Props {
    drawerWidth: number;
    drawerOpen: boolean;
    onMobileDrawerOpen: (e: any) => void;
    onOpen: (e: any) => void;
}
export default function Navbar({
    drawerWidth,
    onOpen,
    drawerOpen,
    onMobileDrawerOpen
}: Props) {

    const { toggle, isDarkMode } = useDarkMode(false);


    const handleOpenUserMenu = () => { }

    interface Props {
        /**
         * Injected by the documentation to work in an iframe.
         * You won't need it on your project.
         */
        window?: () => Window;
        children: React.ReactElement;
    }

    function HideOnScroll(props: Props) {
        const { children, window } = props;
        // Note that you normally won't need to set the window ref as useScrollTrigger
        // will default to window.
        // This is only being set here because the demo is in an iframe.
        const trigger = useScrollTrigger({
            target: window ? window() : undefined,
            threshold: 50
        });

        return (
            <Slide appear={false} direction="down" in={!trigger}>
                {children}
            </Slide>
        );
    }


    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== "open",
    })<AppBarProps>(({ theme, open: drawerOpen }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(drawerOpen && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));






    return (

        <HideOnScroll>
            <AppBar position="sticky" color="transparent" sx={{ p: '10px', border: 0 }} >

                <Paper sx={{ p: 3, height: 80, display: 'flex', justifyContent: 'center' }}>
                    <Box display={'flex'} alignItems={'center'} gap={2} justifyContent={'space-between'} width={'100%'}>
                        <Box className="left" display={'flex'} gap={2} alignItems={'center'} justifyContent={'center'}>
                            {
                                !drawerOpen &&
                                (

                                    <IconButton
                                        size="small"
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={onOpen}
                                        edge="start"
                                        sx={{
                                            height: 35,
                                            width: 35,
                                            display: {
                                                xs: "none",
                                                md: 'block'
                                            }
                                        }}

                                    >
                                        <BsChevronCompactRight />
                                    </IconButton>
                                )

                            }


                            <IconButton
                                onClick={onMobileDrawerOpen}
                                size="large"
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                sx={{
                                    display: {
                                        md: 'none',
                                    }
                                }}

                            >
                                <IoMenuOutline />
                            </IconButton>

                            <TextField
                                sx={{
                                    width: {
                                        sm: 300,
                                        md: 400,
                                        lg: 600
                                    }
                                }}
                                size="small"
                                variant="outlined"
                                placeholder="Search For Some Thing"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IoSearchOutline />
                                        </InputAdornment>
                                    ),
                                }}

                            />






                        </Box>
                        <Box className="right relative">

                            <Box sx={{ flexGrow: 0, alignItems: 'center' }} display={'flex'} gap={{
                                md: 3,
                                xs: 1
                            }}>



                                <IconButton onClick={() => toggle()}  >
                                    {
                                        isDarkMode ?
                                            <HiOutlineSun />
                                            :
                                            <HiOutlineMoon />
                                    }
                                </IconButton>

                                <Badge variant="standard" color="error" badgeContent={5}>
                                    <IconButton  >
                                        <IoNotificationsOutline></IoNotificationsOutline>
                                    </IconButton>

                                </Badge>


                                <Tooltip title="Open settings">
                                    <Box display={'flex'} alignItems={'center'} gap="10px">

                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="/user.jpg" />
                                        </IconButton>
                                        <Box sx={{
                                            display: {
                                                xs: 'none',
                                                md: 'flex'
                                            },
                                            flexDirection: 'column'
                                        }}>
                                            <Typography>User Name</Typography>
                                            <Typography fontSize={10} color='GrayText' >Admin</Typography>
                                        </Box>


                                    </Box>

                                </Tooltip>



                            </Box>


                        </Box>


                    </Box>
                </Paper>

            </AppBar>

        </HideOnScroll>
    );
}
