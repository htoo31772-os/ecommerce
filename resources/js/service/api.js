import axios from "axios";
import toast from "react-hot-toast";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
    }
});
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Something Went Wront!';
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    toast.error('Access Forbidden: You do not have permission.', { duration: 4000 });
                    break;
                case 404:
                    toast.error('Resource not found.', { duration: 4000 });
                    break;
                case 500:
                    toast.error('Server error. Please try again later.', { duration: 4000 });
                    break;
                default:
                    toast.error(message)
                    break;
            }
        } else {
            toast.error('Network connection error. Please check your internet.', { duration: 4000 });
        }
        return Promise.reject(error);
    }
);
export default api;
