import React from 'react';

const Banner = () => {
  return (
    <header className="banner-section" id="home">
      <div className="container">
        <div className="row">
          <div className="banner-text">
            {/* Main Headline */}
            <h1 className="display-4">
              upgrade your <br /> tech today!
            </h1>

            {/* Subtitle/Tagline */}
            <p className="fs-6 my-3">
              You can buy high-quality products with confidence.
            </p>

            {/* Call to Action Button */}
            <a href="#product" className="btn btn-primary btn-lg">
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;
