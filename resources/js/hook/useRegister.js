import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../service/authServices.js";
import toast from "react-hot-toast";

export const useRegister = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
        if (!formData.name) {
            newError.name = 'Name field is required';
        }
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
            await authService.register(formData);
            toast.success("အကောင့်မဝင်ခင် Email ကို အရင် verify လုပ်ပါ။");
            navigate('/login', { replace: true });
        } catch (err) {
            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                const formatted = {};
                Object.keys(errors).forEach(k => formatted[k] = errors[k][0]);
                setValidationError(formatted);
            } else {
                toast.error(err.response?.data?.message || 'Registration failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, validationError, isLoading, handleChange, handleSubmit };
};
