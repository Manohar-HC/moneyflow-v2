import { useState } from "react";

import {
    AccountBalanceWalletRounded,
    AnalyticsRounded,
    DashboardRounded,
    LogoutRounded,
    MenuRounded,
    PersonRounded,
    ReceiptLongRounded,
} from "@mui/icons-material";

import {
    AppBar,
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";

import {
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const drawerWidth = 260;

function AppLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const [mobileOpen, setMobileOpen] = useState(false);

    const menuItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: <DashboardRounded />,
        },
        {
            label: "Transactions",
            path: "/transactions",
            icon: <ReceiptLongRounded />,
        },
        {
            label: "Analytics",
            path: "/analytics",
            icon: <AnalyticsRounded />,
        },
        {
            label: "Profile",
            path: "/profile",
            icon: <PersonRounded />,
        },
    ];

    const handleNavigate = (path) => {
        navigate(path);
        setMobileOpen(false);
    };

    const handleLogout = () => {
        setMobileOpen(false);
        logout();
        navigate("/login", {
            replace: true,
        });
    };

    const drawerContent = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                p: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 1,
                    py: 2,
                }}
            >
                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 3,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <AccountBalanceWalletRounded />
                </Box>

                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        variant="h6"
                        fontWeight={800}
                    >
                        MoneyFlow
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        Finance Manager
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <List sx={{ flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const selected =
                        location.pathname === item.path;

                    return (
                        <ListItemButton
                            key={item.path}
                            selected={selected}
                            onClick={() =>
                                handleNavigate(item.path)
                            }
                            sx={{
                                mb: 1,
                                borderRadius: 3,
                                minHeight: 50,

                                "&.Mui-selected": {
                                    bgcolor:
                                        "rgba(124, 58, 237, 0.18)",
                                    color: "#A78BFA",
                                },

                                "&.Mui-selected:hover": {
                                    bgcolor:
                                        "rgba(124, 58, 237, 0.25)",
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 42,
                                    color: selected
                                        ? "#A78BFA"
                                        : "text.secondary",
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>

                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontWeight: selected
                                        ? 700
                                        : 500,
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>

            <Divider sx={{ mb: 2 }} />

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1,
                    mb: 2,
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: "primary.main",
                        width: 42,
                        height: 42,
                        flexShrink: 0,
                    }}
                >
                    {user?.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                </Avatar>

                <Box
                    sx={{
                        minWidth: 0,
                        overflow: "hidden",
                    }}
                >
                    <Typography
                        fontWeight={700}
                        noWrap
                    >
                        {user?.name}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                        sx={{
                            display: "block",
                        }}
                    >
                        {user?.email}
                    </Typography>
                </Box>
            </Box>

            <Button
                variant="outlined"
                fullWidth
                startIcon={<LogoutRounded />}
                onClick={handleLogout}
                sx={{
                    py: 1.2,
                    borderColor: "#3F3F46",
                    color: "text.secondary",

                    "&:hover": {
                        borderColor: "error.main",
                        color: "error.main",
                    },
                }}
            >
                Logout
            </Button>
        </Box>
    );

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                bgcolor: "background.default",
            }}
        >
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    display: {
                        xs: "block",
                        md: "none",
                    },
                    bgcolor: "#0D0D0F",
                    borderBottom:
                        "1px solid #27272A",
                    backgroundImage: "none",
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={() =>
                            setMobileOpen(true)
                        }
                        sx={{ mr: 2 }}
                    >
                        <MenuRounded />
                    </IconButton>

                    <AccountBalanceWalletRounded
                        color="primary"
                        sx={{ mr: 1 }}
                    />

                    <Typography
                        variant="h6"
                        fontWeight={800}
                    >
                        MoneyFlow
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{
                    width: {
                        md: drawerWidth,
                    },
                    flexShrink: {
                        md: 0,
                    },
                }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() =>
                        setMobileOpen(false)
                    }
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {
                            xs: "block",
                            md: "none",
                        },

                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            bgcolor: "#0D0D0F",
                            borderRight:
                                "1px solid #27272A",
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>

                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: {
                            xs: "none",
                            md: "block",
                        },

                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                            bgcolor: "#0D0D0F",
                            borderRight:
                                "1px solid #27272A",
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    minHeight: "100vh",
                    bgcolor: "background.default",
                    pt: {
                        xs: "64px",
                        md: 0,
                    },
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default AppLayout;