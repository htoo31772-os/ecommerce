import api from "./api"

export const CartService = {
    getCart: async () => {
        const response = await api.get('/api/cart/index');
        return response.data;
    },
    removeItem: async (itemId) => {
        const response = await api.delete(`/api/cart/removeItem/${itemId}`);
        return response.data;
    },
    clearCart: async () => {
        const response = await api.delete(`/api/cart/cancleAllItem`);
        return response.data;
    },
    placeOrder: async (data) => {
        const response = await api.post(`/api/cart/order`, data);
        return response.data;
    },
    updateQuantity: async (cartId, quantity) => {
        const response = await api.patch(`/api/cart/${cartId}/quantity`, { quantity });
        return response.data.cartItem;
    }
}
