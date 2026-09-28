import { useState } from "react";
const ShippingForm = ({ shippingData, setShippingData, onBack, onNext }) => {
    const [validationError, setValidationError] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingData(prev => ({
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
        if (!shippingData.city.trim()) {
            errors.city = "City is required";
        }

        if (!shippingData.state.trim()) {
            errors.state = "State is required";
        }

        if (!shippingData.postalCode.trim()) {
            errors.postalCode = "Postal code is required";
        }

        if (!shippingData.address.trim()) {
            errors.address = "Address is required";
        }

        if (Object.keys(errors).length > 0) {
            setValidationError(errors);
            return;
        }
        setValidationError({});

        onNext();

    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-card p-4 rounded-4 shadow-sm mb-4">
                <h5 className="mb-4 text-primary-custom"><i className="bi bi-geo-alt me-2"></i>Shipping Address</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">City / Township</label>
                        <input
                            name="city"
                            type="text"
                            className={`form-control ${validationError.city ? 'is-invalid' : ''}`}
                            placeholder="e.g. Yangon"
                            value={shippingData.city}
                            onChange={handleChange}
                        />
                        {
                            validationError.city && (
                                <div className="text-danger">{validationError.city}</div>
                            )
                        }
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">State / Division</label>
                        <input
                            name="state"
                            type="text"
                            className={`form-control ${validationError.state ? 'is-invalid' : ''}`}
                            placeholder="e.g. Yangon Region"
                            value={shippingData.state}
                            onChange={handleChange}
                        />
                        {validationError.state && (
                            <div className="text-danger">{validationError.state}</div>
                        )}
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Postal Code</label>
                        <input
                            name="postalCode"
                            type="text"
                            className={`form-control ${validationError.postalCode ? 'is-invalid' : ''}`}
                            placeholder="e.g. 11011"
                            value={shippingData.postalCode}
                            onChange={handleChange}
                        />
                        {validationError.postalCode && (
                            <div className="text-danger">{validationError.postalCode}</div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <label className="form-label">Detailed Address</label>
                        <input
                            name="address"
                            type="text"
                            className={`form-control ${validationError.address ? 'is-invalid' : ''}`}
                            placeholder="House No, Street, Ward, etc."
                            value={shippingData.address}
                            onChange={handleChange}
                        />
                        {validationError.address && (
                            <div className="text-danger">{validationError.address}</div>
                        )}
                    </div>
                </div>
                <div className="mt-4 d-flex justify-content-between">
                    <button type="button" className="btn btn-secondary me-2" onClick={onBack}>Back</button>
                    <button type="submit" className="btn btn-primary">Next: Payment<i className="bi bi-arrow-right ms-2"></i></button>
                </div>
            </div>
        </form>
    );
}
export default ShippingForm;
