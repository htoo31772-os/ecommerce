import { useEffect, useState } from "react"
import { profileService } from "../service/profileService";

export const useProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchProfile = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await profileService.getProfile();
            setUserProfile(data.user)
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to fetch user profile data");
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchProfile();
    }, [])
    return { userProfile, error, isLoading, refetch: fetchProfile };
}
