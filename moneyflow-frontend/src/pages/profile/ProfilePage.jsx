import {
    AccountCircleRounded,
    EmailRounded,
    PersonRounded,
} from "@mui/icons-material";

import {
    Avatar,
    Box,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { useAuth } from "../../context/AuthContext";

function ProfilePage() {
    const { user } = useAuth();

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={800}>
                    Profile
                </Typography>

                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                    Manage and view your account information.
                </Typography>
            </Box>

            <Paper sx={{ p: { xs: 3, md: 4 }, mb: 3 }}>
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={3}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                >
                    <Avatar
                        sx={{
                            width: 90,
                            height: 90,
                            bgcolor: "primary.main",
                            fontSize: 38,
                            fontWeight: 800,
                        }}
                    >
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </Avatar>

                    <Box>
                        <Typography variant="h4" fontWeight={800}>
                            {user?.name}
                        </Typography>

                        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                            {user?.email}
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, height: "100%" }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <PersonRounded color="primary" />

                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Full Name
                                </Typography>

                                <Typography fontWeight={700} sx={{ mt: 0.5 }}>
                                    {user?.name || "Not available"}
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3, height: "100%" }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <EmailRounded color="primary" />

                            <Box sx={{ minWidth: 0 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Email Address
                                </Typography>

                                <Typography fontWeight={700} sx={{ mt: 0.5 }} noWrap>
                                    {user?.email || "Not available"}
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <AccountCircleRounded color="primary" />

                    <Box>
                        <Typography fontWeight={700}>
                            MoneyFlow Account
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            Your account is protected using JWT authentication.
                        </Typography>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}

export default ProfilePage;