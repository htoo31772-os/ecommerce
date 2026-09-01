import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Products = () => {
    // Get Product list form backend
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('api/product', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProducts(response.data);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error("product error:", error);
                if (error.response) {
                    setError(`Failed to fetch products: Status ${error.response.status}`)
                } else {
                    setError(`Network Error: ${error.message}`)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchCategory();
    }, [])
    // Product Like Button
    const handleLike = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login first to like this product');
            return;
        }
        try {
            const response = await axios.post(`/api/product/${productId}/like`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, like_count: response.data.like_count, is_liked: response.data.status === "liked" } : p
            ));
            toast.success(response.data.status === 'liked' ? "Liked ❤️" : "Unliked 🤍", { id: 'like', duration: 4000 })
        } catch (error) {
            toast.error('Error updating like', { duration: 4000 })
        }
    }
    if (loading) {
        return <div className="text-danger text-center my-5">Loading data.....</div>
    }
    if (error) {
        return <div className="text-danger text-center my-5">{error}</div>
    }
    return (
        <section className="section-padding" id="product">
            <div className="container">
                <h2 className="text-center mb-5">Specialty Products</h2>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {products.map((product) => (
                        <div className="col" key={product.id}>
                            <div className="card h-100 product-card">
                                {/* Product Image */}
                                <img
                                    src={product.image_url}
                                    className="card-img-top"
                                    alt={product.name}
                                />

                                {/* Card Body: Title, Price, Button */}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fs-6">{product.name}</h5>
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        <div>
                                            <p className="card-text fs-6 fw-bold text-primary">
                                                {product.price} MMK
                                            </p>
                                        </div>
                                        <div>
                                            <Link to={`/product/${product.id}`} className="btn btn-sm btn-primary mt-auto">
                                                See More
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer: Engagement Icons */}
                                <div className="card-footer">
                                    <div className="d-flex justify-content-around align-items-center">
                                        <div className="icon-action" onClick={() => handleLike(product.id)} style={{ cursor: 'pointer' }}>
                                            <i className={`bi ${product.is_liked ? 'bi-heart-fill text-danger' : 'bi-heart'} me-1`} />
                                            <small>{product.like_count}</small>
                                        </div>
                                        <div className="icon-action" title="View">
                                            <i className="bi bi-eye me-1" />
                                            <small>{product.view_count}</small>
                                        </div>
                                        <div className="icon-action" title="Comment">
                                            <i className="bi bi-chat-dots me-1" />
                                            <small>{product.review.length}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
