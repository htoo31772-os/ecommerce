import { CartService } from "../service/cartService";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
export const useCheckout = ({
    cartItems,
    shippingData,
    grandTotal,
    onOrderSuccess
}) => {
    // Final Order
    const [validationError, setValidationError] = useState({})
    const [isOrdering, setIsOrdering] = useState(false);
    const handleOrder = async (paymentData) => {
        setValidationError({});
        const payload = {
            items: cartItems,
            payment: paymentData,
            shipping: shippingData,
            grandTotal: grandTotal
        }
        setIsOrdering(true);
        try {
            const response = await CartService.placeOrder(payload);
            onOrderSuccess();
            toast.success('Product ordered successfully');
        } catch (err) {
            console.log('Order error', err);
            if (err.response?.status === 422) {
                setValidationError(
                    err.response.data.errors || {}
                );
            } else {
                toast.error('Failed to place order. Try again');
            }
        } finally {
            setIsOrdering(false);
        }
    }
    return {
        validationError,
        handleOrder,
        isOrdering
    }
}
