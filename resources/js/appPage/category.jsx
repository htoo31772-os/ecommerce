import axios from "axios";
import React, { useEffect, useState } from "react";
const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPrducts = async () => {
            try {
                const response = await axios.get('api/category');
                setCategories(response.data.categories);
                setLoading(null);
                setError(null);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(null);
            }
        }
        fetchPrducts();
    }, []);
    if (loading) {
       return <div className="text-danger text-center my-5">Loading data....</div>
    }
    if (error) {
       return <div className="text-danger text-center my-5">{error}</div>
    }
    return (
        <section
            className="section-padding"
            id="category"
            style={{ backgroundColor: 'var(--bg-card)' }}
        >
            <div className="container">
                <h2 className="text-center mb-5">Product Categories</h2>
                {/* row-cols-lg-6 for 6 items */}
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4">
                    {categories.map($category => (
                        <div key={$category.id} className="col">
                            <a href="#" className="card category-card text-decoration-none">
                                <img src={$category.image_url} alt={$category.name} />
                                <div className="card-body">
                                    <h6 className="card-title text-center mb-0">{$category.name}</h6>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Category;
