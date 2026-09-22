import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import { useReview } from "../hook/useReviews";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Reviews = ({ productId }) => {
    const { isLogin } = useContext(AuthContext);
    const { reviews, loading, error, newReviews, handleInputChange, handleRatingChange, handleChangeSubmit, validationError, isSubmitting } = useReview(productId);
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
                                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>{isSubmitting ? 'Posting...' : 'Post'}</button>
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
