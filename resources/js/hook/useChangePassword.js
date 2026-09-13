import { profileService } from "../service/profileService";
import { useState } from "react";
import toast from "react-hot-toast";
export const useChangePassword = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [validationError, setValidationError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevState => ({
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
        if (!passwordData.currentPassword) {
            newError.currentPassword = 'Current password field is required';
        }
        if (!passwordData.newPassword) {
            newError.newPassword = 'New Password field is required';
        } else if (passwordData.newPassword === passwordData.currentPassword) {
            newError.newPassword = 'New password do not match with current password';
        }
        if (!passwordData.confirmPassword) {
            newError.confirmPassword = 'Confirm password field is required';
        } else if (passwordData.confirmPassword !== passwordData.newPassword) {
            newError.confirmPassword = 'Confirm password must be same new password';
        }
        setValidationError(newError)
        return Object.keys(newError).length === 0;
    }
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        try {
            await profileService.changePassword(passwordData)
            setValidationError({});
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
            toast.success('Changed password successfully', { duration: 4000 })
        } catch (error) {
            console.error('Password Error', error);
            if (error.response?.status === 422) {
                setValidationError(error.response.data.errors || {})
            } else {
                toast.error(error.response.data.message || "Failed to change password", { duration: 4000 });
            }
        } finally {
            setIsLoading(false);
        }

    }
    return {
        passwordData, validationError, isLoading, handlePasswordChange, handlePasswordSubmit
    }
}
