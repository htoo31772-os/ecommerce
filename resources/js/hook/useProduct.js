import { useEffect, useState } from "react";
import { productService } from "../service/productService";
import toast from "react-hot-toast";
export const useProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liking, setLiking] = useState(false);
    const fetchProducts = async () => {
        setLoading(true)
        try {
            const data = await productService.getProducts();
            setProducts(data)
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleLike = async (productId) => {
        setLiking(true);
        try {
            const data = await productService.productLike(productId);
            setProducts(prev => prev.map(p =>
                p.id === productId ? { ...p, like_count: data.like_count, is_liked: data.is_liked } : p))
            toast.success(data.status === 'liked' ? "Liked ❤️" : "Unliked 🤍", { id: 'like', duration: 4000 })
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to like the product", { duration: 4000 })
        } finally {
            setLiking(false);
        }
    }

    return {
        products,
        loading,
        error,
        liking,
        refetch: fetchProducts,
        handleLike,
    };

}
