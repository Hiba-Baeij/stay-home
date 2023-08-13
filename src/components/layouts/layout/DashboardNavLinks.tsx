import List from "@mui/material/List";
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "@/router/dashRoutes";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { LogOut } from "@/global/auth";
type Props = {
    isOpen: boolean;
};
export default function DashboardNavLinks(props: Props) {
    const navigation = useNavigate();
    function logOut() {
        LogOut();
        navigation('/login')
    }
    return (
        <>
            <List>
                {navLinks.map((item) => (
                    <NavLink to={{ pathname: item.path }} end key={item.path}>
                        {({ isActive }) => {
                            return (
                                <ListItem>
                                    <Tooltip title={item.name} placement='left'>
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
                                </ListItem>



                            );
                        }}
                    </NavLink>
                ))}
            </List>
            <List>
                <ListItem sx={({ palette }) => ({
                    mt: 10,
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
                </ListItem>
            </List>
        </>

    );
}
