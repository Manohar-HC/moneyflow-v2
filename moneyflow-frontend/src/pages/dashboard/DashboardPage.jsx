import { useEffect, useState } from "react";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    AccountBalanceWalletRounded,
    ArrowDownwardRounded,
    ArrowUpwardRounded,
    ReceiptLongRounded,
} from "@mui/icons-material";

import {
    Box,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { getDashboardSummary } from "../../api/dashboardApi";
import { getTransactions } from "../../api/transactionApi";

function DashboardPage() {
    const [summary, setSummary] = useState(null);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const [summaryData, transactionsData] =
                await Promise.all([
                    getDashboardSummary(),
                    getTransactions(),
                ]);

            setSummary(summaryData);

            setRecentTransactions(
                transactionsData.slice(0, 5)
            );
        } catch (error) {
            console.error(
                "Failed to load dashboard",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const formatMoney = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount || 0);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    const cards = [
        {
            title: "Total Income",
            value: summary?.totalIncome,
            icon: <ArrowUpwardRounded />,
            color: "#22C55E",
            background: "rgba(34, 197, 94, 0.10)",
        },
        {
            title: "Total Expense",
            value: summary?.totalExpense,
            icon: <ArrowDownwardRounded />,
            color: "#EF4444",
            background: "rgba(239, 68, 68, 0.10)",
        },
        {
            title: "Net Balance",
            value: summary?.balance,
            icon: <AccountBalanceWalletRounded />,
            color: "#A78BFA",
            background: "rgba(124, 58, 237, 0.12)",
        },
    ];

    const incomeExpenseData = [
        {
            name: "Income",
            amount: Number(
                summary?.totalIncome || 0
            ),
        },
        {
            name: "Expense",
            amount: Number(
                summary?.totalExpense || 0
            ),
        },
    ];

    return (
        <Box
            sx={{
                p: {
                    xs: 2,
                    md: 4,
                },
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    fontWeight={800}
                >
                    Dashboard
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Track your money and financial activity.
                </Typography>
            </Box>

            <Paper
                sx={{
                    p: {
                        xs: 3,
                        md: 4,
                    },
                    mb: 3,
                    minHeight: 220,
                    position: "relative",
                    overflow: "hidden",
                    background:
                        "linear-gradient(135deg, #4C1D95 0%, #7C3AED 50%, #9333EA 100%)",
                    border: "none",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        bgcolor:
                            "rgba(255,255,255,0.08)",
                        right: -100,
                        top: -140,
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        width: 180,
                        height: 180,
                        borderRadius: "50%",
                        bgcolor:
                            "rgba(255,255,255,0.06)",
                        right: 120,
                        bottom: -130,
                    }}
                />

                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 4,
                        }}
                    >
                        <AccountBalanceWalletRounded />

                        <Typography fontWeight={600}>
                            Available Balance
                        </Typography>
                    </Box>

                    <Typography
                        variant="h2"
                        fontWeight={800}
                        sx={{
                            fontSize: {
                                xs: "2.5rem",
                                md: "4rem",
                            },
                        }}
                    >
                        {formatMoney(
                            summary?.balance
                        )}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,
                            color:
                                "rgba(255,255,255,0.75)",
                        }}
                    >
                        Your current financial position
                    </Typography>
                </Box>
            </Paper>

            <Grid container spacing={3}>
                {cards.map((card) => (
                    <Grid
                        key={card.title}
                        size={{
                            xs: 12,
                            md: 4,
                        }}
                    >
                        <Paper
                            sx={{
                                p: 3,
                                minHeight: 160,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems:
                                        "flex-start",
                                }}
                            >
                                <Box>
                                    <Typography
                                        color="text.secondary"
                                        fontWeight={500}
                                    >
                                        {card.title}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight={800}
                                        sx={{ mt: 2 }}
                                    >
                                        {formatMoney(
                                            card.value
                                        )}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 3,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent:
                                            "center",
                                        color: card.color,
                                        bgcolor:
                                        card.background,
                                    }}
                                >
                                    {card.icon}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Paper
                sx={{
                    p: 3,
                    mt: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 3,
                    }}
                >
                    <ReceiptLongRounded color="primary" />

                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Income vs Expense
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Your current financial overview
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        height: 320,
                    }}
                >
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={incomeExpenseData}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#27272A"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="name"
                                stroke="#A1A1AA"
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                stroke="#A1A1AA"
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    formatMoney(value),
                                    "Amount",
                                ]}
                                contentStyle={{
                                    background: "#18181B",
                                    border:
                                        "1px solid #3F3F46",
                                    borderRadius: "12px",
                                }}
                            />

                            <Bar
                                dataKey="amount"
                                fill="#7C3AED"
                                radius={[10, 10, 0, 0]}
                                maxBarSize={90}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Paper>

            <Paper
                sx={{
                    p: 3,
                    mt: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 2,
                    }}
                >
                    <ReceiptLongRounded color="primary" />

                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Recent Transactions
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Your latest financial activity
                        </Typography>
                    </Box>
                </Box>

                {recentTransactions.length === 0 ? (
                    <Typography
                        color="text.secondary"
                        sx={{ py: 4 }}
                    >
                        No transactions yet.
                    </Typography>
                ) : (
                    <Stack>
                        {recentTransactions.map(
                            (transaction, index) => (
                                <Box
                                    key={transaction.id}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "space-between",
                                            py: 2,
                                            gap: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                minWidth: 0,
                                            }}
                                        >
                                            <Typography
                                                fontWeight={700}
                                                noWrap
                                            >
                                                {
                                                    transaction.title
                                                }
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {
                                                    transaction.category
                                                }
                                                {" • "}
                                                {
                                                    transaction.transactionDate
                                                }
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: 2,
                                            }}
                                        >
                                            <Chip
                                                size="small"
                                                label={
                                                    transaction.type
                                                }
                                                color={
                                                    transaction.type ===
                                                    "INCOME"
                                                        ? "success"
                                                        : "error"
                                                }
                                                variant="outlined"
                                            />

                                            <Typography
                                                fontWeight={800}
                                                sx={{
                                                    minWidth:
                                                        120,
                                                    textAlign:
                                                        "right",
                                                    color:
                                                        transaction.type ===
                                                        "INCOME"
                                                            ? "success.main"
                                                            : "error.main",
                                                }}
                                            >
                                                {transaction.type ===
                                                "INCOME"
                                                    ? "+"
                                                    : "-"}
                                                {formatMoney(
                                                    transaction.amount
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {index <
                                        recentTransactions.length -
                                        1 && (
                                            <Divider />
                                        )}
                                </Box>
                            )
                        )}
                    </Stack>
                )}
            </Paper>
        </Box>
    );
}

export default DashboardPage;