import './bootstrap';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import Home from './appLayout/home';
import Header from './appLayout/header';
import Footer from './appLayout/footer';
import Register from './appPage/register';
import Login from './appPage/login';
import Profile from './appPage/profile';
import ShoppingCart from './appPage/cart';
import ProductDetail from './appPage/productDeatil';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
// Get Token & User Data form Backend
axios.defaults.withCredentials = true
const token = localStorage.getItem('token');
const localUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null
    } catch (error) {
        return null;
    }
}
const MainRouter = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(localUser());
    const [cartUpdateCount, setCartUpdateCount] = useState(false);
    // Check Is Login Or User
    useEffect(() => {
        if (token) {
            setIsLogin(true);
            setUser(localUser());
        } else {
            setIsLogin(false);
            setUser(null);
        }
    }, [isLogin])
    // For Cart Count in header
    const handleCartCount = () => {
        setCartUpdateCount(prev => !prev);
    }
    // protectedRoute
    const ProtectedRoute = ({ isLogin, children }) => {
        if (!isLogin) {
            return <Navigate to="/login" replace />;
        }
        return children;
    }
    return (
        <BrowserRouter>
            {/* Toaster */}
            <Toaster position='top-center' reverseOrder={false} />
            <Header isLogin={isLogin} setIsLogin={setIsLogin} user={user} cartUpdateCount={cartUpdateCount} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={isLogin ? <Navigate to="/login" /> : <Register setIsLogin={setIsLogin} />} />
                <Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
                <Route path='/profile' element={
                    <ProtectedRoute isLogin={isLogin}>
                        <Profile user={user} />
                    </ProtectedRoute>
                } />
                <Route path='/product/:id' element={<ProductDetail isLogin={isLogin} handleCartCount={handleCartCount} />} />
                <Route path='/cart' element={
                    <ProtectedRoute isLogin={isLogin}>
                        <ShoppingCart isLogin={isLogin} handleCartCount={handleCartCount} />
                    </ProtectedRoute>
                } />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
createRoot(document.getElementById('root')).render(<MainRouter />)
