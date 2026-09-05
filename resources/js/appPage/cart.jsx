import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const ShoppingCart = () => {
    const { isLogin, handleCartCount } = useContext(AuthContext);
    // Get Cart Items form backend
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('token');
            if (!token || !isLogin) {
                toast.error('Please login first to check cart items', { duration: 4000 });
                setError('Please login first to check cart items');
                return;
            }
            try {
                const response = await axios.get('/api/cart/index', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setCartItems(response.data);
                setLoading(false)
            } catch (error) {
                console.log('cartItems error:', error);
                setError(error);
                setLoading(false);
            } finally {
                setLoading(false)
            }
        }
        fetchCartItems();
    }, [])
    // Increment Quantity
    const handleIncrement = (cartId) => {
        setCartItems(prevItem =>
            prevItem.map(item =>
                item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }
    // Decrement Quantity
    const handleDecrement = (cartId) => {
        setCartItems(prevItem =>
            prevItem.map(item =>
                item.id === cartId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            )
        )
    }
    // Total Price
    const totalPrice = (price, quantity) => (price * quantity);
    // SubTotal
    const subTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    // Grand Total
    const shippingFee = 3000;
    const grandTotal = subTotal + shippingFee;
    // Reomve Item
    const handleRemoveItem = async (itemId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login first', { duration: 4000 });
            return
        }
        try {
            await axios.delete(`/api/cart/removeItem/${itemId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (handleCartCount) {
                handleCartCount();
            }
            setCartItems(prevItem =>
                prevItem.filter(item =>
                    item.id !== itemId
                )
            )
            toast.success('Item removed successfully');
        } catch (error) {
            console.log('remove item error', error);

            toast.error('Failed to remove item from cart');
        }
    }
    // Cnacle All Item (or) Cancle Item
    const navigate = useNavigate();
    const handlCancleItem = async () => {
        const token = localStorage.getItem('token')
        if (!token || !isLogin) {
            toast.error('Please login first')
            return;
        }
        try {
            await axios.delete(`/api/cart/cancleAllItem`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (handleCartCount) {
                handleCartCount();
            }
            setCartItems([]);
            toast.success('Remove all items');
            navigate('/');
        } catch (error) {
            console.log('canlce all item error:', error);
            toast.error('Fail to remove all items');
        }
    }
    // Final Order
    const [step, setStep] = useState(1);
    const [paymentData, setPaymentData] = useState({ payment: '', totalAmount: '', transactionId: '', transactionDate: '', note: '' });
    const [shippingData, setShippingData] = useState({ city: '', state: '', postalCode: '', address: '' })
    const [validationError, setValidationError] = useState({})
    const handleOrder = async () => {
        setValidationError({});
        const token = localStorage.getItem('token');
        if (!token || !isLogin) {
            toast.error('Please login first to order the products');
            return;
        }
        const payload = {
            items: cartItems,
            payment: paymentData,
            shipping: shippingData,
            grandTotal: grandTotal
        }
        try {
            const response = await axios.post(`/api/cart/order`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setCartItems([])
            if (handleCartCount) {
                handleCartCount();
            }
            toast.success('Product ordered successfully');
        } catch (err) {
            console.log('Order error', err);
            if (err.response && err.response.status === 422) {
                setValidationError(err.response.data.errors)
            } else {
                toast.error('Failed to place order. Try again');
            }
        }
    }
    if (loading) {
        return <div className="text-danger text-center my-5">Loading data....</div>
    }
    if (error) {
        return <div className="text-danger text-center my-5">{error}</div>
    }
    if (cartItems.length > 0) {
        return (
            <main className="section-padding">
                <div className="container">
                    <h2 className="text-center mb-5">Checkout Information</h2>

                    <div className="row g-4">
                        {/* Checkout Forms */}
                        <div className="col-lg-8">
                            {/* Section: Selected Items */}
                            {step === 1 && (
                                <div className="bg-card p-4 rounded-4 shadow-sm mb-4">
                                    <h5 className="mb-4"><i className="bi bi-bag-check me-2"></i>Selected Items</h5>
                                    <div className="table-responsive">
                                        <table className="table align-middle">
                                            <thead>
                                                <tr>
                                                    <th colSpan="2">Product</th>
                                                    <th>Price</th>
                                                    <th>Qty</th>
                                                    <th>Total</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map(cartItem => {
                                                    return (
                                                        < tr key={cartItem.id} className='text-light'>
                                                            <td style={{ width: '60px' }}>
                                                                <img src={cartItem.product.image_url} className="img-fluid rounded-3" alt="item" />
                                                            </td>
                                                            <td><h6 className="mb-0">{cartItem.product.name}</h6></td>
                                                            <td className='text-light'>{cartItem.product.price} Ks</td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <button type="button" onClick={() => { handleDecrement(cartItem.id) }} className="btn-qty"><i className="bi bi-dash"></i></button>
                                                                    <input type="text" className="qty-input" value={cartItem.quantity} readOnly />
                                                                    <button type="button" onClick={() => handleIncrement(cartItem.id)} className="btn-qty"><i className="bi bi-plus"></i></button>
                                                                </div>
                                                            </td>
                                                            <td className='text-light'>{totalPrice(cartItem.product.price, cartItem.quantity)} Ks</td>
                                                            <td><button type="button" onClick={() => handleRemoveItem(cartItem.id)} className="btn btn-sm btn-danger"><i className="bi bi-x"></i></button></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-end mt-4">
                                        <button className="btn btn-primary" onClick={() => setStep(2)}>Next: Shipping <i className="bi bi-arrow-right ms-2"></i></button>
                                    </div>
                                </div>
                            )}

                            {/* Section: Shipping Address Form */}
                            {step === 2 && (
                                <form onSubmit={(e) => { e.preventDefault(); setStep(3) }}>
                                    <div className="bg-card p-4 rounded-4 shadow-sm mb-4">
                                        <h5 className="mb-4 text-primary-custom"><i className="bi bi-geo-alt me-2"></i>Shipping Address</h5>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label">City / Township</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${validationError['shipping.city'] ? 'is-invalid' : ''}`}
                                                    placeholder="e.g. Yangon"
                                                    value={shippingData.city}
                                                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                                                    required
                                                />
                                                {
                                                    validationError['shipping.city'] && (
                                                        <div className="text-danger">{validationError['shipping.city']}</div>
                                                    )
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">State / Division</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${validationError['shipping.state'] ? 'is-invalid' : ''}`}
                                                    placeholder="e.g. Yangon Region"
                                                    value={shippingData.state}
                                                    onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                                                    required
                                                />
                                                {validationError['shipping.state'] && (
                                                    <div className="text-danger">{validationError['shipping.state']}</div>
                                                )}
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label">Postal Code</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${validationError['shipping.postalCode'] ? 'is-invalid' : ''}`}
                                                    placeholder="e.g. 11011"
                                                    value={shippingData.postalCode}
                                                    onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                                                    required
                                                />
                                                {validationError['shipping.postalCode'] && (
                                                    <div className="text-danger">{validationError['shipping.postalCode']}</div>
                                                )}
                                            </div>
                                            <div className="col-md-8">
                                                <label className="form-label">Detailed Address</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${validationError['shipping.address'] ? 'is-invalid' : ''}`}
                                                    placeholder="House No, Street, Ward, etc."
                                                    value={shippingData.address}
                                                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                                                    required
                                                />
                                                {validationError['shipping.address'] && (
                                                    <div className="text-danger">{validationError['shipping.address']}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4 d-flex justify-content-between">
                                            <button type="button" className="btn btn-secondary me-2" onClick={() => setStep(1)}>Back</button>
                                            <button type="submit" className="btn btn-primary">Next: Payment<i className="bi bi-arrow-right ms-2"></i></button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {/* Section: Transaction Details Form */}
                            {step === 3 && (
                                <form onSubmit={(e) => { e.preventDefault(), handleOrder(); }}>
                                    <div className="bg-card p-4 rounded-4 shadow-sm">
                                        <h5 className="mb-4 text-primary-custom"><i className="bi bi-credit-card-2-back me-2"></i>Payment Details</h5>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Payment Method</label>
                                                <select className={`form-select ${validationError['payment.payment'] ? 'is-invalid' : ''}`} value={paymentData.payment} onChange={(e) => setPaymentData({ ...paymentData, payment: e.target.value })}>
                                                    <option value="" disabled>Choose payment method</option>
                                                    <option>KBZ Pay</option>
                                                    <option>AYA Pay</option>
                                                    <option>Wave Pay</option>
                                                    <option>CB Pay</option>
                                                </select>
                                                {validationError['payment.payment'] && (
                                                    <div className="text-danger">{validationError['payment.payment']}</div>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Amount to Pay</label>
                                                <input
                                                    type="number"
                                                    className={`form-control ${validationError['payment.totalAmoung'] ? 'is-invalid' : ''}`}
                                                    placeholder="Total Amount"
                                                    value={paymentData.totalAmount}
                                                    onChange={(e) => setPaymentData({ ...paymentData, totalAmount: e.target.value })}
                                                    style={{ backgroundColor: '#2d3748', opacity: 0.8 }}
                                                    required
                                                />
                                                {validationError['payment.totalAmount'] && (
                                                    <div className="text-danger">{validationError['payment.totalAmount']}</div>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Transaction ID (Full or last 6 digits)</label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${validationError['payment.transactionId'] ? 'is=invalid' : ''}`}
                                                    placeholder="e.g. 123456789"
                                                    value={paymentData.transactionId}
                                                    onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                                                    required
                                                />
                                                {validationError['payment.transactionId'] && (
                                                    <div className="text-danger">{validationError['payment.transactionId']}</div>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Transaction Date & Time</label>
                                                <input
                                                    type="datetime-local"
                                                    className={`form-control ${validationError['payment.transactionDate'] ? 'is-invalid' : ''}`}
                                                    value={paymentData.transactionDate}
                                                    onChange={(e) => setPaymentData({ ...paymentData, transactionDate: e.target.value })}
                                                    required
                                                />
                                                {validationError['payment.transactionDate'] && (
                                                    <div className="text-danger">{validationError['payment.transactionDate']}</div>
                                                )}
                                            </div>
                                            <div className="col-md-12">
                                                <label className="form-label">Note (Optional)</label>
                                                <textarea
                                                    className={`form-control ${validationError['payment.note'] ? 'is-invalid' : ''}`}
                                                    rows="2"
                                                    placeholder="Add any additional information here..."
                                                    value={paymentData.note}
                                                    onChange={(e) => setPaymentData({ ...paymentData, note: e.target.value })}
                                                ></textarea>
                                                {validationError['payment.note'] && (
                                                    <div className="text-danger">{validationError['payment.note']}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-4 d-flex justify-content-between">
                                            <button type="button" onClick={() => setStep(2)} className="btn btn-secondary me-2">Back</button>
                                            <button type="submit" className="btn btn-success">Confirm & Place Order</button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Order Summary Side */}
                        <div className="col-lg-4">
                            <div className="card bg-card p-3 rounded-4 shadow-lg sticky-top" style={{ top: '100px', zIndex: 10 }}>
                                <div className="card-body">
                                    <h3 className="mb-4">Order Summary</h3>
                                    <div className="d-flex justify-content-between mb-3 text-light">
                                        <span>Subtotal</span>
                                        <span>{subTotal} Ks</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3 text-light">
                                        <span>Shipping Fees</span>
                                        <span>3,000 Ks</span>
                                    </div>
                                    <hr style={{ borderColor: 'var(--border-color)' }} />
                                    <div className="d-flex justify-content-between text-primary fs-4 fw-bold mb-4">
                                        <span>Grand Total</span>
                                        <span>{grandTotal} Ks</span>
                                    </div>
                                    {/* Cancle Button */}
                                    <button type="button" onClick={handlCancleItem} className="btn btn-danger shadow-sm">
                                        Cancle
                                    </button>
                                    <p className="text-center text-light mt-3 small">
                                        <i className="bi bi-shield-lock me-1"></i> Secure Checkout
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        );
    } else {
        return <div className="text-danger text-center my-5">There is no cart items</div>
    }

};

export default ShoppingCart;
