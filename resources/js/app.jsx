import './bootstrap';
import React, { useContext, useEffect, useState } from 'react';
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
import AuthProvider, { AuthContext } from './context/authContext';

const MainRouter = () => {
    const { isLogin, setIsLogin } = useContext(AuthContext);
    // protectedRoute
    const ProtectedRoute = ({ children }) => {
        if (!isLogin) {
            return <Navigate to="/login" replace />;
        }
        return children;
    }
    return (
        <BrowserRouter>
            {/* Toaster */}
            <Toaster position='top-center' reverseOrder={false} />
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={isLogin ? <Navigate to="/login" /> : <Register />} />
                <Route path='/login' />
                <Route path='/profile' element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path='/product/:id' element={<ProductDetail />} />
                <Route path='/cart' element={
                    <ProtectedRoute>
                        <ShoppingCart />
                    </ProtectedRoute>
                } />
                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <MainRouter />
    </AuthProvider>
)
