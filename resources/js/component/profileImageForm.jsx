import { useProfileImage } from "../hook/useProfileImage";

const ProfileImageForm = () => {
    const {
        preview,
        isLoading,
        handleImageChange,
        handleImageUpload,
    } = useProfileImage();

    return (
        <div className="card bg-card border-color shadow-lg rounded-4">
            <div className="card-body p-4 text-center">
                <h5 className="fw-bold mb-3">Profile Image</h5>

                {/* Preview */}
                {preview && (
                    <div className="mb-3">
                        <img
                            src={preview}
                            alt="Profile Preview"
                            width="120"
                            height="120"
                            className="rounded-circle shadow-sm object-fit-cover"
                        />
                    </div>
                )}

                <form onSubmit={handleImageUpload}>
                    <div className="mb-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="form-control form-control-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary w-100"
                        disabled={isLoading}
                    >
                        {isLoading ? "Uploading..." : "Update Image"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileImageForm;
