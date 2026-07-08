import { useEffect, useMemo, useState } from "react";

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import {
    AnalyticsRounded,
    ArrowDownwardRounded,
    ArrowUpwardRounded,
} from "@mui/icons-material";

import {
    Box,
    CircularProgress,
    Grid,
    Paper,
    Typography,
} from "@mui/material";

import { getTransactions } from "../../api/transactionApi";

const CHART_COLORS = [
    "#7C3AED",
    "#22C55E",
    "#EF4444",
    "#F59E0B",
    "#3B82F6",
    "#EC4899",
    "#14B8A6",
    "#8B5CF6",
];

function AnalyticsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error("Failed to load analytics", error);
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

    const analytics = useMemo(() => {
        let totalIncome = 0;
        let totalExpense = 0;

        const categoryMap = {};

        transactions.forEach((transaction) => {
            const amount = Number(transaction.amount || 0);

            if (transaction.type === "INCOME") {
                totalIncome += amount;
            }

            if (transaction.type === "EXPENSE") {
                totalExpense += amount;

                const category =
                    transaction.category || "Other";

                categoryMap[category] =
                    (categoryMap[category] || 0) + amount;
            }
        });

        const categoryData = Object.entries(categoryMap)
            .map(([name, value]) => ({
                name,
                value,
            }))
            .sort((a, b) => b.value - a.value);

        return {
            totalIncome,
            totalExpense,
            categoryData,
        };
    }, [transactions]);

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
                    Analytics
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    Understand where your money is going.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box>
                                <Typography color="text.secondary">
                                    Total Income
                                </Typography>

                                <Typography
                                    variant="h4"
                                    fontWeight={800}
                                    sx={{ mt: 2 }}
                                >
                                    {formatMoney(
                                        analytics.totalIncome
                                    )}
                                </Typography>
                            </Box>

                            <ArrowUpwardRounded
                                sx={{
                                    fontSize: 42,
                                    color: "success.main",
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box>
                                <Typography color="text.secondary">
                                    Total Expense
                                </Typography>

                                <Typography
                                    variant="h4"
                                    fontWeight={800}
                                    sx={{ mt: 2 }}
                                >
                                    {formatMoney(
                                        analytics.totalExpense
                                    )}
                                </Typography>
                            </Box>

                            <ArrowDownwardRounded
                                sx={{
                                    fontSize: 42,
                                    color: "error.main",
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
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
                    <AnalyticsRounded color="primary" />

                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Expense by Category
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Your spending distribution
                        </Typography>
                    </Box>
                </Box>

                {analytics.categoryData.length === 0 ? (
                    <Box
                        sx={{
                            minHeight: 360,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography color="text.secondary">
                            Add expense transactions to see
                            category analytics.
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            width: "100%",
                            height: 420,
                        }}
                    >
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <PieChart>
                                <Pie
                                    data={analytics.categoryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={85}
                                    outerRadius={145}
                                    paddingAngle={4}
                                >
                                    {analytics.categoryData.map(
                                        (entry, index) => (
                                            <Cell
                                                key={entry.name}
                                                fill={
                                                    CHART_COLORS[
                                                    index %
                                                    CHART_COLORS.length
                                                        ]
                                                }
                                            />
                                        )
                                    )}
                                </Pie>

                                <Tooltip
                                    formatter={(value) =>
                                        formatMoney(value)
                                    }
                                    contentStyle={{
                                        background: "#18181B",
                                        border:
                                            "1px solid #3F3F46",
                                        borderRadius: "12px",
                                    }}
                                />

                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}

export default AnalyticsPage;