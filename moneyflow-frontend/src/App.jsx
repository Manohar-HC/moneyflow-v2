import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import ProfilePage from "./pages/profile/ProfilePage";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import AppLayout from "./components/layouts/AppLayout";

function ProtectedRoute() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

function App() {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate
                            to={
                                isAuthenticated
                                    ? "/dashboard"
                                    : "/login"
                            }
                            replace
                        />
                    }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        <Route
                            path="/dashboard"
                            element={<DashboardPage />}
                        />

                        <Route
                            path="/transactions"
                            element={<TransactionsPage />}
                        />
                        <Route
                            path="/profile"
                            element={<ProfilePage />}
                        />
                        <Route
                            path="/analytics"
                            element={<AnalyticsPage />}
                        />

                    </Route>
                </Route>

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;