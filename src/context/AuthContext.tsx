import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/account');
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const storedAuthState = localStorage.getItem('isAuthenticated');
        if (storedAuthState === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const authContextValue: AuthContextType = {
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextType => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
};

export { AuthProvider, useAuth };