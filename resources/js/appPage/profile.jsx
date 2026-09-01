import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    const [validationError, setValidationError] = useState({});
    const [globalError, setGlobalError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const token = localStorage.getItem('token');
    /*----------------------------------------Get User Profile Data From Backend------------------------------------------*/
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [userProfile, setUserProfile] = useState({});
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!token) {
                    setGlobalError('Not Authenticated');
                    return;
                }
                const response = await axios.get('api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const profileData = response.data.user;
                setUserProfile(profileData);
                setFormData(profileData)
            } catch (error) {
                console.error("Error updating profile:", error);
                if (error.response.status === 401) {
                    setGlobalError('Unauthorized. Please try again')
                } else {
                    setGlobalError('Failed to fetch user profile data');
                }
            } finally {
                setIsLoading(false)
            }
        }
        fetchProfile();
    }, [])
    /*----------------------------------------Update User Profile------------------------------------------*/
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (validationError && validationError.name) {
            setValidationError(prevError => ({
                ...prevError,
                [name]: null
            }))
        }
        if (globalError) {
            setGlobalError(null);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newError = {}
        if (!formData.name) {
            validationError.name = 'Name field is required'
        }
        if (!/^09\d{8,11}$/.test(formData.phone)) {
            validationError.phone = 'Invalid phone number format'
        }
        setValidationError(newError);
        if (Object.keys(newError).length === 0) {
            try {
                const response = await axios.post('api/profile/update', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setUserProfile(response.data.user);
                toast.success('Profile updated successfully', {
                    duration: 4000,
                });
            } catch (error) {
                console.error('Profile Updat Error:', error);
                if (error.response.status === 422) {
                    setValidationError(error.response.data.errors);
                } else if (error.response && error.response.data && error.response.data.message) {
                    setGlobalError(error.response.data.message);
                    toast.error(error.response.data.message, { duration: 4000 })
                } else {
                    setGlobalError('Updated failed. Please try again!');
                    toast.error('Updated failed. Please try again!', { duration: 4000 })
                }
            }
        }
    }
    /*----------------------------------------Change Password------------------------------------------*/
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevState => ({
            ...prevState,
            [name]: value
        }))
        if (validationError && validationError[name]) {
            setValidationError(prevError => ({
                ...prevError,
                [name]: null
            }))
        }
        if (globalError) {
            setGlobalError(null);
        }
    }
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
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
        if (Object.keys(newError).length === 0) {
            try {
                const response = await axios.post('api/profile/update', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setValidationError({});
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
                toast.success('Changed password successfully', { duration: 4000 })
            } catch (error) {
                console.error('Password Error', error);
                if (error.response.status === 422) {
                    setValidationError(error.response.data.errors)
                } else if (error.response && error.response.data && error.response.data.message) {
                    setGlobalError(error.response.data.message);
                    toast.error(error.response.data.message, { duration: 4000 });
                } else {
                    setGlobalError('Failed password changed');
                    toast.error('Failed password changed', { duration: 4000 })
                }
            }
        }
    }
    /*----------------------------------------Update Image------------------------------------------*/
    const [imageProfile, setImageProfile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageProfile(file);
            setImagePreview(URL.createObjectURL(file))
            setGlobalError(null)
            setValidationError({})
        }
    }
    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!imageProfile) {
            toast.error('Please select a phonto to upload', { duration: 4000 });
            return;
        }
        const formData = new FormData()
        formData.append('image', imageProfile)
        try {
            const response = await axios.post('api/profile/updateImage', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUserProfile(response.data.user)
            setImageProfile(null);
            setImagePreview(null);
            toast.success('Updated image successfully', { duration: 4000 });
        } catch (error) {
            if (error.response.status === 422) {
                setValidationError(error.response.data.errors);
            } else if (error.response && error.response.data && error.response.data.message) {
                setGlobalError(error.response.data.message);
                toast.error(error.response.data.message, { duration: 4000 });
            } else {
                setGlobalError('Failed image uplaoded');
                toast.error('Failed image uploaded', { duration: 4000 });
            }
        }
    }
    if (isLoading) {
        return <div className="text-center my-5 text-danger">Loading user data...</div>;
    }
    if (globalError) {
        return <div className="text-center my-5 text-danger" style={{ height: '50vh' }}>{globalError}</div>;
    } else {
        return (
            <main className="section-padding">
                <Toaster position="top-center" reverseOrder={false} />
                <div className="container">
                    <h2 className="text-center mb-5">User profile</h2>
                    <div className="row g-5">

                        {/* Column 1: Profile Card */}
                        <div className="col-lg-4">
                            <div className="card bg-card border-color shadow-lg text-center">
                                <div className="card-body p-4 p-md-5">
                                    {userProfile?.image_url && userProfile.image_url !== 'http://127.0.0.1:8000/storage/profile/user' ? (
                                        <img
                                            src={userProfile.image_url}
                                            className="img-fluid rounded-circle mx-auto d-block mb-3"
                                            alt="User Profile"
                                            style={{ border: '4px solid var(--primary-color)' }}
                                        />
                                    ) : (
                                        <img
                                            src="/images/user.jpg"
                                            className="img-fluid rounded-circle mx-auto d-block mb-3"
                                            alt="User Profile"
                                            style={{ border: '4px solid var(--primary-color)' }}
                                        />
                                    )};
                                    <h5 className="mb-1">{userProfile.name}</h5>
                                    <p className="text-light mb-3">{userProfile.email}</p>
                                    <form onSubmit={handleImageUpload}>
                                        <div className="col-12 mb-2">
                                            <input
                                                type="file"
                                                name='image'
                                                className={`form-control ${validationError.image ? 'is-invalid' : ''}`}
                                                onChange={handleImageChange}
                                                accept='image/*' />
                                            {validationError.image && (
                                                <div className="text-danger">{validationError.image}</div>
                                            )}
                                        </div>
                                        <input type="submit" className="btn btn-primary w-100" value='Uplaod New Photo' />
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Forms */}
                        <div className="col-lg-8">

                            {/* Update Profile Card */}
                            <div className="card bg-card border-color shadow-lg">
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4">Edit profile</h3>
                                    <form onSubmit={handleSubmit} className="row g-3">
                                        <div className="col-md-12">
                                            <label htmlFor="profileUsername" className="form-label">Name</label>
                                            <input
                                                name='name'
                                                type="text"
                                                className={`form-control ${validationError.name ? 'in-valid' : ''}`}
                                                id="profileUsername"
                                                value={formData.name || ''}
                                                onChange={handleChange}
                                            />
                                            {validationError.name && (
                                                <div className="text-danger">{validationError.name}</div>
                                            )}
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="profilePhone" className="form-label">Phone Number</label>
                                            <input
                                                name='phone'
                                                type="tel"
                                                className={`form-control ${validationError.phone ? 'is-invalid' : ''}`}
                                                id="profilePhone"
                                                placeholder="09-XXX-XXX-XXX"
                                                value={formData.phone || ''}
                                                onChange={handleChange}
                                            />
                                            {validationError.phone && (
                                                <div className="text-danger">{validationError.phone}</div>
                                            )}
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="profileAddress" className="form-label">Address</label>
                                            <textarea
                                                name='address'
                                                className={`form-control ${validationError.address ? 'is-invalid' : ''}`}
                                                id="profileAddress"
                                                rows="3"
                                                placeholder="Enter your address."
                                                value={formData.address || ''}
                                                onChange={handleChange}>
                                            </textarea>
                                            {validationError.address && (
                                                <div className="text-danger">{validationError.address}</div>
                                            )}
                                        </div>
                                        <div className="col-12 mt-4">
                                            <button type="submit" className="btn btn-primary">save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Change Password Card */}
                            <div className="card bg-card border-color shadow-lg mt-4">
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4">Change Password</h3>
                                    <form onSubmit={handlePasswordSubmit} className="row g-3">
                                        <div className="col-12">
                                            <label htmlFor="currentPassword" className="form-label">Current password</label>
                                            <input
                                                name='currentPassword'
                                                type="password"
                                                className={`form-control ${validationError.currentPassword ? 'is-invalid' : ''}`}
                                                id="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordChange}
                                            />
                                            {validationError.currentPassword && (
                                                <div className="text-danger">{validationError.currentPassword}</div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="newPassword" className="form-label">New Password</label>
                                            <input
                                                name='newPassword'
                                                type="password"
                                                className={`form-control ${validationError.newPassword ? 'is-invalid' : ''}`}
                                                id="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                            />
                                            {validationError.newPassword && (
                                                <div className="text-danger">{validationError.newPassword}</div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="confirmPassword" className="form-label">
                                                Verify your new password
                                            </label>
                                            <input
                                                name='confirmPassword'
                                                type="password"
                                                className={`form-control ${validationError.confirmPassword ? 'is-invalid' : ''}`}
                                                id="confirmNewPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                            />
                                            {validationError.confirmPassword && (
                                                <div className="text-danger">{validationError.confirmPassword}</div>
                                            )}
                                        </div>
                                        <div className="col-12 mt-4">
                                            <button type="submit" className="btn btn-primary">Change Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
};

export default Profile;
