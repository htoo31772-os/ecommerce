import api from "./api"

export const productDetailService = {
    fetchProductDetail: async (id) => {
        const response = await api.get(`/api/product/${id}`)
        return response.data;
    },
    addToCart: async (productId, quantity) => {
        const response = await api.post('/api/cart/store', {
            product_id: productId,
            quantity: quantity
        })
        return response.data;
    },
    getReview: async (productId) => {
        const response = await api.get(`/api/product/${productId}/reviews`)
        return response.data;
    },
    updateReview: async (productId,data) => {
        const response = await api.post(`/api/product/${productId}/updateReviews`,data)
        return response.data;
    }
}
