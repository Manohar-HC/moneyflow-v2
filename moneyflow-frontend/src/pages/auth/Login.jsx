import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    AccountBalanceWalletRounded,
    ArrowForwardRounded,
} from "@mui/icons-material";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { saveAuth } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await loginUser(formData);

            saveAuth(response);

            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                background:
                    "radial-gradient(circle at top, rgba(124,58,237,0.20), #09090B 45%)",
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: 460,
                    p: {
                        xs: 3,
                        sm: 5,
                    },
                }}
            >
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                    }}
                >
                    <AccountBalanceWalletRounded
                        sx={{ fontSize: 30 }}
                    />
                </Box>

                <Typography
                    variant="h4"
                    fontWeight={800}
                >
                    Welcome back
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mt: 1, mb: 4 }}
                >
                    Sign in to continue to MoneyFlow.
                </Typography>

                {message && (
                    <Alert
                        severity="error"
                        sx={{ mb: 3 }}
                    >
                        {message}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <Stack spacing={2.5}>
                        <TextField
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            endIcon={
                                !loading && (
                                    <ArrowForwardRounded />
                                )
                            }
                            sx={{ py: 1.5 }}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={24}
                                    color="inherit"
                                />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </Stack>
                </Box>

                <Typography
                    color="text.secondary"
                    textAlign="center"
                    sx={{ mt: 4 }}
                >
                    Don't have an account?{" "}
                    <Box
                        component="span"
                        onClick={() =>
                            navigate("/register")
                        }
                        sx={{
                            color: "primary.main",
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        Create account
                    </Box>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;