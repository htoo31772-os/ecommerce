import { useEffect } from "react";
import { updateProfile } from "../hook/useUpdateProfile";

const EditProfileForm = ({ user }) => {
    const {
        formData,
        validationError,
        isLoading,
        handleChange,
        handleSubmit,
        setFormData
    } = updateProfile();

    useEffect(() => {
        if (!user) return;
        setFormData({
            name: user.name ?? "",
            phone: user.phone ?? "",
            address: user.address ?? "",
        });
    }, [user]);

    return (
        <div className="card bg-card border-color shadow-lg rounded-4">
            <div className="card-body p-4 p-md-4">
                <h4 className="fw-bold mb-4">Edit Profile</h4>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-control ${validationError.name ? "is-invalid" : ""}`}
                        />
                        {validationError.name && (
                            <div className="invalid-feedback">
                                {validationError.name}
                            </div>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`form-control ${validationError.phone ? "is-invalid" : ""}`}
                        />
                        {validationError.phone && (
                            <div className="invalid-feedback">
                                {validationError.phone}
                            </div>
                        )}
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="form-control"
                            rows="3"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary px-4"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileForm;
