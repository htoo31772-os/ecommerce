export const getStorageImage = (imageName, folder, fallback = './images/user.jpg') => {
    const baseUrl =
        import.meta.env.VITE_API_URL || 'http://localhost:8000';

    if (!imageName || imageName === 'null' || imageName === 'undefined') {
        return fallback;
    }

    if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
        return imageName;
    }

    if (!folder) {
        console.warn('Storage folder is missing!');
        return fallback;
    }

    return `${baseUrl}/storage/${folder}/${imageName}`;
};
