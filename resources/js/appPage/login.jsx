import React from "react";
import LoginImage from "../../../public/digitally/user/images/login.jpg";
import { useLogin } from "../hook/useLogin";
import { Link } from "react-router-dom";
const Login = () => {
    const { formData, validationError, isLoading, handleChange, handleSubmit } = useLogin();
    return (
        <main className="section-padding">
    <div className="container">
        <div className="row justify-content-center">
            {/* Outer container to limit form width & center it nicely */}
            <div className="col-md-7 col-lg-5">
                <div className="card bg-card border-color shadow-lg overflow-hidden">
                    {/* Login Form */}
                    <div className="card-body p-4 p-md-5">
                        <h2 className="text-center mb-4">Log in to your account</h2>
                        <form onSubmit={handleSubmit}>

                            {/* Email Input */}
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className={`form-control ${validationError?.email ? 'is-invalid' : ''}`}
                                    id="floatingEmail"
                                    placeholder="E-mail"
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
                            <button className="btn btn-primary w-100 py-3" type="submit" disabled={isLoading}>
                                {isLoading
                                    ? "Logging in..."
                                    : "Log in"}
                            </button>
                        </form>

                        {/* Register Link */}
                        <p className="text-center text-light mt-4 mb-0">
                            Don't have an account yet?{' '}
                            <Link to="/register" style={{ color: 'var(--primary-color)' }}>
                                Create a new account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
    );
}
export default Login;
