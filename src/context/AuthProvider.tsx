import { axiosPrivate } from "@/api/axios";
import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    auth: { access_token: string | null };
    setAuth: React.Dispatch<React.SetStateAction<{ access_token: string | null }>>;
    logout: () => void;
}

interface TokenType {
    access_token: string | null;
} 

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode} ) => {
    const [auth, setAuth] = useState<TokenType>({ access_token: null });
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axiosPrivate.post("/logout", {}, {
                withCredentials: true,
            });
            setAuth({ access_token: null });
            navigate('/');
        } catch (error) {
            console.error('Logout failed: ' + error);
        }
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;