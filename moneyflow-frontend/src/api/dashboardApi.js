import API from "./axios";

export const getDashboardSummary = async () => {
    const response = await API.get("/transactions/dashboard");
    return response.data;
};