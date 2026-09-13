import ProfileCard from "../component/profileCard";
import EditProfileForm from "../component/editProfileForm";
import ChangePasswordForm from "../component/changePasswordForm";
import ProfileImageForm from "../component/profileImageForm";
import { useProfile } from "../hook/useProfile";

const Profile = () => {
    const { userProfile, isLoading, error } = useProfile();
console.log("Current User Profile:", userProfile);
    if (isLoading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger shadow-sm">{error}</div>
            </div>
        );
    }

    if (!userProfile) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning shadow-sm">Profile not found.</div>
            </div>
        );
    }

    return (
        <main className="container py-5">
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="fw-bold mb-1">My Profile</h2>
                    <p className="text-muted">Manage your account settings, profile information, and security.</p>
                </div>
            </div>

            <div className="row g-4">
                {/* Left Column: Profile Card & Profile Image */}
                <div className="col-lg-4">
                    <ProfileCard user={userProfile} />
                    <div className="mt-4">
                        <ProfileImageForm />
                    </div>
                </div>

                {/* Right Column: Edit Profile & Change Password */}
                <div className="col-lg-8">
                    <EditProfileForm user={userProfile} />
                    <div className="mt-4">
                        <ChangePasswordForm />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
