import { useState } from 'react';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { productDetailService } from '../service/productDetailService';
export const useProductAddToCart = (productId) => {
    const { handleCartCount } = useContext(AuthContext);
    // Add to cart
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            await productDetailService.addToCart(productId, quantity)
            toast.success('Product add to cart successful', { duration: 4000 })
            setQuantity(1);
            if (handleCartCount) {
                handleCartCount();
            }
        } catch (error) {
            console.log('Add to cart error', error);
            const errMessage = error.response?.data?.message || 'Product ID or Quantity is missing or invalid. Please check your inputs.'
            toast.error(errMessage)

        } finally {
            setIsLoading(false);
        }
    }
    return {
        setQuantity, quantity, isLoading, handleAddToCart
    }
}
