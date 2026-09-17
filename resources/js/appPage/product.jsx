import { Link } from 'react-router-dom';
import { useProduct } from '../hook/useProduct';
const Products = () => {
    const {
        products,
        loading,
        error,
        liking,
        handleLike
    } = useProduct();
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
                                        <button
                                            type="button"
                                            className="icon-action border-0 bg-transparent"
                                            onClick={() => handleLike(product.id)}
                                            disabled={liking}
                                            style={{ cursor: liking ? 'not-allowed' : 'pointer' }}
                                        >
                                            <i
                                                className={`bi ${product.is_liked
                                                    ? 'bi-heart-fill text-danger'
                                                    : 'bi-heart'
                                                    } me-1`}
                                            />

                                            <small>{product.like_count}</small>
                                        </button>
                                        <div className="icon-action" title="View">
                                            <i className="bi bi-eye me-1" />
                                            <small>{product.view_count}</small>
                                        </div>
                                        <div className="icon-action" title="Comment">
                                            <i className="bi bi-chat-dots me-1" />
                                            <small>{product.review_count}</small>
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
