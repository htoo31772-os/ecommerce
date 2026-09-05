import React, { useContext, useState } from "react";
import RegisterImage from '../../../public/digitally/user/images/register1.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/authContext";

const Register = () => {
    const { setIsLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [validationError, setValidationError] = useState({})
    const [globalError, setGlobalError] = useState(null)
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
            setGlobalError(null)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newError = {};
        if (!formData.name) {
            newError.name = 'Name field is required';
        }
        if (!formData.email) {
            newError.email = 'Eamil field is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newError.email = 'Eamil address is invalid';
        }
        if (!formData.password) {
            newError.password = 'Password field is required'
        }
        setValidationError(newError);
        setGlobalError(null);
        if (Object.keys(newError).length === 0) {
            try {
                const response = await axios.post('api/register', formData);
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.access_token);
                    navigate('/')
                    toast.success('Registation successful');
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    setValidationError(error.response.data.errors);
                } else if (error.response && error.response.data && error.response.data.message) {
                    setGlobalError(error.response.data.message)
                    toast.error(error.response.data.message, { duration: 4000 });
                } else {
                    toast.error('Registation failed!. please try again')
                }
            }
        }
    }
    return (
        <main className="section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <div className="card bg-card border-color shadow-lg overflow-hidden">
                            <div className="row g-0">
                                <div
                                    className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center"
                                    style={{ backgroundColor: 'var(--secondary-color)' }}
                                >
                                    <img
                                        src={RegisterImage}
                                        className="img-fluid"
                                        alt="Register page illustration"
                                    />
                                </div>

                                {/* Register Form */}
                                <div className="col-lg-6">
                                    <div className="card-body p-4 p-md-5">
                                        <h2 className="text-center mb-4">Create a new account</h2>
                                        {globalError && (
                                            <div className="alert alert-danger mb-4" role="alert">{globalError}</div>
                                        )}
                                        <form onSubmit={handleSubmit}>

                                            {/* Name Input */}
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control ${validationError?.name ? 'is-invalid' : ''}`}
                                                    id="floatingUsername"
                                                    placeholder="Username"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="floatingUsername">Name</label>
                                                {validationError?.name && (
                                                    <div className="text-danger">{validationError.name}</div>
                                                )}
                                            </div>

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
                                                {validationError?.email && (
                                                    <div className="text-danger">{validationError.email}</div>
                                                )}
                                            </div>

                                            {/* Password Input */}
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="password"
                                                    className={`form-control ${validationError?.password ? 'is-invalid' : ''}`}
                                                    id="floatingPassword"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="floatingPassword">Password</label>
                                                {validationError?.password && (
                                                    <div className="text-danger">{validationError.password}</div>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <button className="btn btn-primary w-100 py-3" type="submit">
                                                Open Account
                                            </button>
                                        </form>

                                        {/* Login Link */}
                                        <p className="text-center text-muted-light mt-4 mb-0">
                                            Already have an account?
                                            <a href="login.html" style={{ color: 'var(--primary-color)' }}>
                                                Login
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
    )
};
export default Register;
