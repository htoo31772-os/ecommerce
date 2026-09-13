import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import {authService} from "../service/authServices.js";
import toast from "react-hot-toast";


export const useLogin = () => {
    const { setIsLogin, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [validationError, setValidationError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (validationError[name]) {
            setValidationError(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const errors = {};
        if (!formData.email) {
            newError.email = 'Eamil field is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newError.email = 'Eamil address is invalid';
        }
        if (!formData.password) {
            newError.password = 'Password field is required'
        }
        setValidationError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            const data = await authService.login(formData);
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setIsLogin(true);
            setUser(data.user);
            toast.success('Logged in successfully');
            navigate('/', { replace: true });
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, validationError, isLoading, handleChange, handleSubmit };
};
