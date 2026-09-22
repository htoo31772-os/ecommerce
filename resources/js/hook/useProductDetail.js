import { productDetailService } from "../service/productDetailService";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export const useProductDetail = () => {
    // Get Product Detail form Backend
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchProduct = async () => {
        try {
            const product = await productDetailService.fetchProductDetail(id);
            setProduct(product);
        } catch (error) {
            console.error('Product detail error:', error);
            if (error.response && error.response.status === 404) {
                setError('Product not found');
            } else {
                setError(`Failed to load product detail ${error.message}`)
            }
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchProduct();
    }, [id])
    return {
        product,
        loading,
        error
    }
}
