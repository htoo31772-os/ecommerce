import api from "./api"

export const categoryService = {
    getCategories: async () => {
        const response = await api.get('/api/category');
        return response.data.categories;
    }
}
