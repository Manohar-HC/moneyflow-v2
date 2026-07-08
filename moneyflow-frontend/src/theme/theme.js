import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",

        background: {
            default: "#09090B",
            paper: "#111113",
        },

        primary: {
            main: "#7C3AED",
        },

        success: {
            main: "#22C55E",
        },

        error: {
            main: "#EF4444",
        },

        text: {
            primary: "#FAFAFA",
            secondary: "#A1A1AA",
        },
    },

    typography: {
        fontFamily: '"Inter", "Roboto", sans-serif',

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 700,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 14,
    },

    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: "1px solid #27272A",
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    paddingLeft: 18,
                    paddingRight: 18,
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderColor: "#27272A",
                },
            },
        },
    },
});

export default theme;