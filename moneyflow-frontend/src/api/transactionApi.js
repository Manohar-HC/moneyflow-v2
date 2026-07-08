import API from "./axios";

export const getTransactions = async () => {
    const response = await API.get("/transactions");
    return response.data;
};

export const createTransaction = async (transactionData) => {
    const response = await API.post(
        "/transactions",
        transactionData
    );

    return response.data;
};

export const updateTransaction = async (
    transactionId,
    transactionData
) => {
    const response = await API.put(
        `/transactions/${transactionId}`,
        transactionData
    );

    return response.data;
};

export const deleteTransaction = async (transactionId) => {
    await API.delete(`/transactions/${transactionId}`);
};