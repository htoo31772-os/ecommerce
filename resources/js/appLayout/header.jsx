import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { authService } from "../service/authServices";
import { getStorageImage } from "../Utils/useImage";

const Header = () => {
    const { isLogin, setIsLogin, cartUpdateCount, user, setUser, cartCount } = useContext(AuthContext);
    // logout
    const handleLogout = async () => {
        if (!isLogin) return;
        try {
            await authService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setIsLogin(false);
            window.location.href = "/login"
            toast.success('အကောင့်ထွက်သွားပါပြီ။', { duration: 4000 });

        } catch (error) {
            console.log('Logout failed', error);
            localStorage.clear();
            window.location.href = "/login";
            toast.success('Logout failed!', { duration: 4000 })
        }
    }

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
                            <img src={getStorageImage(user?.image, 'profile')} className="img img-fluid rounded-pill" alt="User Image" style={{ height: '25px', width: '25px' }} />
                            <span className="d-lg-none ms-2">Account</span>
                        </Link>
                        <Link to='/cart' className="nav-link ms-2" title="Cart">
                            <i className="bi bi-cart3 fs-4"></i>
                            {cartCount > 0 && (
                                <span className="badge rounded-pill bg-danger translate-middle-y">{cartCount}</span>
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
