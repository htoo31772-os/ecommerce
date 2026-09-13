import api from "./api";
export const profileService = {
    getProfile: async () => {
        const response = await api.get('/api/profile');
        return response.data;
    },
    updateProfile: async (data) => {
        const response = await api.post('/api/profile/update', data);
        return response.data;
    },
    changePassword: async (data) => {
        const response = await api.post('/api/profile/change-password', data);
        return response.data;
    },
    updateImage: async (formData) => {
        const response = await api.post('/api/profile/updateImage', formData);
        return response.data;
    }
}
