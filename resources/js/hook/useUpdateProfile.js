import { useState } from "react"
import { profileService } from "../service/profileService";
import toast from "react-hot-toast";

export const updateProfile = (user) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
    });
    const [validationError, setValidationError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (validationError[name]) {
            setValidationError(prevError => ({
                ...prevError,
                [name]: null
            }))
        }
    }
    const validate = () => {
        const newError = {};
        if (!formData.name.trim()) {
            newError.name = "Name field is required";
        }

        if (!/^09\d{8,11}$/.test(formData.phone)) {
            newError.phone = "Invalid phone number format";
        }
        setValidationError(newError);
        return Object.keys(newError).length === 0;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        try {
            await profileService.updateProfile(formData);
            toast.success("Profile updated successfully", { duration: 4000 });
        } catch (err) {
            if (err.response?.status === 422) {
                setValidationError(err.response.data.errors || {})
            } else {
                toast.error(err.response?.data?.message || "Failed to update profile")
            }
        } finally {
            setIsLoading(false);
        }
    }
    return {
        formData, validationError, isLoading, handleChange, handleSubmit, setFormData
    }
}
