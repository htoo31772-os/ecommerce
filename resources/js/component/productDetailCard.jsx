import { Link } from "react-router-dom";
import { useProductAddToCart } from "../hook/useProductAddToCart";
import { getStorageImage } from "../Utils/useImage";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const ProductDetailCard = ({ product }) => {
const {isLogin}=useContext(AuthContext);
    const { setQuantity, quantity, isLoading, handleAddToCart } = useProductAddToCart(product.id);
    return (
        <div className="card bg-card border-color shadow-lg p-3 p-md-5">
            <div className="row g-5">
                <div className="col-lg-6">
                    <img
                        src={getStorageImage(product.image_url, 'product')}
                        className="img-fluid rounded-3 mb-3"
                        alt="Product Image"
                    />
                </div>

                <div className="col-lg-6 d-flex flex-column text-light">
                    <p className="text-primary mb-2">{product.brand.name}</p>
                    <h2 className="fs-3 fw-semibold text-light mb-2">{product.name}</h2>
                    <p className="fs-5 text-primary mb-2">{product.category.name}
                        {product.stock > 0 ? (
                            <span className="badge text-bg-success d-inline-block ms-2 mb-2">In Stock</span>
                        ) : (
                            <span className="badge text-bg-danger d-inline-block ms-2  mb-2">Out Of Stock</span>
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
                            min="1"
                            name='quantity'
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            style={{ maxWidth: '100px' }}
                        />
                    </div>
                    {isLogin ?
                        <button className="btn btn-primary btn-lg" onClick={handleAddToCart} disabled={isLoading}>
                            <i className="bi bi-cart-plus me-2"></i>  {isLoading ? 'Waiting...' : 'Add to shopping'}
                        </button>
                        :
                        <Link to='/login' className="alert alert-success text-decoration-none" role="alert">
                            Please login first
                        </Link>
                    }

                </div>
            </div>
        </div>
    )
}
export default ProductDetailCard;
