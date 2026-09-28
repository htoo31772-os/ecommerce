import { useCart } from '../hook/useCart';
import CartList from '../component/cartList';
import ShippingForm from '../component/shippingForm';
import PaymentForm from '../component/paymentForm';
import OrderSummary from '../component/orderSummary';
import { useState } from 'react';
import { useCheckout } from '../hook/useCheckOut';
const ShoppingCart = () => {
    const [step, setStep] = useState(1);
    const [shippingData, setShippingData] = useState({
        city: '',
        state: '',
        postalCode: '',
        address: ''
    });
    const {
        cartItems,
        loading,
        error,

        clearCartAfterOrder,

        fetchCartItems,

        handleIncrement,
        handleDecrement,
        handleRemoveItem,
        handlCancleItem,

        getItemTotal,

        totalPrice,
        shippingFee,
        grandTotal,
    } = useCart();
    const {
        handleOrder,
        validationError,
        isOrdering
    } = useCheckout({
        cartItems,
        shippingData,
        grandTotal,
        onOrderSuccess: clearCartAfterOrder
    });
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
                                <CartList
                                    cartItems={cartItems}
                                    getItemTotal={getItemTotal}
                                    handleIncrement={handleIncrement}
                                    handleDecrement={handleDecrement}
                                    handleRemoveItem={handleRemoveItem}
                                    onNext={() => setStep(2)}
                                />
                            )}

                            {/* Section: Shipping Address Form */}
                            {step === 2 && (
                                <ShippingForm
                                    shippingData={shippingData}
                                    setShippingData={setShippingData}
                                    onBack={() => setStep(1)}
                                    onNext={() => setStep(3)}
                                />
                            )}

                            {/* Section: Transaction Details Form */}
                            {step === 3 && (
                                <PaymentForm
                                    onBack={() => setStep(2)}
                                    onSubmit={handleOrder}
                                    validationError={validationError}
                                    isOrdering={isOrdering}
                                    clearCartAfterOrder={clearCartAfterOrder}
                                />
                            )}
                        </div>

                        {/* Order Summary Side */}
                        <OrderSummary
                            totalPrice={totalPrice}
                            shippingFee={shippingFee}
                            grandTotal={grandTotal}
                            handlCancleItem={handlCancleItem}
                        />
                    </div>

                </div>
            </main >
        );
    } else {
        return <div className="text-danger text-center my-5">There is no cart items</div>
    }

};

export default ShoppingCart;
