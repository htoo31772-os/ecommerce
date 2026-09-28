const CartList = ({
    cartItems,
    getItemTotal,
    handleIncrement,
    handleDecrement,
    handleRemoveItem,
    onNext
}) => {

    return (
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
                                    <td className='text-light'>{getItemTotal(cartItem.product.price, cartItem.quantity)} Ks</td>
                                    <td><button type="button" onClick={() => handleRemoveItem(cartItem.id)} className="btn btn-sm btn-danger"><i className="bi bi-x"></i></button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="text-end mt-4">
                <button className="btn btn-primary" onClick={onNext}>Next: Shipping <i className="bi bi-arrow-right ms-2"></i></button>
            </div>
        </div>
    );
}
export default CartList;
