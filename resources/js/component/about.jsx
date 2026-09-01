import React from "react";

const About = () => {
    return (
        <section className="section-padding" id="about">
            <div className="container">
                <div className="row g-5 align-items-center">
                    <div className="col-lg-6">
                        <img
                            src="/images/electronicsShop.jpg"
                            className="img-fluid rounded-3 shadow"
                            alt="About our shop"
                        />
                    </div>
                    <div className="col-lg-6">
                        <h2 className="mb-4">About Us</h2>
                        <p className="text-muted">
                            At Ditigally, we are dedicated to bringing the latest and most innovative electronic products to your doorstep. Established in 2019, we have grown to become a trusted destination for tech enthusiasts and everyday users alike.
                        </p>
                        <p>
                            <span className="text-primary">Our Mission Our mission is simple:</span> to provide high-quality electronic devices and gadgets at competitive prices, backed by reliable warranties and exceptional customer service. We believe that technology should be accessible to everyone, and we strive to make that a reality.
                        </p>
                        <h5 className="text-primary">Why Choose Us?</h5>
                        <p><span className="text-primary">Authentic Products:</span> We guarantee 100% genuine products from world-leading brands.</p>
                        <p><span className="text-primary">Expert Advice:</span> Our team is well-versed in the latest tech trends and is always ready to help you find the perfect device.</p>
                        <p><span className="text-primary">Customer First:</span> From hassle-free shopping to robust after-sales support, your satisfaction is our top priority.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default About;
