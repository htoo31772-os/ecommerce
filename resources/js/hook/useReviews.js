import { productDetailService } from "../service/productDetailService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export const useReview = (productId) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Get Product Review form Backend
    const fetchReview = async () => {
        try {
            const data = await productDetailService.getReview(productId);
            setReviews(data);
            setLoading(false)
        } catch (error) {
            setError('Failed to load reviews. Please try again');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchReview();
    }, [productId])
    // Update Reviews
    const [validationError, setValidationError] = useState({});
    const [newReviews, setNewReviews] = useState({
        rating: 0,
        review: ''
    });
    const handleRatingChange = (newRating) => {
        setNewReviews((preReviews) => ({ ...preReviews, rating: newRating }));
        if (validationError.rating) {
            setValidationError(prevError => ({
                ...prevError,
                rating: null
            }))
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReviews(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (validationError && validationError[name]) {
            setValidationError(prevError => ({
                ...prevError,
                [name]: null
            }))
        }
    }
    const handleChangeSubmit = async (e) => {
        e.preventDefault();

        const newError = {};
        if (!newReviews.rating || newReviews.rating === 0) {
            newError.rating = 'Please give us some rating'
        }
        if (!newReviews.review || newReviews.review.trim() === '') {
            newError.review = 'Please give us some advice'
        }
        setValidationError(newError)
        if (Object.keys(newError).length === 0) {
            setIsSubmitting(true)
            try {
                const data = await productDetailService.updateReview(productId, newReviews)
                setReviews((preReviews) => [data, ...preReviews]);
                setNewReviews({ rating: 0, review: '' })
                setValidationError({})
                setError(null)
                toast.success('Review updated successfully', { duration: 4000 });
            } catch (error) {
                if (error.response?.status === 422) {
                    setValidationError(error.response.data.errors)
                } else if (error.response?.status === 401) {
                    setError(error.response.data.message)
                    toast.error(error.response?.data?.message, { duration: 400 })
                } else if (error.response && error.response?.data && error.response?.data?.message) {
                    toast.error(error.response?.data?.message);
                    setError(error.response?.data?.message);
                } else {
                    toast('Failed review update', { duration: 4000 });
                    setError('Failed review updated');
                }
            } finally {
                setIsSubmitting(false);
            }
        }
    }
    return {
        reviews,
        loading,
        error,
        newReviews,
        handleInputChange,
        handleRatingChange,
        handleChangeSubmit,
        validationError,
        isSubmitting
    }
}
