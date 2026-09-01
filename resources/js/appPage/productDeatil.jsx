import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Reviews from './review';


const ProductDetail = ({ isLogin, handleCartCount }) => {
    // Get Product Detail form Backend
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/product/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Product detail error:', error);
                if (error.response && error.response.status === 404) {
                    setError('Product not found');
                } else {
                    setError(`Failed to load product detail ${error.message}`)
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id])
    // Add to cart
    const [quantity, setQuantity] = useState(1);
    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to add item to the cart', { duration: 4000 })
            return;
        }

        try {
            const response = await axios.post(`/api/cart/store`, {
                product_id: product.id,
                quantity: quantity
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            toast.success('Product add to cart successful', { duration: 4000 })
            if (handleCartCount) {
                handleCartCount();
            }
        } catch (error) {
            console.log('Add to cart error', error);
            const errMessage = error.response.data.message || 'Product ID or Quantity is missing or invalid. Please check your inputs.'
            toast.error(errMessage)

        }
    }
    if (loading) {
        return <div className="text-center text-danger my-5">Loading product details...</div>;
    }

    if (error) {
        return <div className="text-danger text-center my-5">{error}</div>;
    }
    if (!product || !product.id) {
        return <div className="text-danger text-center my-5">Product data is unavailable.</div>;
    }
    return (
        <main className="section-padding">
            <div className="container">

                {/* Product Detail Card (Top Section) */}
                <div className="card bg-card border-color shadow-lg p-3 p-md-5">
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <img
                                src={product.image_url}
                                className="img-fluid rounded-3 mb-3"
                                alt="Product Image"
                            />
                        </div>

                        <div className="col-lg-6 d-flex flex-column text-light">
                            <p className="text-primary mb-2">{product.brand.name}</p>
                            <h2 className="fs-3 fw-semibold text-light mb-2">{product.name}</h2>
                            <p className="fs-5 text-primary mb-2">{product.category.name}
                                {product.stock > 0 ? (
                                    <span className="badge text-bg-success mb-2">In Stock</span>
                                ) : (
                                    <span className="badge text-bg-danger mb-2">Out Of Stock</span>
                                )}
                            </p>
                            <p className="text-muted-light mb-3">{product.description}</p>
                            <p className="fs-5 fw-bold mb-2" style={{ color: 'var(--primary-color)' }}>{product.price} Ks</p>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    defaultValue="1"
                                    min="1"
                                    name='quantity'
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    style={{ maxWidth: '100px' }}
                                />
                            </div>
                            {isLogin}
                            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                                <i className="bi bi-cart-plus me-2"></i> Add to shopping
                            </button>
                        </div>
                    </div>
                </div>
                {/* Reviews Section (Bottom Section) */}
                <Reviews productId={product.id} isLogin={isLogin} />
            </div>
        </main >
    );
};

export default ProductDetail;
