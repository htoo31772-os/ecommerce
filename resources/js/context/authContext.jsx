import React, { createContext, useEffect, useState } from "react";
import Login from "../appPage/login";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [cartUpdateCount, setCartUpdateCount] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    // CartCount
    const handleCartCount = () => {
        setCartUpdateCount(prev => !prev);
    }
    //User & Token
    useEffect(() => {
        const token = localStorage.getItem('token');
        const saveUser = localStorage.getItem('user');
        if (token && saveUser) {
            setIsLogin(true);
            setUser(JSON.parse(saveUser));
        }
    }, []);
    // Cart Count
    const fetchCartCount = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setCartCount(0);
            return;
        }
        try {
            const response = await axios.get('/api/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setBookingCount(response.data.count || 0);
        } catch (error) {
            setCartCount(0);
        }

    }
    useEffect(() => { fetchCartCount(); }, [isLogin, cartUpdateCount]);
    return (
        <AuthContext.Provider value={{ setUser, user, isLogin, setIsLogin, cartCount, setCartCount, cartUpdateCount, fetchCartCount }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;
