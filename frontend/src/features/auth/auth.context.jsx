import { createContext, useState, useEffect } from "react";
import { getUser } from "./services/auth.api";




export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const getAndSetUser = async ()=>{
            try {
                const data = await getUser();
                setUser(data?.user || null);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        getAndSetUser();
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}