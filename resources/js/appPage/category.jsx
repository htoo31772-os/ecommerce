import { useCategory } from "../hook/useCategory"

const Category = () => {
    const { categories, error, loading } = useCategory();
    if (loading) {
        return <div className="text-danger text-center my-5">Loading data....</div>
    }
    if (error) {
        return <div className="text-danger text-center my-5">{error}</div>
    }
    if (categories.length === 0) {
        return (<div className="text-muted text-center my-5"> No categories available. </div>);
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
                    {categories?.map(category => (
                        <div key={category.id} className="col">
                            <div className="card category-card text-decoration-none">
                                <img src={category.image_url} alt={category.name} />
                                <div className="card-body">
                                    <h6 className="card-title text-center mb-0">{category.name}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Category;
