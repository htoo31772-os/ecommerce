import { useChangePassword } from "../hook/useChangePassword";

const ChangePasswordForm = () => {
    const {
        passwordData,
        validationError,
        isLoading,
        handlePasswordChange,
        handlePasswordSubmit
    } = useChangePassword();

    return (
        <div className="card bg-card border-color shadow-lg rounded-4">
            <div className="card-body p-4 p-md-4">
                <h4 className="fw-bold mb-4">Change Password</h4>

                <form onSubmit={handlePasswordSubmit}>
                    {/* Current Password */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="form-control"
                        />
                        {validationError.currentPassword && (
                            <div className="invalid-feedback d-block">
                                {validationError.currentPassword}
                            </div>
                        )}
                    </div>

                    {/* New Password */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className={`form-control ${validationError.newPassword ? "is-invalid" : ""}`}
                        />
                        {validationError.newPassword && (
                            <div className="invalid-feedback">
                                {validationError.newPassword}
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className={`form-control ${validationError.confirmPassword ? "is-invalid" : ""}`}
                        />
                        {validationError.confirmPassword && (
                            <div className="invalid-feedback">
                                {validationError.confirmPassword}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-warning px-4 text-dark fw-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? "Changing..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
