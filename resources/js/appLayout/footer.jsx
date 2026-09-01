import React from "react";

const Footer = () => {
    return (
        <footer className="footer section-padding">
            <div className="container">
                <div className="row g-5">
                    {/* Col 1: About */}
                    <div className="col-lg-4 col-md-6">
                        <h5
                            className="navbar-brand text-white fs-3"
                            style={{ color: 'var(--primary-color) !important' }}
                        >
                            <img
                                src="./images/logo.png"
                                className="img-fluid"
                                alt="logo"
                                style={{ width: '120px', height: '70px' }}
                            />
                        </h5>
                        <p className="my-3">You can buy high-quality products with confidence.</p>
                        <div className="mt-4">
                            <a href="#" className="fs-4 text-white me-3">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="fs-4 text-white me-3">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="fs-4 text-white me-3">
                                <i className="bi bi-telegram"></i>
                            </a>
                            <a href="#" className="fs-4 text-white">
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#home" className="footer-link">
                                    Home
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#product" className="footer-link">
                                    Products
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#about" className="footer-link">
                                    About us
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#contact" className="footer-link">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Help */}
                    <div className="col-lg-2 col-md-6">
                        <h5>Help</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="footer-link">
                                    FAQ
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="footer-link">
                                    Support Center
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="footer-link">
                                    Privacy Policy
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="footer-link">
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: Newsletter */}
                    <div className="col-lg-4 col-md-6">
                        <h5>Subscribe Newsletter</h5>
                        <p>Get the latest news and promotions.</p>
                        <form>
                            <div className="input-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Your email address"
                                    aria-label="Your email address"
                                />
                                <button className="btn btn-primary" type="submit">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="row">
                    <div className="col-12 text-center border-top border-secondary pt-4 mt-5">
                        <p className="mb-0">
                            &copy; 2024 MyShop. All Rights Reserved. Created with Bootstrap.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;
