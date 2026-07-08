import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const saveAuth = (loginData) => {
        const authenticatedUser = {
            id: loginData.id,
            name: loginData.name,
            email: loginData.email,
        };

        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(authenticatedUser));

        setUser(authenticatedUser);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };

    const isAuthenticated = Boolean(
        user && localStorage.getItem("token")
    );

    return (
        <AuthContext.Provider
            value={{
                user,
                saveAuth,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}