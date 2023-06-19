import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';

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
        localStorage.removeItem('activeUser');
        navigate('/login');
    };

    function isTokenExpired(token: string): boolean {
        const decodedToken: { exp: number } = jwt_decode(token);
        return !!(decodedToken.exp && Date.now() >= decodedToken.exp * 1000);
    }

    useEffect(() => {
        const storedAuthState = localStorage.getItem('isAuthenticated');
        if (storedAuthState === 'true') {
            setIsAuthenticated(true);
        }

        const token = localStorage.getItem('token');
        if (token && isTokenExpired(token)) {
            logout();
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