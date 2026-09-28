const OrderSummary = ({
    totalPrice,
    shippingFee,
    grandTotal,
    handlCancleItem
}) => {
    return (
        <div className="col-lg-4">
            <div className="card bg-card p-3 rounded-4 shadow-lg sticky-top" style={{ top: '100px', zIndex: 10 }}>
                <div className="card-body">
                    <h3 className="mb-4">Order Summary</h3>
                    <div className="d-flex justify-content-between mb-3 text-light">
                        <span>Total Prices</span>
                        <span>{totalPrice} Ks</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3 text-light">
                        <span>Shipping Fees</span>
                        <span>{shippingFee}Ks</span>
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
    );
}
export default OrderSummary;
