import api from "./api"

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/api/login', credentials);
        return response.data;
    },
    register: async (data) => {
        const response = await api.post('/api/register', data);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/api/logout');
        return response.data;
    }
}
