import { useEffect, useState } from "react";
import { categoryService } from "../service/categoryService";
export const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await categoryService.getCategories();
            setCategories(data);
            setError(null);

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);
    return {
        categories, error, loading, refetch: fetchCategories
    }
}
