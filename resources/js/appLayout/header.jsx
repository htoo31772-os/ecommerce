import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLogin, setIsLogin, cartUpdateCount, user }) => {

    // logout
    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
            })
        } catch (error) {
            console.log('Logout failed', error);
            toast.success('Logout failed!', { duration: 4000 })
        } finally {
            localStorage.clear();
            setIsLogin(false);
            window.location.replace('/login')
        }
    }
    // Get booking count from backend
    const [bookingCount, setBookingCount] = useState(0);
    useEffect(() => {
        const fetchBookingCount = async () => {
            const token = localStorage.getItem('token');
            if (!token || !isLogin) {
                setBookingCount(0);
                return;
            }
            try {
                const response = await axios.get('/api/cart', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setBookingCount(response.data.count);
            } catch (error) {
                setBookingCount(0);
            }
        }
        fetchBookingCount();
    }, [isLogin, cartUpdateCount])

    console.log("1. User object:", user); // user object ထဲမှာ image_url တကယ်ပါလား?
    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
            style={{ backgroundColor: 'var(--bg-dark)' }}
        >
            <div className="container py-2">
                {/* Logo */}
                <a className="navbar-brand" href="#">
                    <img
                        src="/images/logo.png"
                        className="img-fluid"
                        alt="logo Image"
                        style={{ height: '40px', width: '75px' }}
                    />
                </a>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navMenu"
                    aria-controls="navMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu Items (Centered) */}
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/#home">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#category">
                                Category
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#product">
                                Product
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#about">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#contact">
                                Contact
                            </a>
                        </li>
                        <div className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdownAccount"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                title="Account"
                            >
                                Account
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownAccount"
                            >
                                {!isLogin ? (
                                    <>
                                        <li>
                                            <Link className="dropdown-item" to='/login'>
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to='/register'>
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </ul>

                    {/* Right Icons */}
                    <div className="d-flex align-items-center">
                        <Link to='/profile' className="nav-link mx-2" title="Account">
                            {user?.image_url && user.image_url !== 'http://127.0.0.1:8000/storage/profile/user' ? (
                                <img src={user.image_url} className="img img-fluid rounded-pill" alt="User Image" style={{ height: '25px', width: '25px' }} />
                            ) : (
                                <img src='/images/user.jpg' className="img img-fluid rounded-pill" alt="User Image" style={{ height: '25px', width: '25px' }} />
                            )}

                            <span className="d-lg-none ms-2">Account</span>
                        </Link>
                        <Link to='/cart' className="nav-link ms-2" title="Cart">
                            <i className="bi bi-cart3 fs-4"></i>
                            {bookingCount > 0 && (
                                <span className="badge rounded-pill bg-danger translate-middle-y">{bookingCount}</span>
                            )}
                            <span className="d-lg-none ms-2">Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Header;
