import { useEffect, useState } from "react";
import { profileService } from "../service/profileService";
import toast from "react-hot-toast";
export const useProfileImage = (user) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [validationError, setValidationError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setValidationError({});
    }
    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error('Please select a photo to upload', { duration: 4000 });
            return;
        }
        const formData = new FormData()
        formData.append('image', image)
        setIsLoading(true);
        try {
            const data = await profileService.updateImage(formData);
            setImage(null);
            setPreview(null);
            toast.success('Updated image successfully', { duration: 4000 });
            return data.user;
        } catch (error) {
            if (error.response?.status === 422) {
                setValidationError(error.response.data.errors || {});
            } else {
                toast.error(error.response?.data?.message || "Failed to upload image");
            }
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        }
    }, [preview]);
    return {
        image, preview, validationError, isLoading, handleImageChange, handleImageUpload
    }
}
