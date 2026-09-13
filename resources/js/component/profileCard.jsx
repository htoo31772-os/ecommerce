import { getStorageImage } from "../Utils/useImage";

const ProfileCard = ({ user }) => {
    const imageUrl = getStorageImage(user?.image, 'profile');

    // ဒီ console.log တွေမှာ ဘာတွေပြနေလဲ ကြည့်ပါ
    console.log("Raw user.image:", user?.image);
    console.log("Full generated imageUrl:", imageUrl);
    return (
        <div className="card bg-card border-color shadow-lg rounded-4 overflow-hidden">
            <div className="card-body text-center p-4">
                <div className="mb-3">
                    <img
                        src={user?.image ? `http://localhost:8000/storage/profile/${user.image}` : 'images/user.jpg'}
                        alt="Profile Preview"
                        width="120"
                        height="120"
                        className="rounded-circle shadow-sm object-fit-cover"
                    />
                </div>
                <h4 className="fw-bold mb-1">{user.name}</h4>
                <p className="text-light small mb-3">{user.email}</p>
                <hr className="text-light opacity-25 my-3" />
                <div className="text-start small">
                    <p className="mb-2 text-secondary">
                        <strong className="text-light">Phone:</strong> {user.phone || 'Not provided'}
                    </p>
                    <p className="mb-0 text-secondary">
                        <strong className="text-light">Address:</strong> {user.address || 'Not provided'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
