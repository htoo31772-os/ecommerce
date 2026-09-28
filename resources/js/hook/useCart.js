import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CartService } from "../service/cartService";
import { AuthContext } from "../context/authContext";
export const useCart = () => {
    const { handleCartCount } = useContext(AuthContext);
    const navigate = useNavigate();
    // Get Cart Items form backend
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Fetch Cart
    const fetchCartItems = async () => {
        setLoading(true)
        try {
            const data = await CartService.getCart()
            setCartItems(data);
        } catch (err) {
            console.log('cartItems error:', error);
            const message =
                err.response?.data?.message ||
                "Failed to load cart.";
            setError(message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchCartItems();
    }, [])
    // Total Price
    const getItemTotal = (price, quantity) => { return (price * quantity) };
    // SubTotal
    const totalPrice = cartItems.reduce((total, item) => { return total + getItemTotal(item?.product?.price, item?.quantity) }, 0);
    // Grand Total
    const shippingFee = 3000;
    const grandTotal = totalPrice + shippingFee;
    // Increment Quantity
    const handleIncrement = async (cartId) => {
        try {
            const cartItem = cartItems.find(item => item.id === cartId);
            if (!cartItem) {
                return;
            }
            const newQuantity = cartItem.quantity + 1;
            const updatedItem = await CartService.updateQuantity(cartId, newQuantity);
            setCartItems(prevItem =>
                prevItem.map(item => {
                    if (item.id !== cartId) {
                        return item
                    }
                    return {
                        ...item, quantity: updatedItem.quantity
                    }
                })
            )
        } catch (err) {
            const message =
                err.response?.data?.message ||
                "Failed to update quantity.";

            toast.error(message);
        }

    }
    // Decrement Quantity
    const handleDecrement = async (cartId) => {
        try {
            const cartItem = cartItems.find(item => item.id === cartId);
            if (!cartItem) {
                return;
            }
            const newQuantity = Math.max(1, cartItem.quantity - 1);
            const updatedItem = await CartService.updateQuantity(cartId, newQuantity);
            setCartItems(prevItem =>
                prevItem.map(item => {
                    if (item.id !== cartId) {
                        return item
                    }
                    return { ...item, quantity: updatedItem.quantity }
                })
            )
        } catch (err) {
            const message =
                err.response?.data?.message ||
                "Failed to update quantity.";

            toast.error(message);
        }

    }
    // Clear Cart
    const clearCartAfterOrder = () => {
        setCartItems([]);

        if (handleCartCount) {
            handleCartCount();
        }

        navigate('/');
    };
    // Reomve Item
    const handleRemoveItem = async (itemId) => {
        try {
            await CartService.removeItem(itemId)
            setCartItems(prevItem =>
                prevItem.filter(item =>
                    item.id !== itemId
                )
            )
            if (handleCartCount) {
                handleCartCount();
            }
            toast.success('Item removed successfully');
        } catch (err) {
            console.log('remove item error', err);
            const message =
                err.response?.data?.message ||
                "Failed to remove item.";
            toast.error(message);
        }
    }
    // Cnacle All Item (or) Cancle Item
    const handlCancleItem = async () => {
        try {
            await CartService.clearCart()
            clearCartAfterOrder();
            toast.success('Remove all items');
            navigate('/');
        } catch (err) {
            console.log('canlce all item error:', err);
            toast.error('Fail to remove all items');
        }
    }
    return {
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
    }
}
