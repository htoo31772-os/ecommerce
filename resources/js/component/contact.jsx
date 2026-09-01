import React from 'react';
import K_pay from '../../../public/digitally/user/images/Payments/K-Pay.jpg';
import CB_Pay from '../../../public/digitally/user/images/Payments/cbPay.jpg';
import AYA_Pay from '../../../public/digitally/user/images/Payments/ayaPay.jpg';
import Wave_Pay from '../../../public/digitally/user/images/Payments/wavePay.jpg';
const ContactPaymentSection = () => {
    return (
        <section
            className="section-padding"
            id="contact"
            style={{ backgroundColor: 'var(--bg-card)' }}
        >
            <div className="container">
                <h2 className="text-center mb-5">Contact & Payment</h2>
                <div className="row g-5">

                    {/* Col 1: Contact Info & Map */}
                    <div className="col-lg-6">
                        <h3 className="mb-4">Our Location</h3>

                        {/* Google Map Embed */}
                        <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm mb-4">
                            <iframe
                                title="Google Map Location" // Added title for accessibility
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15001.38541917173!2d96.15177255!3d16.8124238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ecb9b8b9318f%3A0x453181b859e564d!2sShwedagon%20Pagoda!5e0!3m2!1sen!2smm!4v1678888888888!5m2!1sen!2smm"
                                width="600"
                                height="450"
                                style={{ border: 0 }} // Inline style in React
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade" // Converted to camelCase
                            ></iframe>
                        </div>

                        {/* Contact Details List */}
                        <ul className="list-unstyled fs-5">
                            <li className="mb-3">
                                <i className="bi bi-geo-alt-fill text-primary me-3"></i>
                                No (123), Myanmar Street, Yangon.
                            </li>
                            <li className="mb-3">
                                <i className="bi bi-telephone-fill text-primary me-3"></i>
                                09-123-456-789
                            </li>
                            <li className="mb-3">
                                <i className="bi bi-envelope-fill text-primary me-3"></i>
                                info@myshop.com
                            </li>
                        </ul>
                    </div>

                    {/* Col 2: Payment Info */}
                    <div className="col-lg-6">
                        <h3 className="mb-4">Payment Methods</h3> {/* Corrected typo: Mayment -> Payment */}
                        <div className="list-group list-group-flush">
                            <a
                                href='#'
                                className="list-group-item list-group-item-action featured-list-item px-0"
                            >
                                <img src={AYA_Pay} alt="" />
                                <div className="flex-grow-1">
                                    <h6 className="mb-1">AYA Pay</h6>
                                    <span className="fw-bold text-primary">09-123 456 789</span>
                                </div>
                            </a>
                        </div>
                         <div className="list-group list-group-flush">
                            <a
                                href='#'
                                className="list-group-item list-group-item-action featured-list-item px-0"
                            >
                                <img src={CB_Pay} alt="" />
                                <div className="flex-grow-1">
                                    <h6 className="mb-1">CB Pay</h6>
                                    <span className="fw-bold text-primary">09-123 456 789</span>
                                </div>
                            </a>
                        </div>
                         <div className="list-group list-group-flush">
                            <a
                                href='#'
                                className="list-group-item list-group-item-action featured-list-item px-0"
                            >
                                <img src={Wave_Pay} alt="" />
                                <div className="flex-grow-1">
                                    <h6 className="mb-1">Wave Pay</h6>
                                    <span className="fw-bold text-primary">09-123 456 789</span>
                                </div>
                            </a>
                        </div>
                         <div className="list-group list-group-flush">
                            <a
                                href='#'
                                className="list-group-item list-group-item-action featured-list-item px-0"
                            >
                                <img src={K_pay} alt="" />
                                <div className="flex-grow-1">
                                    <h6 className="mb-1">KBZ Pay</h6>
                                    <span className="fw-bold text-primary">09-123 456 789</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPaymentSection;
