import { useEffect, useMemo, useState } from "react";

import {
    AddRounded,
    DeleteOutlineRounded,
    DownloadRounded,
    EditRounded,
    SearchRounded,
} from "@mui/icons-material";

import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import {
    createTransaction,
    deleteTransaction,
    getTransactions,
    updateTransaction,
} from "../../api/transactionApi";

const emptyForm = {
    title: "",
    amount: "",
    type: "EXPENSE",
    category: "",
    transactionDate: "",
    note: "",
};

function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("ALL");
    const [categoryFilter, setCategoryFilter] = useState("ALL");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error("Failed to load transactions", error);
        } finally {
            setLoading(false);
        }
    };

    const categories = useMemo(() => {
        return [
            ...new Set(
                transactions
                    .map((transaction) => transaction.category)
                    .filter(Boolean)
            ),
        ].sort();
    }, [transactions]);

    const filteredTransactions = useMemo(() => {
        const query = search.trim().toLowerCase();

        return transactions.filter((transaction) => {
            const matchesSearch =
                !query ||
                [
                    transaction.title,
                    transaction.category,
                    transaction.type,
                    transaction.transactionDate,
                    transaction.note,
                ].some((value) =>
                    String(value || "")
                        .toLowerCase()
                        .includes(query)
                );

            const matchesType =
                typeFilter === "ALL" ||
                transaction.type === typeFilter;

            const matchesCategory =
                categoryFilter === "ALL" ||
                transaction.category === categoryFilter;

            return (
                matchesSearch &&
                matchesType &&
                matchesCategory
            );
        });
    }, [
        transactions,
        search,
        typeFilter,
        categoryFilter,
    ]);

    const formatMoney = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount || 0);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const openCreateDialog = () => {
        setEditingId(null);
        setFormData(emptyForm);
        setDialogOpen(true);
    };

    const openEditDialog = (transaction) => {
        setEditingId(transaction.id);

        setFormData({
            title: transaction.title,
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category,
            transactionDate: transaction.transactionDate,
            note: transaction.note || "",
        });

        setDialogOpen(true);
    };

    const closeDialog = () => {
        if (saving) {
            return;
        }

        setDialogOpen(false);
        setEditingId(null);
        setFormData(emptyForm);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSaving(true);

        const transactionData = {
            ...formData,
            amount: Number(formData.amount),
        };

        try {
            if (editingId !== null) {
                await updateTransaction(
                    editingId,
                    transactionData
                );
            } else {
                await createTransaction(transactionData);
            }

            await loadTransactions();
        } catch (error) {
            console.error(
                "Failed to save transaction",
                error
            );
        } finally {
            setSaving(false);
            setDialogOpen(false);
            setEditingId(null);
            setFormData(emptyForm);
        }
    };

    const handleDelete = async (transactionId) => {
        const confirmed = window.confirm(
            "Delete this transaction?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteTransaction(transactionId);
            await loadTransactions();
        } catch (error) {
            console.error(
                "Failed to delete transaction",
                error
            );
        }
    };

    const escapeCsvValue = (value) => {
        const stringValue = String(value ?? "");

        return `"${stringValue.replaceAll('"', '""')}"`;
    };

    const handleExportCsv = () => {
        if (filteredTransactions.length === 0) {
            return;
        }

        const headers = [
            "Title",
            "Category",
            "Type",
            "Amount",
            "Date",
            "Note",
        ];

        const rows = filteredTransactions.map(
            (transaction) => [
                transaction.title,
                transaction.category,
                transaction.type,
                transaction.amount,
                transaction.transactionDate,
                transaction.note || "",
            ]
        );

        const csvContent = [
            headers,
            ...rows,
        ]
            .map((row) =>
                row.map(escapeCsvValue).join(",")
            )
            .join("\n");

        const blob = new Blob(
            [`\uFEFF${csvContent}`],
            {
                type: "text/csv;charset=utf-8;",
            }
        );

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "moneyflow-transactions.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

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
            <Box
                sx={{
                    display: "flex",
                    alignItems: {
                        xs: "flex-start",
                        sm: "center",
                    },
                    justifyContent: "space-between",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    gap: 2,
                    mb: 4,
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight={800}
                    >
                        Transactions
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        Manage your income and expenses.
                    </Typography>
                </Box>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={1.5}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "auto",
                        },
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<DownloadRounded />}
                        onClick={handleExportCsv}
                        disabled={
                            filteredTransactions.length === 0
                        }
                    >
                        Export CSV
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<AddRounded />}
                        onClick={openCreateDialog}
                    >
                        Add Transaction
                    </Button>
                </Stack>
            </Box>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={2}
                >
                    <TextField
                        fullWidth
                        placeholder="Search transactions..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchRounded />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        select
                        label="Type"
                        value={typeFilter}
                        onChange={(event) =>
                            setTypeFilter(event.target.value)
                        }
                        sx={{
                            minWidth: {
                                xs: "100%",
                                md: 180,
                            },
                        }}
                    >
                        <MenuItem value="ALL">
                            All Types
                        </MenuItem>

                        <MenuItem value="INCOME">
                            Income
                        </MenuItem>

                        <MenuItem value="EXPENSE">
                            Expense
                        </MenuItem>
                    </TextField>

                    <TextField
                        select
                        label="Category"
                        value={categoryFilter}
                        onChange={(event) =>
                            setCategoryFilter(
                                event.target.value
                            )
                        }
                        sx={{
                            minWidth: {
                                xs: "100%",
                                md: 200,
                            },
                        }}
                    >
                        <MenuItem value="ALL">
                            All Categories
                        </MenuItem>

                        {categories.map((category) => (
                            <MenuItem
                                key={category}
                                value={category}
                            >
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
            </Paper>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 850 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Transaction
                            </TableCell>

                            <TableCell>
                                Category
                            </TableCell>

                            <TableCell>
                                Type
                            </TableCell>

                            <TableCell>
                                Amount
                            </TableCell>

                            <TableCell>
                                Date
                            </TableCell>

                            <TableCell align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredTransactions.map(
                            (transaction) => (
                                <TableRow
                                    key={transaction.id}
                                    hover
                                >
                                    <TableCell>
                                        <Typography
                                            fontWeight={700}
                                        >
                                            {transaction.title}
                                        </Typography>

                                        {transaction.note && (
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {transaction.note}
                                            </Typography>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {transaction.category}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            size="small"
                                            label={transaction.type}
                                            color={
                                                transaction.type ===
                                                "INCOME"
                                                    ? "success"
                                                    : "error"
                                            }
                                            variant="outlined"
                                        />
                                    </TableCell>

                                    <TableCell>
                                        <Typography
                                            fontWeight={700}
                                            color={
                                                transaction.type ===
                                                "INCOME"
                                                    ? "success.main"
                                                    : "error.main"
                                            }
                                        >
                                            {transaction.type ===
                                            "INCOME"
                                                ? "+"
                                                : "-"}

                                            {formatMoney(
                                                transaction.amount
                                            )}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        {
                                            transaction.transactionDate
                                        }
                                    </TableCell>

                                    <TableCell align="right">
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            justifyContent="flex-end"
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    openEditDialog(
                                                        transaction
                                                    )
                                                }
                                            >
                                                <EditRounded />
                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                onClick={() =>
                                                    handleDelete(
                                                        transaction.id
                                                    )
                                                }
                                            >
                                                <DeleteOutlineRounded />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )
                        )}

                        {filteredTransactions.length ===
                            0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        align="center"
                                        sx={{ py: 8 }}
                                    >
                                        <Typography color="text.secondary">
                                            No transactions found.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={dialogOpen}
                onClose={closeDialog}
                fullWidth
                maxWidth="sm"
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <DialogTitle fontWeight={800}>
                        {editingId !== null
                            ? "Edit Transaction"
                            : "Add Transaction"}
                    </DialogTitle>

                    <DialogContent>
                        <Stack
                            spacing={2.5}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                fullWidth
                            />

                            <TextField
                                label="Amount"
                                name="amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                fullWidth
                            />

                            <TextField
                                select
                                label="Type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="INCOME">
                                    Income
                                </MenuItem>

                                <MenuItem value="EXPENSE">
                                    Expense
                                </MenuItem>
                            </TextField>

                            <TextField
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                fullWidth
                            />

                            <TextField
                                label="Transaction Date"
                                name="transactionDate"
                                type="date"
                                value={
                                    formData.transactionDate
                                }
                                onChange={handleChange}
                                required
                                fullWidth
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                            <TextField
                                label="Note"
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                fullWidth
                            />
                        </Stack>
                    </DialogContent>

                    <DialogActions sx={{ p: 3 }}>
                        <Button
                            onClick={closeDialog}
                            disabled={saving}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : editingId !== null
                                    ? "Update Transaction"
                                    : "Add Transaction"}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
}

export default TransactionsPage;