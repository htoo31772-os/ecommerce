import React from "react";

const Service = () => {
    return (
        <section className="section-padding">
            <div className="container">
                <div className="row g-4">
                    {/* Service 1: Free shipping */}
                    <div className="col-md-3 col-6">
                        <div className="service-box">
                            <i className="bi bi-truck service-icon" />
                            <div>
                                <h6 className="mb-1 fw-bold">Free shipping</h6>
                                <p className="mb-0 small">Above 100,000 Kyat</p>
                            </div>
                        </div>
                    </div>

                    {/* Service 2: 24/7 Service */}
                    <div className="col-md-3 col-6">
                        <div className="service-box">
                            <i className="bi bi-headset service-icon" />
                            <div>
                                <h6 className="mb-1 fw-bold">24/7 Service</h6>
                                <p className="mb-0 small">Contact Anytime</p>
                            </div>
                        </div>
                    </div>

                    {/* Service 3: Secure Payments */}
                    <div className="col-md-3 col-6">
                        <div className="service-box">
                            <i className="bi bi-shield-lock service-icon" />
                            <div>
                                <h6 className="mb-1 fw-bold">Secure Payments</h6>
                                <p className="mb-0 small">100% Secure</p>
                            </div>
                        </div>
                    </div>

                    {/* Service 4: Ease of Purchase */}
                    <div className="col-md-3 col-6">
                        <div className="service-box">
                            <i className="bi bi-check-circle service-icon" />
                            <div>
                                <h6 className="mb-1 fw-bold">Ease of Purchase</h6>
                                <p className="mb-0 small">Full Warranty</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Service;
