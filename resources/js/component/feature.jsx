import axios from "axios";
import React, { useEffect, useState } from "react";
const Feature = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [brands, setBrands] = useState([])
    const [sellerProduct, setSellerProduct] = useState([])
    const [trendProduct, setTrendProduct] = useState([])
    useEffect(() => {
        const fetchFeature = async () => {
            try {
                const response = await axios.get('api/feature')
                setBrands(response.data.brand);
                setSellerProduct(response.data.bestSeller);
                setTrendProduct(response.data.trendy)
                setLoading(false)
                setError(null)
            } catch (error) {
                setError(error.message||'Failed to load data...')
            } finally {
                setLoading(null)
            }
        }
        fetchFeature();
    }, [])
    if (loading) {
        return <div className="text-danger text-center my-5">Loading data...</div>
    }
    if (error) {
        return <div className="text-danger text-center my-5">{error}</div>
    }
    return (
        <section
            className="section-padding"
            style={{ backgroundColor: 'var(--bg-card)' }}
        >
            <div className="container">
                <div className="row g-5">
                    {/* Col 1: Best Seller */}
                    <div className="col-lg-4">
                        <h3 className="mb-4">Best Seller</h3>
                        <div className="list-group list-group-flush">
                            {sellerProduct.map(seller => (
                                <a key={seller.id} href="#" className="list-group-item list-group-item-action featured-list-item px-0"
                                >
                                    <img
                                        src={seller.image_url}
                                        alt="Product"
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{seller.name}</h6>
                                        <span className="fw-bold text-primary">{seller.price}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 2: New Arrival */}
                    <div className="col-lg-4">
                        <h3 className="mb-4">Trendy Product</h3>
                        <div className="list-group list-group-flush">
                            {trendProduct.map(trend => (
                                <a key={trend.id}
                                    href="#"
                                    className="list-group-item list-group-item-action featured-list-item px-0"
                                >
                                    <img
                                        src={trend.image_url}
                                        alt="Product"
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{trend.name}</h6>
                                        <span className="fw-bold text-primary">{trend.price}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 3: Brands */}
                    <div className="col-lg-4">
                        <h3 className="mb-4">Brands</h3>
                        <div className="row row-cols-3 g-3">
                            {brands.map(brand => (
                                <div key={brand.id} className="col brand-item">
                                    <img
                                        src={brand.image_url}
                                        alt={brand.name}
                                        className="img-fluid"
                                    />
                                    <p className="small mt-2 mb-0">{brand.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Feature;
