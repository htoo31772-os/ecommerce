import { useState } from "react";
const PaymentForm = ({ onBack, onSubmit }) => {
    const [paymentData, setPaymentData] = useState({ payment: '', totalAmount: '', transactionId: '', transactionDate: '', note: '' });
    const [validationError, setValidationError] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({
            ...prev,
            [name]: value
        }));
        if (validationError[name]) {
            setValidationError(prev => ({
                ...prev,
                [name]: null
            }))
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
        if (!paymentData.payment) {
            errors.payment = "Payment method is required";
        }

        if (!paymentData.totalAmount) {
            errors.totalAmount = "Amount is required";
        }

        if (!paymentData.transactionId) {
            errors.transactionId =
                "Transaction ID is required";
        }

        if (!paymentData.transactionDate) {
            errors.transactionDate =
                "Transaction date is required";
        }

        if (Object.keys(errors).length > 0) {
            setValidationError(errors);
            return;
        }
        setValidationError({});
        onSubmit(paymentData);

    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-card p-4 rounded-4 shadow-sm">
                <h5 className="mb-4 text-primary-custom"><i className="bi bi-credit-card-2-back me-2"></i>Payment Details</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Payment Method</label>
                        <select className={`form-select ${validationError.payment ? 'is-invalid' : ''}`} name="payment" value={paymentData.payment} onChange={handleChange}>
                            <option value="" disabled>Choose payment method</option>
                            <option value="kbz">KBZ Pay</option>
                            <option value="aya">AYA Pay</option>
                            <option value="wave">Wave Pay</option>
                            <option value="cb">CB Pay</option>
                        </select>
                        {validationError.payment && (
                            <div className="text-danger">{validationError.payment}</div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Amount to Pay</label>
                        <input
                            name="totalAmount"
                            type="number"
                            className={`form-control ${validationError.totalAmount ? 'is-invalid' : ''}`}
                            placeholder="Total Amount"
                            value={paymentData.totalAmount}
                            onChange={handleChange}
                            style={{ backgroundColor: '#2d3748', opacity: 0.8 }}
                        />
                        {validationError.totalAmount && (
                            <div className="text-danger">{validationError.totalAmount}</div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Transaction ID (Full or last 6 digits)</label>
                        <input
                            name="transactionId"
                            type="text"
                            className={`form-control ${validationError.transactionId ? 'is=invalid' : ''}`}
                            placeholder="e.g. 123456789"
                            value={paymentData.transactionId}
                            onChange={handleChange}
                        />
                        {validationError.transactionId && (
                            <div className="text-danger">{validationError.transactionId}</div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Transaction Date & Time</label>
                        <input
                            name="transactionDate"
                            type="datetime-local"
                            className={`form-control ${validationError.transactionDate ? 'is-invalid' : ''}`}
                            value={paymentData.transactionDate}
                            onChange={handleChange}
                        />
                        {validationError.transactionDate && (
                            <div className="text-danger">{validationError.transactionDate}</div>
                        )}
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Note (Optional)</label>
                        <textarea
                            name="note"
                            className={`form-control ${validationError.note ? 'is-invalid' : ''}`}
                            rows="2"
                            placeholder="Add any additional information here..."
                            value={paymentData.note}
                            onChange={handleChange}
                        ></textarea>
                        {validationError.note && (
                            <div className="text-danger">{validationError.note}</div>
                        )}
                    </div>
                </div>
                <div className="mt-4 d-flex justify-content-between">
                    <button type="button" onClick={onBack} className="btn btn-secondary me-2">Back</button>
                    <button type="submit" className="btn btn-success">Confirm & Place Order</button>
                </div>
            </div>
        </form>
    );
}
export default PaymentForm;
