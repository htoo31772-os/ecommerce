import Reviews from './review';
import { useProductDetail } from '../hook/useProductDetail';
import ProductDetailCard from '../component/productDetailCard';
const ProductDetail = () => {
    const { product, loading, error } = useProductDetail();
    if (loading) {
        return <div className="text-center text-danger my-5">Loading product details...</div>;
    }

    if (error) {
        return <div className="text-danger text-center my-5">{error}</div>;
    }
    if (!product ) {
        return <div className="text-danger text-center my-5">Product data is unavailable.</div>;
    }
    return (
        <main className="section-padding">
            <div className="container">
                {/* Product Detail Card (Top Section) */}
                <ProductDetailCard product={product}/>

                {/* Reviews Section (Bottom Section) */}
                <Reviews productId={product.id} />
            </div>
        </main >
    );
};

export default ProductDetail;
