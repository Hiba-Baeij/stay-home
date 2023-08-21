import List from "@mui/material/List";
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "@/router/dashRoutes";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { GetAccessTokenDecoded, LogOut } from "@/global/auth";
import { useMemo } from "react";
type Props = {
    isOpen: boolean;
};
export default function DashboardNavLinks(props: Props) {
    const navigation = useNavigate();
    const tokenDecoded = GetAccessTokenDecoded();
    console.log(tokenDecoded);

    const filterNavigation = useMemo(() => {
        if (tokenDecoded) {
            return navLinks.filter((ele) =>
                ele.roles.includes(
                    tokenDecoded[
                    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
                    ]
                )
            );
        } else {
            return navLinks;
        }
    }, [tokenDecoded]);

    console.log(filterNavigation);

    function logOut() {
        LogOut();
        navigation('/login')
    }
    return (
        <>
            <List>
                {filterNavigation.map((item) => (
                    <NavLink to={{ pathname: item.path }} end key={item.path}>
                        {({ isActive }) => {
                            return (
                                <ListItem>
                                    {
                                        props.isOpen ? <ListItemButton
                                            sx={({ palette }) => ({
                                                py: 0.8,
                                                px: 2,
                                                borderRadius: "0.5rem",
                                                minHeight: 45,
                                                transition: '0.2s',
                                                color: isActive ? "white" : palette.text.primary,
                                                ":hover": {
                                                    background: 'transparent',
                                                    color: palette.primary.main,
                                                },
                                                "&.Mui-selected , &.Mui-selected:hover": {
                                                    backgroundColor: palette.background.default,
                                                    // backgroundColor: 'transparent',
                                                    color: palette.primary.main,
                                                    "::after": ({ palette }) => ({
                                                        content: "''",
                                                        background: palette.primary.main,
                                                        width: '5px',
                                                        position: 'absolute',
                                                        height: '35px',
                                                        right: '-16px',
                                                        borderRadius: '5px 0 0 5px',

                                                    })
                                                },
                                            })}
                                            selected={isActive}
                                        >
                                            <ListItemIcon
                                                sx={() => ({
                                                    minWidth: 40,
                                                    color: 'inherit'
                                                })}
                                            >

                                                <item.icon size={"1.4rem"} />
                                            </ListItemIcon>
                                            {props.isOpen && <ListItemText primary={item.name} />}
                                        </ListItemButton> : <Tooltip title={item.name} placement='left'>
                                            <ListItemButton
                                                sx={({ palette }) => ({
                                                    py: 0.8,
                                                    px: 2,
                                                    borderRadius: "0.5rem",
                                                    minHeight: 45,
                                                    transition: '0.2s',
                                                    color: isActive ? "white" : palette.text.primary,
                                                    ":hover": {
                                                        background: 'transparent',
                                                        color: palette.primary.main,
                                                    },
                                                    "&.Mui-selected , &.Mui-selected:hover": {
                                                        backgroundColor: palette.background.default,
                                                        // backgroundColor: 'transparent',
                                                        color: palette.primary.main,
                                                        "::after": ({ palette }) => ({
                                                            content: "''",
                                                            background: palette.primary.main,
                                                            width: '5px',
                                                            position: 'absolute',
                                                            height: '35px',
                                                            right: '-16px',
                                                            borderRadius: '5px 0 0 5px',

                                                        })
                                                    },
                                                })}
                                                selected={isActive}
                                            >
                                                <ListItemIcon
                                                    sx={() => ({
                                                        minWidth: 40,
                                                        color: 'inherit'
                                                    })}
                                                >

                                                    <item.icon size={"1.4rem"} />
                                                </ListItemIcon>
                                                {props.isOpen && <ListItemText primary={item.name} />}
                                            </ListItemButton>
                                        </Tooltip>
                                    }

                                </ListItem>



                            );
                        }}
                    </NavLink>
                ))}
            </List>
            <List sx={{ width: '100%', position: 'absolute', bottom: '0px' }}>
                <Divider />
                <ListItem sx={({ palette }) => ({
                    py: 0.8,
                    px: 2,
                    borderRadius: "0.5rem",
                    minHeight: 45,
                    transition: '0.2s',
                    color: palette.text.primary,
                    ":hover": {
                        background: 'transparent',
                        color: palette.primary.main,
                    },
                    "&.Mui-selected , &.Mui-selected:hover": {
                        backgroundColor: palette.background.default,
                        // backgroundColor: 'transparent',
                        color: palette.primary.main,
                        "::after": ({ palette }) => ({
                            content: "''",
                            background: palette.primary.main,
                            width: '5px',
                            position: 'absolute',
                            height: '35px',
                            right: '-16px',
                            borderRadius: '5px 0 0 5px',

                        })
                    },
                })}>
                    {
                        props.isOpen ? <ListItemButton onClick={logOut}>
                            <ListItemIcon
                                sx={() => ({
                                    minWidth: 40,
                                    color: 'inherit'
                                })}
                            >
                                <LogoutIcon ></LogoutIcon>
                            </ListItemIcon>
                            {props.isOpen && <ListItemText primary='تسجيل الدخول' />}
                        </ListItemButton> :

                            <Tooltip title='تسجيل خروج' placement='left' >
                                <ListItemButton onClick={logOut}>
                                    <ListItemIcon
                                        sx={() => ({
                                            minWidth: 40,
                                            color: 'inherit'
                                        })}
                                    >
                                        <LogoutIcon ></LogoutIcon>
                                    </ListItemIcon>
                                    {props.isOpen && <ListItemText primary='تسجيل الدخول' />}
                                </ListItemButton>
                            </Tooltip>
                    }
                </ListItem>
            </List>
        </>

    );
}
