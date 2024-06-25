import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [token, setToken] = useState('');
    const navigate = useNavigate();



    const logout = async () => {
        setToken('');
        localStorage.removeItem('authTokenReact');
        return navigate('/login')
    }



    const value = {
        user,
        token,
        setUser,
        setToken,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

const useAuth = function () {

    return useContext(AuthContext);
}

export { AuthProvider, useAuth }