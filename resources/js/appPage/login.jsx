import React, { useContext, useState } from "react";
import LoginImage from "../../../public/digitally/user/images/login.jpg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/authContext";
const Login = () => {
    const{setIsLogin}=useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [validationError, setValidationError] = useState({});
    const [globalError, setGlobalError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (validationError && validationError[name]) {
            setValidationError(prevError => ({
                ...prevError,
                [name]: null
            }))
        }
        if (globalError) {
            setGlobalError(null);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newError = {};
        if (!formData.email) {
            newError.email = 'Email field is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newError.email = 'Email address is invalid';
        }
        if (!formData.password) {
            newError.password = 'Password field is required';
        }
        setValidationError(newError);
        setGlobalError(null);
        if (Object.keys(newError).length === 0) {
            try {
                const response = await axios.post('api/login', formData );
                console.log("Full Response:", response.data);
                if (response.data.access_token) {
                    localStorage.setItem('user',JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.access_token);
                    setIsLogin(true);
                    window.location.replace("/");
                    toast.success('Loggedin successfully');
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    setValidationError(error.response.data.errors)
                } else if (error.response && error.response.data && error.response.data.message) {
                    setGlobalError(error.response.data.message);
                    toast.error(error.response.data.message);
                } else {
                    setGlobalError('Login failed. Please try again!');
                    toast.error('Login failed. Please try again!')
                }
            }
        }

    }
    return (
        <main className="section-padding">
            {/* Toastify Message */}
            <Toaster position="top-center" reverseOrder={false} />
            <div className="container">
                <div className="row justify-content-center">
                    {/* Outer container to limit form width */}
                    <div className="col-md-10 col-lg-8">
                        <div className="card bg-card border-color shadow-lg overflow-hidden">
                            <div className="row g-0">
                                <div
                                    className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center"
                                    style={{ backgroundColor: 'var(--secondary-color)' }}
                                >
                                    <img
                                        src={LoginImage}
                                        className="img-fluid"
                                        alt="Login Page illustration"
                                    />
                                </div>

                                {/* Login Form */}
                                <div className="col-lg-6">
                                    <div className="card-body p-4 p-md-5">
                                        <h2 className="text-center mb-4">Log in to your account</h2>
                                        {globalError && (
                                            <div className="alert alert-danger mb-4" role="alert">{globalError}</div>
                                        )}
                                        <form onSubmit={handleSubmit}>

                                            {/* Email Input */}
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className={`form-control ${validationError?.email ? 'is-invalid' : ''}`}
                                                    id="floatingEmail"
                                                    placeholder="name@example.com"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="floatingEmail">E-mail</label>
                                                {validationError.email && (
                                                    <div className="text-danger">{validationError.email}</div>
                                                )}
                                            </div>

                                            {/* Password Input */}
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="password"
                                                    className={`form-control ${validationError?.name ? 'is-invalid' : ''}`}
                                                    id="floatingPassword"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="floatingPassword">Password</label>
                                                {validationError.password && (
                                                    <div className="text-danger">{validationError.password}</div>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <button className="btn btn-primary w-100 py-3" type="submit">
                                                Log in
                                            </button>
                                        </form>

                                        {/* Register Link */}
                                        <p className="text-center text-muted-light mt-4 mb-0">
                                            Don't have an account yet?
                                            <a href="register.html" style={{ color: 'var(--primary-color)' }}>
                                                Create a new account
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Login;
