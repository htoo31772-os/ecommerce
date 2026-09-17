import api from "./api";
export const productService = {
    getProducts: async () => {
        const response = await api.get('api/product');
        return response.data;
    },
    productLike: async (productId) => {
        const response = await api.post(`/api/product/${productId}/like`);
        return response.data;
    }
}
