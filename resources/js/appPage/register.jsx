import React from "react";
import RegisterImage from '../../../public/digitally/user/images/register1.png';
import { useRegister } from "../hook/useRegister";
import { Link } from "react-router-dom";

const Register = () => {
    const { formData, validationError, isLoading, handleChange, handleSubmit } = useRegister();
    return (
       <main className="section-padding">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
                <div className="card bg-card border-color shadow-lg overflow-hidden">
                    {/* Register Form */}
                    <div className="card-body p-4 p-md-5">
                        <h2 className="text-center mb-4">Create a new account</h2>
                        <form onSubmit={handleSubmit}>

                            {/* Name Input */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className={`form-control ${validationError?.name ? 'is-invalid' : ''}`}
                                    id="floatingUsername"
                                    placeholder="Name"
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
                                    placeholder="E-mail"
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
                            <button className="btn btn-primary w-100 py-3" type="submit" disabled={isLoading}>
                                {isLoading
                                    ? "Creating account..."
                                    : "Register"}
                            </button>
                        </form>

                        {/* Login Link */}
                        <p className="text-center text-light mt-4 mb-0">
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: 'var(--primary-color)' }}>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
    )
};
export default Register;
