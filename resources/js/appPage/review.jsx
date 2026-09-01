import axios from "axios";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const Reviews = ({ productId, isLogin }) => {
    const [reviews, SetReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Get Product Review form Backend
    useEffect(() => {
        if (!productId) {
            return;
        }
        const fetchReview = async () => {
            try {
                const response = await axios.get(`/api/product/${productId}/reviews`);
                SetReviews(response.data);
                setLoading(false)
            } catch (error) {
                setError('Failed to load reviews. Please try again');
            } finally {
                setLoading(false);
            }
        }
        fetchReview();
    }, [productId])
    // Update Reviews
    const [validationError, setValidationError] = useState({});
    const [newReviews, setNewReviews] = useState({
        rating: 0,
        review: ''
    });
    const handleRatingChange = (newRating) => {
        setNewReviews({ ...newReviews, rating: newRating });
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
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be login to submit review');
            toast.error('You must be login to sumbit review', { duration: 400 });
            return;
        }
        const newError = {};
        if (!newReviews.rating || newReviews.rating === 0) {
            newError.rating = 'Please give us some rating'
        }
        if (!newReviews.review || newReviews.review.trim() === '') {
            newError.review = 'Please give us some advice'
        }
        setValidationError(newError)
        if (Object.keys(newError).length === 0) {
            try {
                const response = await axios.post(`/api/product/${productId}/updateReviews`, { ...newReviews }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                SetReviews([response.data, ...reviews]);
                setNewReviews({ rating: 0, review: '' })
                setValidationError({})
                setError(null)
                toast.success('Review updated successfully', { duration: 4000 });
            } catch (error) {
                if (error.response.status === 422) {
                    setValidationError(error.response.data.errors)
                } else if (error.response.status === 401) {
                    setError(error.response.data.message)
                    toast.error(error.response.data.message, { duration: 400 })
                } else if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                    setError(error.response.data.message);
                } else {
                    toast('Failed review update', { duration: 4000 });
                    setError('Failed review updated');
                }
            }
        }
    }
    // Loading State
    if (loading) {
        return <div className="text-center text-muted my-5">Loading reviews...</div>;
    }

    // General Error State (API Error)
    if (error && !validationError.rating && !validationError.review) {
        return <div className="text-danger text-center my-5">{error}</div>;
    }
    return (
        <div className="row mt-5">
            {/* Reviews List */}
            <div className="col-lg-8">
                <div className="card bg-card border-color shadow-lg">
                    <div className="card-body p-4">
                        <h3 className="mb-4">Reviews</h3>
                        {reviews.length > 0 ? (
                            reviews.map((review) =>
                            (
                                <div key={review.id} className="mb-4 text-light">
                                    <h6 className="mb-0">{review.user?.name}</h6>
                                    <div className="mb-3">
                                        <Rating
                                            fillColor="#3b82f6"
                                            numberOfStars={5}
                                            size="35px"
                                            readonly={true}
                                            initialValue={review.rating}
                                        />
                                    </div>
                                    <p>{review.review}</p>
                                    <small className="text-muted-light">Posted on {
                                        new Date(review.created_at).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })
                                    }</small>
                                </div>

                            ))
                        ) : (
                            <div className="text-danger text-center my-5">Not review yet!.....</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Review Form */}
            <div className="col-lg-4">
                <div className="card bg-card border-color shadow-lg">
                    <div className="card-body p-4">
                        <h3 className="mb-4">Write a review</h3>
                        <form onSubmit={handleChangeSubmit}>
                            <div className="mb-3">
                                <label htmlFor="ratingSelect" className="form-label">Rating</label>
                                <Rating
                                    emptyColor="#e5e7eb"
                                    fillColor="#3b82f6"
                                    numberOfStars={5}
                                    size="35px"
                                    allowFraction={false}
                                    transition={true}
                                    onClick={handleRatingChange}
                                    initialValue={newReviews.rating}
                                />
                                {validationError.rating && (
                                    <div className="text-danger">{validationError.rating}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="commentText" className="form-label">Comment</label>
                                <textarea
                                    name="review"
                                    className={`form-control ${validationError.review ? 'is-invalid' : ''}`}
                                    id="commentText"
                                    rows="4"
                                    placeholder="Write your review here"
                                    value={newReviews.review}
                                    onChange={handleInputChange}
                                >
                                </textarea>
                                {validationError.review && (
                                    <div className="text-danger">{validationError.review}</div>
                                )}
                            </div>
                            {isLogin ? (
                                <button type="submit" className="btn btn-primary w-100">Post</button>
                            ) : (
                                <Link to='/login' className="btn btn-danger w-100">Please login first</Link>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Reviews;
