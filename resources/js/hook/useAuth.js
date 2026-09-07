import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";
export const useAuth = (type = 'login') => {
    const { isLogin, setIsLogin, user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        type === 'login' ?
            { email: '', password: '' } :
            { name: '', email: '', password: '' }
    )
    const [validationError, setValidationError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // HandleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (validationError && validationError[name]) {
            setValidationError(prevError => ({
                ...prevError,
                [name]: null
            }))
        }
    }
    // Validation input
    const validate = () => {
        const newError = {};
        if (type === 'register') {
            if (!formData.name) {
                newError.name = 'Name field is required';
            }
        }
        if (!formData.email) {
            newError.email = 'Eamil field is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newError.email = 'Eamil address is invalid';
        }
        if (!formData.password) {
            newError.password = 'Password field is required'
        }
        setValidationError(newError);
        return Object.keys(newError).length === 0;
    }
    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        try {
            const endpoint = type === 'register' ? 'api/register' : 'api/login';
            const res = await api.post(endpoint, formData);
            if (type === 'login') {
                if (res.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    localStorage.setItem('token', res.data.access_token);
                    setIsLogin(true);
                    setUser(res.data.user);
                    toast.success('Loggedin successfully', { duration: 4000 });
                    navigate('/', { replace: true });
                }
            } else {
                toast.success("အကောင့်မဝင်ခင် Email ကို အရင် verify လုပ်ပါ။", { duration: 4000 });
                navigate('/login', { replace: true });
            }
        } catch (err) {
            console.error(`${type} errors:err`);
            if (err.response.status === 422) {
                const errors = err.response.data.errors;
                const errorMessages = {}
                for (const key in errors) {
                    errorMessages[key] = errors[key][0];
                }
                setValidationError(errorMessages);
                toast.error("ဖြည့်စွက်ချက်များ မှားယွင်းနေပါသည်။", { duration: 4000 })
            } else if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message || 'တစ်ခုခုမှားယွင်းနေပါသည်။ထပ်မံကြိုးစားကြည့်ပါ။', { duration: 4000 })
            } else {
                toast.error('လုပ်ဆောင်ချက် မအောင်မြင်ပါ။ထပ်မံကြိုးစားကြည့်ပါ။', { duration: 4000 })
            }
        } finally {
            setIsLoading(false);
        }

    }
    return {
        formData, validationError, isLoading, handleChange, handleSubmit
    };
};

